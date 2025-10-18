"use client";

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: '#fff',
          color: '#363636',
        },
        // Success
        success: {
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            fontWeight: '600',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10b981',
          },
        },
        // Error
        error: {
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            fontWeight: '600',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px -10px rgba(239, 68, 68, 0.5), 0 0 0 1px rgba(239, 68, 68, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
        // Loading
        loading: {
          style: {
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: '#fff',
            fontWeight: '600',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#3b82f6',
          },
        },
      }}
    />
  );
}
