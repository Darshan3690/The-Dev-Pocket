/**
 * Error handling utilities for The Dev Pocket
 * Provides comprehensive error management and user feedback
 */

import { useCallback, useState, useEffect } from 'react';

export type ErrorLevel = 'info' | 'warn' | 'error' | 'critical';

export interface DevPocketError {
  message: string;
  level: ErrorLevel;
  context?: string;
  timestamp: number;
  stack?: string;
  metadata?: Record<string, unknown>;
  id: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: DevPocketError | null;
}

class ErrorHandler {
  private errors: DevPocketError[] = [];
  private maxErrors = 50;
  private listeners: ((error: DevPocketError) => void)[] = [];

  /**
   * Create a standardized error object
   */
  createError(
    message: string,
    level: ErrorLevel = 'error',
    context?: string,
    metadata?: Record<string, unknown>
  ): DevPocketError {
    const error: DevPocketError = {
      message,
      level,
      context,
      timestamp: Date.now(),
      metadata,
      id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    return error;
  }

  /**
   * Log an error
   */
  logError(
    error: Error | DevPocketError | string,
    level: ErrorLevel = 'error',
    context?: string,
    metadata?: Record<string, unknown>
  ): DevPocketError {
    let devPocketError: DevPocketError;

    if (typeof error === 'string') {
      devPocketError = this.createError(error, level, context, metadata);
    } else if ('id' in error) {
      devPocketError = error;
    } else {
      devPocketError = this.createError(
        error.message,
        level,
        context,
        { ...metadata, stack: error.stack }
      );
    }

    this.errors.push(devPocketError);

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console
    console[level === 'critical' ? 'error' : level === 'warn' ? 'warn' : 'log'](
      `[Dev Pocket ${level.toUpperCase()}]`,
      devPocketError
    );

    // Notify listeners
    this.listeners.forEach(listener => listener(devPocketError));

    return devPocketError;
  }

  /**
   * Handle an error with user feedback
   */
  handleError(
    error: Error | DevPocketError | string,
    level: ErrorLevel = 'error',
    context?: string,
    metadata?: Record<string, unknown>
  ): DevPocketError {
    const devPocketError = this.logError(error, level, context, metadata);

    // Show user feedback based on error level
    switch (level) {
      case 'critical':
        this.showCriticalError(devPocketError);
        break;
      case 'error':
        this.showErrorNotification(devPocketError);
        break;
      case 'warn':
        this.showWarningNotification(devPocketError);
        break;
      case 'info':
        this.showInfoNotification(devPocketError);
        break;
    }

    return devPocketError;
  }

  /**
   * Wrap async functions with error handling
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapAsync<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    context?: string,
    level: ErrorLevel = 'error'
  ): T {
    return (async (...args: Parameters<T>) => {
      try {
        return await fn(...args);
      } catch (error) {
        this.handleError(error as Error, level, context);
        throw error;
      }
    }) as T;
  }

  /**
   * Wrap sync functions with error handling
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapSync<T extends (...args: any[]) => any>(
    fn: T,
    context?: string,
    level: ErrorLevel = 'error'
  ): T {
    return ((...args: Parameters<T>) => {
      try {
        return fn(...args);
      } catch (error) {
        this.handleError(error as Error, level, context);
        throw error;
      }
    }) as T;
  }

  /**
   * Get recent errors
   */
  getRecentErrors(count: number = 10): DevPocketError[] {
    return this.errors.slice(-count);
  }

  /**
   * Get errors by level
   */
  getErrorsByLevel(level: ErrorLevel): DevPocketError[] {
    return this.errors.filter(error => error.level === level);
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    total: number;
    byLevel: Record<ErrorLevel, number>;
    recent: DevPocketError[];
  } {
    const byLevel = this.errors.reduce((acc, error) => {
      acc[error.level] = (acc[error.level] || 0) + 1;
      return acc;
    }, {} as Record<ErrorLevel, number>);

    return {
      total: this.errors.length,
      byLevel,
      recent: this.getRecentErrors(5)
    };
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Add error listener
   */
  addErrorListener(listener: (error: DevPocketError) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Export errors as JSON
   */
  exportErrors(): string {
    return JSON.stringify({
      errors: this.errors,
      stats: this.getErrorStats(),
      timestamp: Date.now()
    }, null, 2);
  }

  private showCriticalError(error: DevPocketError): void {
    // Show critical error modal with XSS protection
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg p-6 max-w-md mx-4';
    
    const title = document.createElement('h2');
    title.className = 'text-xl font-bold text-red-600 mb-4';
    title.textContent = 'Critical Error';
    
    const message = document.createElement('p');
    message.className = 'text-gray-700 mb-4';
    message.textContent = error.message;
    
    const errorId = document.createElement('p');
    errorId.className = 'text-sm text-gray-500 mb-4';
    errorId.textContent = `Error ID: ${error.id}`;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex space-x-3';
    
    const reloadButton = document.createElement('button');
    reloadButton.className = 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700';
    reloadButton.textContent = 'Reload Page';
    reloadButton.onclick = () => {
      modal.remove();
      window.location.reload();
    };
    
    const dismissButton = document.createElement('button');
    dismissButton.className = 'bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400';
    dismissButton.textContent = 'Dismiss';
    dismissButton.onclick = () => modal.remove();
    
    buttonContainer.appendChild(reloadButton);
    buttonContainer.appendChild(dismissButton);
    
    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(errorId);
    modalContent.appendChild(buttonContainer);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  private showErrorNotification(error: DevPocketError): void {
    this.showNotification(error.message, 'error');
  }

  private showWarningNotification(error: DevPocketError): void {
    this.showNotification(error.message, 'warning');
  }

  private showInfoNotification(error: DevPocketError): void {
    this.showNotification(error.message, 'info');
  }

  private showNotification(message: string, type: 'error' | 'warning' | 'info'): void {
    const notification = document.createElement('div');
    const colors = {
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-4 py-2 rounded shadow-lg z-40 transition-all duration-300`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

// Global error handler instance
const errorHandler = new ErrorHandler();

/**
 * React hook for error handling
 */
export function useErrorHandling() {
  const [errors, setErrors] = useState<DevPocketError[]>([]);

  const logError = useCallback((
    error: Error | DevPocketError | string,
    level: ErrorLevel = 'error',
    context?: string,
    metadata?: Record<string, unknown>
  ) => {
    return errorHandler.logError(error, level, context, metadata);
  }, []);

  const handleError = useCallback((
    error: Error | DevPocketError | string,
    level: ErrorLevel = 'error',
    context?: string,
    metadata?: Record<string, unknown>
  ) => {
    return errorHandler.handleError(error, level, context, metadata);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapAsync = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    context?: string,
    level: ErrorLevel = 'error'
  ) => {
    return errorHandler.wrapAsync(fn, context, level);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapSync = useCallback(<T extends (...args: any[]) => any>(
    fn: T,
    context?: string,
    level: ErrorLevel = 'error'
  ) => {
    return errorHandler.wrapSync(fn, context, level);
  }, []);

  const getErrorStats = useCallback(() => {
    return errorHandler.getErrorStats();
  }, []);

  const clearErrors = useCallback(() => {
    errorHandler.clearErrors();
  }, []);

  const exportErrors = useCallback(() => {
    return errorHandler.exportErrors();
  }, []);

  // Listen for errors
  useEffect(() => {
    const removeListener = errorHandler.addErrorListener((error) => {
      setErrors(prev => [...prev.slice(-10), error]);
    });

    return removeListener;
  }, []);

  return {
    errors,
    logError,
    handleError,
    wrapAsync,
    wrapSync,
    getErrorStats,
    clearErrors,
    exportErrors
  };
}

/**
 * Error boundary component
 */
export function ErrorBoundary({ 
  children, 
  fallback,
  onError 
}: { 
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: DevPocketError; retry: () => void }>;
  onError?: (error: DevPocketError) => void;
}) {
  const [errorState, setErrorState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: null
  });

  const handleError = useCallback((error: Error) => {
    const devPocketError = errorHandler.createError(
      error.message,
      'critical',
      'ErrorBoundary',
      { stack: error.stack }
    );

    setErrorState({
      hasError: true,
      error: devPocketError
    });

    errorHandler.logError(devPocketError);
    onError?.(devPocketError);
  }, [onError]);

  const retry = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null
    });
  }, []);

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      handleError(event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      handleError(new Error(event.reason));
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [handleError]);

  if (errorState.hasError && errorState.error) {
    if (fallback) {
      const FallbackComponent = fallback;
      return <FallbackComponent error={errorState.error} retry={retry} />;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Something went wrong</h3>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{errorState.error.message}</p>
            <p className="text-xs text-gray-400 mt-2">Error ID: {errorState.error.id}</p>
          </div>
          <div className="mt-6 flex space-x-3">
            <button
              onClick={retry}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default errorHandler;
