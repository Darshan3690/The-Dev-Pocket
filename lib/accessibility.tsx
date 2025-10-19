/**
 * Accessibility utilities for The Dev Pocket
 * Provides comprehensive accessibility support for the developer platform
 */

import { useEffect, useCallback, useRef } from 'react';

export interface AccessibilityAnnouncement {
  message: string;
  type: 'status' | 'alert' | 'polite';
  timestamp: number;
}

class AccessibilityManager {
  private announcements: AccessibilityAnnouncement[] = [];
  private announcementTimeout: NodeJS.Timeout | null = null;

  /**
   * Announce a message to screen readers
   */
  announce(message: string, type: 'status' | 'alert' | 'polite' = 'status'): void {
    const announcement: AccessibilityAnnouncement = {
      message,
      type,
      timestamp: Date.now()
    };

    this.announcements.push(announcement);

    // Update the live region
    const announcementElement = document.getElementById('dev-pocket-announcements');
    if (announcementElement) {
      announcementElement.setAttribute('aria-live', type);
      announcementElement.textContent = message;
      
      // Clear after a short delay to allow new announcements
      if (this.announcementTimeout) {
        clearTimeout(this.announcementTimeout);
      }
      
      this.announcementTimeout = setTimeout(() => {
        if (announcementElement.textContent === message) {
          announcementElement.textContent = '';
        }
      }, 5000);
    } else {
      console.warn('Accessibility: Announcement element not found. Please ensure an element with id "dev-pocket-announcements" exists.');
    }

    // Keep only recent announcements
    this.announcements = this.announcements.slice(-10);
  }

  /**
   * Announce an error message
   */
  announceError(message: string): void {
    this.announce(`Error: ${message}`, 'alert');
  }

  /**
   * Announce a success message
   */
  announceSuccess(message: string): void {
    this.announce(`Success: ${message}`, 'status');
  }

  /**
   * Focus on an element with announcement
   */
  focusElement(selector: string): void {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
      this.announce(`Focused on ${selector}`);
    } else {
      console.warn(`Accessibility: Element with selector "${selector}" not found for focusing.`);
    }
  }

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Check if user prefers high contrast
   */
  prefersHighContrast(): boolean {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  /**
   * Get color contrast ratio between two colors
   */
  getColorContrast(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 1;
    
    const luminance1 = this.getLuminance(rgb1);
    const luminance2 = this.getLuminance(rgb2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if color contrast meets WCAG standards
   */
  meetsWCAGContrast(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean {
    const contrast = this.getColorContrast(color1, color2);
    return level === 'AA' ? contrast >= 4.5 : contrast >= 7;
  }

  /**
   * Setup keyboard navigation helpers
   */
  setupKeyboardNavigation(): void {
    // Add keyboard navigation for platform sections
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        this.announce('Navigating with keyboard');
      }
    });
  }

  /**
   * Get accessibility announcements
   */
  getAnnouncements(): AccessibilityAnnouncement[] {
    return [...this.announcements];
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private getLuminance(rgb: { r: number; g: number; b: number }): number {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
}

// Global accessibility manager instance
const accessibilityManager = new AccessibilityManager();

/**
 * React hook for accessibility features
 */
export function useAccessibility() {
  const announce = useCallback((message: string, type: 'status' | 'alert' | 'polite' = 'status') => {
    accessibilityManager.announce(message, type);
  }, []);

  const announceError = useCallback((message: string) => {
    accessibilityManager.announceError(message);
  }, []);

  const announceSuccess = useCallback((message: string) => {
    accessibilityManager.announceSuccess(message);
  }, []);

  const focusElement = useCallback((selector: string) => {
    accessibilityManager.focusElement(selector);
  }, []);

  const prefersReducedMotion = useCallback(() => {
    return accessibilityManager.prefersReducedMotion();
  }, []);

  const prefersHighContrast = useCallback(() => {
    return accessibilityManager.prefersHighContrast();
  }, []);

  const getColorContrast = useCallback((color1: string, color2: string) => {
    return accessibilityManager.getColorContrast(color1, color2);
  }, []);

  const meetsWCAGContrast = useCallback((color1: string, color2: string, level: 'AA' | 'AAA' = 'AA') => {
    return accessibilityManager.meetsWCAGContrast(color1, color2, level);
  }, []);

  // Setup keyboard navigation on mount
  useEffect(() => {
    accessibilityManager.setupKeyboardNavigation();
  }, []);

  return {
    announce,
    announceError,
    announceSuccess,
    focusElement,
    prefersReducedMotion,
    prefersHighContrast,
    getColorContrast,
    meetsWCAGContrast,
    announcements: accessibilityManager.getAnnouncements()
  };
}

/**
 * Accessibility component for announcements
 */
export function AccessibilityAnnouncer() {
  return (
    <div
      id="dev-pocket-announcements"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}
    />
  );
}

/**
 * Skip link component for keyboard navigation
 */
export function SkipLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="skip-link sr-only-focusable"
      style={{
        position: 'absolute',
        top: '-40px',
        left: '6px',
        background: '#000',
        color: '#fff',
        padding: '8px',
        textDecoration: 'none',
        borderRadius: '4px',
        zIndex: 1000,
        transition: 'top 0.3s ease'
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '6px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-40px';
      }}
    >
      {children}
    </a>
  );
}

/**
 * High contrast mode styles
 */
export const highContrastStyles = `
  @media (prefers-contrast: high) {
    .dev-pocket-container {
      background: #000 !important;
      color: #fff !important;
      border: 2px solid #fff !important;
    }
    
    .dev-pocket-button {
      background: #fff !important;
      color: #000 !important;
      border: 2px solid #000 !important;
    }
    
    .dev-pocket-button:hover {
      background: #ccc !important;
    }
    
    .dev-pocket-link {
      color: #fff !important;
      text-decoration: underline !important;
    }
    
    .dev-pocket-link:hover {
      background: #fff !important;
      color: #000 !important;
    }
  }
`;

/**
 * Reduced motion styles
 */
export const reducedMotionStyles = `
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .dev-pocket-animation {
      animation: none !important;
    }
    
    .dev-pocket-transition {
      transition: none !important;
    }
  }
`;

/**
 * Screen reader only styles
 */
export const screenReaderStyles = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .sr-only-focusable:focus {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
`;

export default accessibilityManager;
