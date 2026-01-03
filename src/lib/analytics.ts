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

// Google Analytics 4 Types
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    clarity?: (...args: any[]) => void;
  }
}

/**
 * Initialize Google Analytics 4
 */
export const initGA4 = () => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle this manually for SPA
    cookie_flags: 'SameSite=None;Secure',
  });
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

  console.log('[Analytics] Page view tracked:', path);
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

  console.log('[Analytics] Event tracked:', eventName, eventParams);
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
 * Initialize Microsoft Clarity with SPA support
 */
export const initClarity = () => {
  if (typeof window === 'undefined') return;

  (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
    c[a] = c[a] || function() {
      (c[a].q = c[a].q || []).push(arguments);
    };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", ANALYTICS_CONFIG.CLARITY_PROJECT_ID);

  console.log('[Clarity] Initialized with SPA support');
};

/**
 * Initialize all analytics
 */
export const initAnalytics = () => {
  initGA4();
  initClarity();
};
