import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gradient' | 'dots';
  className?: string;
}

/**
 * Spinner component for loading states
 * Beautiful animated spinners for actions and loading states
 */
export function Spinner({ size = 'md', variant = 'default', className }: SpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  if (variant === 'gradient') {
    return (
      <div className={cn('relative', className)}>
        <div
          className={cn(
            'rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin',
            sizeStyles[size]
          )}
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, #3b82f6 360deg)',
          }}
        />
        <div
          className={cn(
            'absolute inset-0 rounded-full bg-white dark:bg-gray-900',
            size === 'sm' ? 'm-0.5' : size === 'md' ? 'm-1' : 'm-1.5'
          )}
        />
      </div>
    );
  }

  if (variant === 'dots') {
    const dotSizes = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2.5 h-2.5',
      lg: 'w-3.5 h-3.5',
      xl: 'w-5 h-5',
    };

    return (
      <div className={cn('flex space-x-1', className)}>
        <div className={cn('rounded-full bg-blue-500 animate-bounce', dotSizes[size])} style={{ animationDelay: '0ms' }} />
        <div className={cn('rounded-full bg-purple-500 animate-bounce', dotSizes[size])} style={{ animationDelay: '150ms' }} />
        <div className={cn('rounded-full bg-pink-500 animate-bounce', dotSizes[size])} style={{ animationDelay: '300ms' }} />
      </div>
    );
  }

  // Default spinner
  return (
    <div
      className={cn(
        'rounded-full border-gray-300 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 animate-spin',
        sizeStyles[size],
        className
      )}
    />
  );
}

/**
 * Loading Overlay - Full screen loading state
 */
export function LoadingOverlay({ message, className }: { message?: string; className?: string }) {
  return (
    <div className={cn('fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50', className)}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center space-y-4 shadow-2xl">
        <Spinner size="xl" variant="gradient" />
        {message && (
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Inline Loader - For buttons and inline loading states
 */
export function InlineLoader({ text, className }: { text?: string; className?: string }) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Spinner size="sm" />
      {text && <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>}
    </div>
  );
}

/**
 * Page Loader - For full page loading states
 */
export function PageLoader({ title = 'Loading...', subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="text-center space-y-6">
        <Spinner size="xl" variant="gradient" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Button Spinner - For loading buttons
 */
export function ButtonSpinner({ className }: { className?: string }) {
  return <Spinner size="sm" className={cn('inline-block', className)} />;
}
