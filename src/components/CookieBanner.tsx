import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = "petasync_cookie_consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // Small delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    } else {
      // Apply saved consent
      const parsed = JSON.parse(savedConsent) as ConsentState;
      if (parsed.analytics) {
        loadAnalytics();
      }
    }
  }, []);

  const loadAnalytics = () => {
    // Google Analytics
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    if (gaId) {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", gaId);
    }

    // Microsoft Clarity
    const clarityId = import.meta.env.VITE_MICROSOFT_CLARITY_ID;
    if (clarityId) {
      (function(c: Window, l: Document, a: string, r: string, i: string) {
        (c as unknown as Record<string, unknown>)[a] = (c as unknown as Record<string, unknown>)[a] || function() {
          ((c as unknown as Record<string, unknown>)[a] as { q: unknown[] }).q = ((c as unknown as Record<string, unknown>)[a] as { q?: unknown[] }).q || [];
          ((c as unknown as Record<string, unknown>)[a] as { q: unknown[] }).q.push(arguments);
        };
        const t = l.createElement(r) as HTMLScriptElement;
        t.async = true;
        t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        y?.parentNode?.insertBefore(t, y);
      })(window, document, "clarity", "script", clarityId);
    }
  };

  const acceptAll = () => {
    const fullConsent = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(fullConsent));
    loadAnalytics();
    setIsVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    if (consent.analytics) {
      loadAnalytics();
    }
    setIsVisible(false);
  };

  const declineAll = () => {
    const minimalConsent = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(minimalConsent));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-fade-in">
      <div className="container-tight">
        <div className="relative p-6 md:p-8 rounded-2xl bg-card/95 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Glow effect */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 -z-10 blur-sm" />
          
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Wir respektieren Ihre Privatsphäre
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Website zu analysieren. 
                Sie können wählen, welche Cookies Sie akzeptieren möchten.
              </p>
              
              {showDetails && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-sm font-medium text-foreground">Notwendig</p>
                      <p className="text-xs text-muted-foreground">Für die Funktion der Website erforderlich</p>
                    </div>
                    <div className="w-10 h-5 rounded-full bg-primary/20 flex items-center justify-end px-0.5">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-sm font-medium text-foreground">Analyse</p>
                      <p className="text-xs text-muted-foreground">Google Analytics & Microsoft Clarity</p>
                    </div>
                    <button
                      onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                      className={cn(
                        "w-10 h-5 rounded-full flex items-center px-0.5 transition-colors",
                        consent.analytics ? "bg-primary/20 justify-end" : "bg-white/10 justify-start"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full transition-colors",
                        consent.analytics ? "bg-primary" : "bg-muted-foreground"
                      )} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Marketing</p>
                      <p className="text-xs text-muted-foreground">Für personalisierte Werbung</p>
                    </div>
                    <button
                      onClick={() => setConsent(c => ({ ...c, marketing: !c.marketing }))}
                      className={cn(
                        "w-10 h-5 rounded-full flex items-center px-0.5 transition-colors",
                        consent.marketing ? "bg-primary/20 justify-end" : "bg-white/10 justify-start"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full transition-colors",
                        consent.marketing ? "bg-primary" : "bg-muted-foreground"
                      )} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {!showDetails ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setShowDetails(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Einstellungen
                  </Button>
                  <Button
                    variant="outline"
                    onClick={declineAll}
                    className="border-white/10 hover:bg-white/5"
                  >
                    Ablehnen
                  </Button>
                  <Button
                    onClick={acceptAll}
                    className="bg-foreground text-background hover:bg-foreground/90"
                  >
                    Alle akzeptieren
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setShowDetails(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Zurück
                  </Button>
                  <Button
                    variant="outline"
                    onClick={declineAll}
                    className="border-white/10 hover:bg-white/5"
                  >
                    Nur notwendige
                  </Button>
                  <Button
                    onClick={acceptSelected}
                    className="bg-foreground text-background hover:bg-foreground/90"
                  >
                    Auswahl speichern
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 flex gap-4 text-xs text-muted-foreground">
            <a href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</a>
            <a href="/impressum" className="hover:text-foreground transition-colors">Impressum</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Type declarations for window
declare global {
  interface Window {
    dataLayer: unknown[];
    clarity: unknown;
  }
}
