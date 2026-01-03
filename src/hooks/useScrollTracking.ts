import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

/**
 * Hook to track scroll depth
 * Tracks when user scrolls to 25%, 50%, 75%, and 100% of the page
 */
export const useScrollTracking = () => {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Track scroll milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          trackScrollDepth(milestone as 25 | 50 | 75 | 100);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset tracked depths when component unmounts (new page)
      trackedDepths.current.clear();
    };
  }, []);
};
