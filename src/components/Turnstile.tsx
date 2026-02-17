import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export function Turnstile({ onVerify, onExpire, onError }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const handleVerify = useCallback((token: string) => {
    onVerify(token);
  }, [onVerify]);

  const handleExpire = useCallback(() => {
    onExpire?.();
  }, [onExpire]);

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  useEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (!siteKey || !containerRef.current) return;

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: handleVerify,
          "expired-callback": handleExpire,
          "error-callback": handleError,
          theme: "dark",
          size: "normal",
        });
      }
    };

    // Check if turnstile is already loaded
    if (window.turnstile) {
      renderWidget();
    } else {
      // Load the Turnstile script on demand
      const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.onerror = () => {
          console.warn('[Turnstile] Script failed to load');
          handleError();
        };
        document.head.appendChild(script);
      }

      // Wait for script to load with a timeout (15 seconds max)
      const MAX_WAIT = 15_000;
      const POLL_INTERVAL = 200;
      let elapsed = 0;
      const checkInterval = setInterval(() => {
        elapsed += POLL_INTERVAL;
        if (window.turnstile) {
          clearInterval(checkInterval);
          renderWidget();
        } else if (elapsed >= MAX_WAIT) {
          clearInterval(checkInterval);
          console.warn('[Turnstile] Timed out waiting for script');
          handleError();
        }
      }, POLL_INTERVAL);

      return () => clearInterval(checkInterval);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [handleVerify, handleExpire, handleError]);

  return <div ref={containerRef} className="cf-turnstile" />;
}
