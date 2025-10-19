"use client";

import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Info, AlertTriangle, Loader2, Sparkles } from 'lucide-react';

/**
 * Custom Toast Notifications
 * Beautiful gradient toasts with icons and animations
 */

// Success Toast
export const showSuccess = (message: string, duration?: number) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4 border-2 border-white/20`}
        style={{
          boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.2)',
        }}
      >
        <div className="flex-shrink-0">
          <div className="relative">
            <CheckCircle className="h-6 w-6 text-white" />
            <div className="absolute -inset-2 bg-white/30 rounded-full blur-md animate-pulse" />
          </div>
        </div>
        <p className="text-sm font-semibold text-white flex-1">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>
    ),
    { duration: duration || 3000 }
  );
};

// Error Toast
export const showError = (message: string, duration?: number) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gradient-to-r from-red-500 to-rose-600 shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4 border-2 border-white/20`}
        style={{
          boxShadow: '0 10px 40px -10px rgba(239, 68, 68, 0.5), 0 0 0 1px rgba(239, 68, 68, 0.2)',
        }}
      >
        <div className="flex-shrink-0">
          <div className="relative">
            <XCircle className="h-6 w-6 text-white" />
            <div className="absolute -inset-2 bg-white/30 rounded-full blur-md animate-pulse" />
          </div>
        </div>
        <p className="text-sm font-semibold text-white flex-1">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>
    ),
    { duration: duration || 4000 }
  );
};

// Info Toast
export const showInfo = (message: string, duration?: number) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4 border-2 border-white/20`}
        style={{
          boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.2)',
        }}
      >
        <div className="flex-shrink-0">
          <div className="relative">
            <Info className="h-6 w-6 text-white" />
            <div className="absolute -inset-2 bg-white/30 rounded-full blur-md animate-pulse" />
          </div>
        </div>
        <p className="text-sm font-semibold text-white flex-1">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>
    ),
    { duration: duration || 3500 }
  );
};

// Warning Toast
export const showWarning = (message: string, duration?: number) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4 border-2 border-white/20`}
        style={{
          boxShadow: '0 10px 40px -10px rgba(245, 158, 11, 0.5), 0 0 0 1px rgba(245, 158, 11, 0.2)',
        }}
      >
        <div className="flex-shrink-0">
          <div className="relative">
            <AlertTriangle className="h-6 w-6 text-white" />
            <div className="absolute -inset-2 bg-white/30 rounded-full blur-md animate-pulse" />
          </div>
        </div>
        <p className="text-sm font-semibold text-white flex-1">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>
    ),
    { duration: duration || 3500 }
  );
};

// Loading Toast
export const showLoading = (message: string) => {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4 border-2 border-white/20`}
      style={{
        boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.2)',
      }}
    >
      <div className="flex-shrink-0">
        <Loader2 className="h-6 w-6 text-white animate-spin" />
      </div>
      <p className="text-sm font-semibold text-white flex-1">{message}</p>
    </div>
  ));
};

// Premium/Special Toast
export const showPremium = (message: string, duration?: number) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4 border-2 border-white/20 relative overflow-hidden`}
        style={{
          boxShadow: '0 10px 40px -10px rgba(168, 85, 247, 0.5), 0 0 0 1px rgba(168, 85, 247, 0.2)',
        }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
        
        <div className="flex-shrink-0 relative z-10">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-white" />
            <div className="absolute -inset-2 bg-white/30 rounded-full blur-md animate-pulse" />
          </div>
        </div>
        <p className="text-sm font-bold text-white flex-1 relative z-10">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg relative z-10"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>
    ),
    { duration: duration || 4000 }
  );
};

// Promise Toast (for async operations)
export const showPromise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  }
) => {
  const loadingToast = showLoading(messages.loading);
  
  promise
    .then(() => {
      toast.dismiss(loadingToast);
      showSuccess(messages.success);
    })
    .catch(() => {
      toast.dismiss(loadingToast);
      showError(messages.error);
    });
  
  return promise;
};

// Dismiss all toasts
export const dismissAll = () => {
  toast.dismiss();
};

// Add global styles for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes enter {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes leave {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    @keyframes shine {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    .animate-enter {
      animation: enter 0.3s ease-out;
    }
    
    .animate-leave {
      animation: leave 0.2s ease-in;
    }
    
    .animate-shine {
      animation: shine 2s infinite;
    }
  `;
  document.head.appendChild(style);
}
