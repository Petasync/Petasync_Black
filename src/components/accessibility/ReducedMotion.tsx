import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// HOC for conditionally disabling animations
export function withReducedMotion<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function ReducedMotionWrapper(props: P) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
      // Apply reduced motion styles
      useEffect(() => {
        document.body.classList.add('reduce-motion');
        return () => document.body.classList.remove('reduce-motion');
      }, []);
    }

    return <Component {...props} />;
  };
}
