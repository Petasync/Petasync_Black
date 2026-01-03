import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/**
 * Hook to automatically track page views on route changes
 *
 * This ensures that both GA4 and Microsoft Clarity track
 * page transitions in the SPA correctly.
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view whenever the route changes
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);
};
