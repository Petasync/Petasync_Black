/**
 * Analytics Configuration and Utilities
 *
 * Supports:
 * - Google Analytics 4 (GA4)
 * - Microsoft Clarity
 */

// Analytics IDs
export const ANALYTICS_CONFIG = {
  GA4_MEASUREMENT_ID: 'G-69WXXP8WMT',
  CLARITY_PROJECT_ID: 'uhkqz9yead',
};

/**
 * Check if the user has given analytics consent (cookie banner).
 */
function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('petasync_cookie_consent');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed?.analytics === true;
  } catch {
    return false;
  }
}

/**
 * Initialize Google Analytics 4.
 * Only sets up the dataLayer stub — the actual script tag is loaded
 * by CookieBanner after explicit user consent.
 */
export const initGA4 = () => {
  if (typeof window === 'undefined') return;

  // Only set up the stub so trackPageView etc. don't crash.
  // The real GA script is loaded by CookieBanner on consent.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
};

/**
 * Track a page view in GA4
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });

  // Also notify Clarity about the page change (for SPA tracking)
  if (window.clarity) {
    window.clarity('set', 'page', path);
  }

};

/**
 * Track custom events in GA4
 */
export const trackEvent = (
  eventName: string,
  eventParams?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    event_category: eventParams?.category,
    event_label: eventParams?.label,
    value: eventParams?.value,
    ...eventParams,
  });

};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    category: 'engagement',
    label: buttonName,
    button_location: location,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent(success ? 'form_submit_success' : 'form_submit_error', {
    category: 'forms',
    label: formName,
  });
};

/**
 * Track contact form submissions
 */
export const trackContactFormSubmit = (formType: 'contact' | 'quote' | 'booking') => {
  trackEvent('contact_form_submit', {
    category: 'lead_generation',
    label: formType,
    value: 1,
  });
};

/**
 * Track service page views
 */
export const trackServiceView = (serviceName: string) => {
  trackEvent('view_service', {
    category: 'services',
    label: serviceName,
  });
};

/**
 * Track template views
 */
export const trackTemplateView = (templateName: string) => {
  trackEvent('view_template', {
    category: 'templates',
    label: templateName,
  });
};

/**
 * Track CTA clicks
 */
export const trackCTAClick = (ctaText: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    category: 'engagement',
    label: ctaText,
    cta_location: ctaLocation,
  });
};

/**
 * Track phone number clicks
 */
export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    category: 'engagement',
    label: 'phone_number',
  });
};

/**
 * Track email clicks
 */
export const trackEmailClick = () => {
  trackEvent('email_click', {
    category: 'engagement',
    label: 'email_address',
  });
};

/**
 * Track WhatsApp button clicks
 */
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    category: 'engagement',
    label: 'whatsapp_button',
  });
};

/**
 * Track navigation clicks
 */
export const trackNavigationClick = (linkText: string, destination: string) => {
  trackEvent('navigation_click', {
    category: 'navigation',
    label: linkText,
    link_destination: destination,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100) => {
  trackEvent('scroll_depth', {
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
  });
};

/**
 * Track video plays (if you have videos)
 */
export const trackVideoPlay = (videoName: string) => {
  trackEvent('video_play', {
    category: 'engagement',
    label: videoName,
  });
};

/**
 * Track file downloads
 */
export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    category: 'downloads',
    label: fileName,
    file_type: fileType,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_click', {
    category: 'engagement',
    label: linkText || url,
    link_url: url,
  });
};

/**
 * Track errors
 */
export const trackError = (errorMessage: string, errorLocation?: string) => {
  trackEvent('error', {
    category: 'errors',
    label: errorMessage,
    error_location: errorLocation,
  });
};

/**
 * Track search queries (if you have search)
 */
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    category: 'search',
    label: searchTerm,
    search_term: searchTerm,
  });
};

/**
 * Initialize Microsoft Clarity with SPA support.
 * Only injects the script if not already present.
 */
export const initClarity = () => {
  if (typeof window === 'undefined') return;
  // Prevent duplicate script injection
  if (document.querySelector('script[src*="clarity.ms/tag"]')) return;

  (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
    c[a] = c[a] || function() {
      (c[a].q = c[a].q || []).push(arguments);
    };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y?.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", ANALYTICS_CONFIG.CLARITY_PROJECT_ID);
};

/**
 * Initialize analytics.
 *
 * Sets up the dataLayer stub so tracking helpers (trackPageView, etc.)
 * work without errors.  The actual GA4 script tag and Clarity snippet
 * are loaded ONLY after the user gives explicit consent via
 * CookieBanner — this ensures GDPR/DSGVO compliance.
 */
export const initAnalytics = () => {
  // Always set up the stub so calls don't throw
  initGA4();

  // Only boot Clarity if the user already consented in a previous session.
  // First-time visitors will get analytics loaded via CookieBanner.acceptAll()
  if (hasAnalyticsConsent()) {
    initClarity();
  }
};
