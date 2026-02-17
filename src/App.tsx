import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { CookieBanner } from "@/components/CookieBanner";
import { initAnalytics } from "@/lib/analytics";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useEffect, lazy, Suspense, ComponentType } from "react";
import React from "react";
import { AdminProtectedRoute } from "./components/admin/AdminProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const RELOAD_FLAG = 'petasync_chunk_reload';

/**
 * Lazy import with automatic retry on chunk load failure.
 * If the first import fails (stale chunks after deployment),
 * reloads the page to fetch fresh HTML with correct chunk hashes.
 *
 * Also pre-validates the chunk response to detect when the server
 * returns HTML (index.html) instead of JavaScript — a common SPA
 * misconfiguration that silently breaks all lazy-loaded pages.
 */
function lazyWithRetry<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
) {
  return lazy(() =>
    importFn()
      .then((module) => {
        // Import succeeded — clear any stale reload flag from a previous attempt
        sessionStorage.removeItem(RELOAD_FLAG);
        return module;
      })
      .catch((error) => {
        // Only retry once per session to prevent infinite loops
        const alreadyRetried = sessionStorage.getItem(RELOAD_FLAG);
        if (!alreadyRetried) {
          sessionStorage.setItem(RELOAD_FLAG, '1');
          window.location.reload();
          // Return never-resolving promise so Suspense shows the spinner
          // until the page reload completes — prevents the error from
          // propagating to ErrorBoundary and triggering a conflicting reload.
          return new Promise<{ default: T }>(() => {});
        }
        throw error;
      })
  );
}

// Eager load critical pages
import Index from "./pages/Index";

// Lazy load all other pages with retry logic for chunk errors
const Websites = lazyWithRetry(() => import("./pages/Websites"));
const Privatkunden = lazyWithRetry(() => import("./pages/Privatkunden"));
const Geschaeftskunden = lazyWithRetry(() => import("./pages/Geschaeftskunden"));
const Kontakt = lazyWithRetry(() => import("./pages/Kontakt"));
const FAQ = lazyWithRetry(() => import("./pages/FAQ"));
const Impressum = lazyWithRetry(() => import("./pages/Impressum"));
const Datenschutz = lazyWithRetry(() => import("./pages/Datenschutz"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

// Service pages
const PCReparatur = lazyWithRetry(() => import("./pages/services/PCReparatur"));
const LeihPC = lazyWithRetry(() => import("./pages/services/LeihPC"));
const ITSicherheit = lazyWithRetry(() => import("./pages/services/ITSicherheit"));
const Netzwerk = lazyWithRetry(() => import("./pages/services/Netzwerk"));
const ITBusiness = lazyWithRetry(() => import("./pages/services/ITBusiness"));
const Webdesign = lazyWithRetry(() => import("./pages/services/Webdesign"));
const ITInfrastruktur = lazyWithRetry(() => import("./pages/services/ITInfrastruktur"));
const ITSupport = lazyWithRetry(() => import("./pages/services/ITSupport"));
const Beratung = lazyWithRetry(() => import("./pages/services/Beratung"));
const Diagnose = lazyWithRetry(() => import("./pages/services/Diagnose"));
const PCReinigung = lazyWithRetry(() => import("./pages/services/PCReinigung"));
const Datenrettung = lazyWithRetry(() => import("./pages/services/Datenrettung"));
const PCAufruestung = lazyWithRetry(() => import("./pages/services/PCAufruestung"));
const PCZusammenbau = lazyWithRetry(() => import("./pages/services/PCZusammenbau"));

// Website pages
const WebsiteTemplate = lazyWithRetry(() => import("./pages/websites/Template"));
const WebsiteStarter = lazyWithRetry(() => import("./pages/websites/Starter"));
const WebsiteBusiness = lazyWithRetry(() => import("./pages/websites/Business"));
const WebsiteEnterprise = lazyWithRetry(() => import("./pages/websites/Enterprise"));

// Admin pages
const AdminLogin = lazyWithRetry(() => import("./pages/admin/Login"));
const AdminVerify2FA = lazyWithRetry(() => import("./pages/admin/Verify2FA"));
const AdminForgotPassword = lazyWithRetry(() => import("./pages/admin/ForgotPassword"));
const AdminDashboard = lazyWithRetry(() => import("./pages/admin/Dashboard"));
const AdminInquiries = lazyWithRetry(() => import("./pages/admin/Inquiries"));
const AdminCustomers = lazyWithRetry(() => import("./pages/admin/Customers"));
const AdminQuotes = lazyWithRetry(() => import("./pages/admin/Quotes"));
const AdminInvoices = lazyWithRetry(() => import("./pages/admin/Invoices"));
const AdminSettings = lazyWithRetry(() => import("./pages/admin/Settings"));
const AdminAppointments = lazyWithRetry(() => import("./pages/admin/Appointments"));
const AdminWebsiteProjects = lazyWithRetry(() => import("./pages/admin/WebsiteProjects"));
const AdminSetup2FA = lazyWithRetry(() => import("./pages/admin/Setup2FA"));
const AdminMagicLinkHandler = lazyWithRetry(() => import("./pages/admin/MagicLinkHandler"));
const AdminUserManagement = lazyWithRetry(() => import("./pages/admin/UserManagement"));
const AdminServiceCatalog = lazyWithRetry(() => import("./pages/admin/ServiceCatalog"));
const AdminJobs = lazyWithRetry(() => import("./pages/admin/Jobs"));
const AdminRecurringInvoices = lazyWithRetry(() => import("./pages/admin/RecurringInvoices"));

// Template pages
const TemplatesShowcase = lazyWithRetry(() => import("./pages/TemplatesShowcase"));
const HandwerkerTemplate = lazyWithRetry(() => import("./pages/templates/HandwerkerExtended"));
const VersicherungTemplate = lazyWithRetry(() => import("./pages/templates/VersicherungExtended"));
const RestaurantTemplate = lazyWithRetry(() => import("./pages/templates/RestaurantExtended"));
const RestaurantSpeisekarte = lazyWithRetry(() => import("./pages/templates/restaurant/Speisekarte"));
const RestaurantVorspeisen = lazyWithRetry(() => import("./pages/templates/restaurant/Vorspeisen"));
const RestaurantHauptgerichte = lazyWithRetry(() => import("./pages/templates/restaurant/Hauptgerichte"));
const RestaurantDesserts = lazyWithRetry(() => import("./pages/templates/restaurant/Desserts"));
const RestaurantReservierung = lazyWithRetry(() => import("./pages/templates/restaurant/Reservierung"));
const RestaurantEvents = lazyWithRetry(() => import("./pages/templates/restaurant/Events"));
const FitnessTemplate = lazyWithRetry(() => import("./pages/templates/FitnessExtended"));
const FitnessKursplan = lazyWithRetry(() => import("./pages/templates/fitness/Kursplan"));
const FitnessYoga = lazyWithRetry(() => import("./pages/templates/fitness/Yoga"));
const FitnessHIIT = lazyWithRetry(() => import("./pages/templates/fitness/HIIT"));
const ImmobilienTemplate = lazyWithRetry(() => import("./pages/templates/ImmobilienExtended"));
const ImmobilienObjekte = lazyWithRetry(() => import("./pages/templates/immobilien/Objekte"));
const ImmobilienGrundriss3D = lazyWithRetry(() => import("./pages/templates/immobilien/Grundriss3D"));
const ImmobilienTeam = lazyWithRetry(() => import("./pages/templates/immobilien/Team"));
const FotografTemplate = lazyWithRetry(() => import("./pages/templates/FotografExtended"));
const FotografPortfolio = lazyWithRetry(() => import("./pages/templates/fotograf/Portfolio"));
const FotografHochzeit = lazyWithRetry(() => import("./pages/templates/fotograf/Hochzeit"));
const FotografPortrait = lazyWithRetry(() => import("./pages/templates/fotograf/Portrait"));
const FriseurTemplate = lazyWithRetry(() => import("./pages/templates/FriseurExtended"));
const FriseurServices = lazyWithRetry(() => import("./pages/templates/friseur/Services"));
const FriseurOnlineBuchung = lazyWithRetry(() => import("./pages/templates/friseur/OnlineBuchung"));
const FriseurHaarschnitt = lazyWithRetry(() => import("./pages/templates/friseur/Haarschnitt"));
const FriseurColoration = lazyWithRetry(() => import("./pages/templates/friseur/Coloration"));
const FriseurPreise = lazyWithRetry(() => import("./pages/templates/friseur/Preise"));
const FriseurTeam = lazyWithRetry(() => import("./pages/templates/friseur/Team"));
const FriseurGalerie = lazyWithRetry(() => import("./pages/templates/friseur/Galerie"));
const AutowerkstattTemplate = lazyWithRetry(() => import("./pages/templates/AutowerkstattExtended"));
const AutowerkstattPreisrechner = lazyWithRetry(() => import("./pages/templates/autowerkstatt/Preisrechner"));
const AutowerkstattInspektion = lazyWithRetry(() => import("./pages/templates/autowerkstatt/Inspektion"));
const AutowerkstattMotor = lazyWithRetry(() => import("./pages/templates/autowerkstatt/Motor"));
const AutowerkstattBremsen = lazyWithRetry(() => import("./pages/templates/autowerkstatt/Bremsen"));
const AutowerkstattElektrik = lazyWithRetry(() => import("./pages/templates/autowerkstatt/Elektrik"));
const AutowerkstattKarosserie = lazyWithRetry(() => import("./pages/templates/autowerkstatt/Karosserie"));
const AutowerkstattTUV = lazyWithRetry(() => import("./pages/templates/autowerkstatt/TUV"));
const HandwerkerProjekte = lazyWithRetry(() => import("./pages/templates/handwerker/Projekte"));
const HandwerkerElektro = lazyWithRetry(() => import("./pages/templates/handwerker/ElektroInstallationen"));
const HandwerkerSanitaer = lazyWithRetry(() => import("./pages/templates/handwerker/SanitaerHeizung"));
const HandwerkerSchreiner = lazyWithRetry(() => import("./pages/templates/handwerker/SchreinerArbeiten"));
const HandwerkerMaler = lazyWithRetry(() => import("./pages/templates/handwerker/MalerArbeiten"));
const HandwerkerRenovierungen = lazyWithRetry(() => import("./pages/templates/handwerker/Renovierungen"));
const HandwerkerWartung = lazyWithRetry(() => import("./pages/templates/handwerker/WartungService"));
const VersicherungRechner = lazyWithRetry(() => import("./pages/templates/versicherung/Rechner"));
const VersicherungProdukte = lazyWithRetry(() => import("./pages/templates/versicherung/Produkte"));
const VersicherungBeratung = lazyWithRetry(() => import("./pages/templates/versicherung/Beratung"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

/**
 * Error Boundary with chunk loading error recovery
 *
 * Detects stale chunk errors (after deployments) and auto-reloads.
 * Uses sessionStorage flag to prevent infinite reload loops.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  showDetails: boolean;
}

function isChunkLoadError(error: Error): boolean {
  const msg = (error.message || '').toLowerCase();
  const name = (error.name || '').toLowerCase();
  return (
    msg.includes('loading chunk') ||
    msg.includes('dynamically imported module') ||
    msg.includes('failed to fetch') ||
    msg.includes("unexpected token '<'") ||
    msg.includes('expected expression') ||
    msg.includes('is not a valid javascript') ||
    (name === 'syntaxerror' && msg.includes('unexpected token')) ||
    msg.includes('loading css chunk')
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; resetKey?: string },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; resetKey?: string }) {
    super(props);
    this.state = { hasError: false, showDetails: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: { children: React.ReactNode; resetKey?: string }) {
    // When the route changes (resetKey), clear the error state so the user
    // can navigate away from a broken page WITHOUT destroying the entire
    // component tree (which would cause removeChild race conditions).
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: undefined, showDetails: false });
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);

    // For chunk loading errors: auto-reload once to get fresh assets
    if (isChunkLoadError(error)) {
      const alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG);
      if (!alreadyReloaded) {
        sessionStorage.setItem(RELOAD_FLAG, '1');
        window.location.reload();
        return;
      }
      // Already reloaded once — clear flag and show error UI
      sessionStorage.removeItem(RELOAD_FLAG);
    }
  }

  handleRetry = () => {
    sessionStorage.removeItem(RELOAD_FLAG);
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  handleClearCache = async () => {
    try {
      // Unregister service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }
      // Clear caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (const name of cacheNames) {
          await caches.delete(name);
        }
      }
    } catch {
      // Ignore — still clear storage and reload below
    }
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  toggleDetails = () => {
    this.setState(s => ({ ...s, showDetails: !s.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || 'Unknown error';
      const errorName = this.state.error?.name || 'Error';
      const isChunk = this.state.error ? isChunkLoadError(this.state.error) : false;

      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center min-h-screen bg-background text-foreground p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Etwas ist schiefgelaufen</h1>
            <p className="text-muted-foreground mb-6">
              {isChunk
                ? 'Die Seite konnte nicht geladen werden. Bitte laden Sie die Seite neu.'
                : 'Ein unerwarteter Fehler ist aufgetreten.'}
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="block w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90"
              >
                Seite neu laden
              </button>
              <button
                onClick={this.handleClearCache}
                className="block w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90"
              >
                Cache leeren
              </button>
              <a
                href="/"
                className="block w-full text-center text-sm text-muted-foreground hover:text-foreground mt-4"
              >
                Website öffnen →
              </a>
              <button
                onClick={this.toggleDetails}
                className="block w-full text-center text-xs text-muted-foreground hover:text-foreground mt-2"
              >
                {this.state.showDetails ? 'Details ausblenden' : 'Fehlerdetails anzeigen'}
              </button>
              {this.state.showDetails && (
                <div className="mt-2 p-3 rounded-lg bg-secondary/50 text-left text-xs text-muted-foreground font-mono break-all">
                  <p><strong>{errorName}:</strong> {errorMsg}</p>
                  {this.state.error?.stack && (
                    <pre className="mt-2 whitespace-pre-wrap text-[10px] opacity-70 max-h-40 overflow-auto">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 Minuten
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Analytics wrapper component
 */
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  useScrollTracking();
  return <>{children}</>;
};

/**
 * Route-aware ErrorBoundary wrapper.
 *
 * Passes location.pathname as `resetKey` so the ErrorBoundary clears
 * its error state on navigation via componentDidUpdate.
 *
 * IMPORTANT: We do NOT use `key={location.pathname}` because that
 * destroys and recreates the entire subtree on every route change,
 * causing removeChild race conditions with Three.js Canvas cleanup.
 * The resetKey approach clears the error WITHOUT unmounting children.
 */
const RouteErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <ErrorBoundary resetKey={location.pathname}>
      {children}
    </ErrorBoundary>
  );
};

const App = () => {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <RouteErrorBoundaryWrapper>
                  <AnalyticsWrapper>
                    <ScrollToTop />
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/privatkunden" element={<Privatkunden />} />
                      <Route path="/geschaeftskunden" element={<Geschaeftskunden />} />
                      <Route path="/websites" element={<Websites />} />
                      <Route path="/websites/template" element={<WebsiteTemplate />} />
                      <Route path="/websites/starter" element={<WebsiteStarter />} />
                      <Route path="/websites/business" element={<WebsiteBusiness />} />
                      <Route path="/websites/enterprise" element={<WebsiteEnterprise />} />
                      <Route path="/kontakt" element={<Kontakt />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/impressum" element={<Impressum />} />
                      <Route path="/datenschutz" element={<Datenschutz />} />
                      <Route path="/services/diagnose" element={<Diagnose />} />
                      <Route path="/services/pc-reinigung" element={<PCReinigung />} />
                      <Route path="/services/pc-reparatur" element={<PCReparatur />} />
                      <Route path="/services/datenrettung" element={<Datenrettung />} />
                      <Route path="/services/it-sicherheit" element={<ITSicherheit />} />
                      <Route path="/services/pc-aufruestung" element={<PCAufruestung />} />
                      <Route path="/services/netzwerk" element={<Netzwerk />} />
                      <Route path="/services/pc-zusammenbau" element={<PCZusammenbau />} />
                      <Route path="/services/leih-pc" element={<LeihPC />} />
                      <Route path="/services/it-business" element={<ITBusiness />} />
                      <Route path="/services/webdesign" element={<Webdesign />} />
                      <Route path="/services/it-infrastruktur" element={<ITInfrastruktur />} />
                      <Route path="/services/it-support" element={<ITSupport />} />
                      <Route path="/services/beratung" element={<Beratung />} />
                      {/* Template Routes */}
                      <Route path="/templates" element={<TemplatesShowcase />} />
                      <Route path="/templates/handwerker" element={<HandwerkerTemplate />} />
                      <Route path="/templates/versicherung" element={<VersicherungTemplate />} />
                      <Route path="/templates/restaurant" element={<RestaurantTemplate />} />
                      <Route path="/templates/restaurant/speisekarte" element={<RestaurantSpeisekarte />} />
                      <Route path="/templates/restaurant/vorspeisen" element={<RestaurantVorspeisen />} />
                      <Route path="/templates/restaurant/hauptgerichte" element={<RestaurantHauptgerichte />} />
                      <Route path="/templates/restaurant/desserts" element={<RestaurantDesserts />} />
                      <Route path="/templates/restaurant/reservierung" element={<RestaurantReservierung />} />
                      <Route path="/templates/restaurant/events" element={<RestaurantEvents />} />
                      <Route path="/templates/fitness" element={<FitnessTemplate />} />
                      <Route path="/templates/fitness/kursplan" element={<FitnessKursplan />} />
                      <Route path="/templates/fitness/yoga" element={<FitnessYoga />} />
                      <Route path="/templates/fitness/hiit" element={<FitnessHIIT />} />
                      <Route path="/templates/immobilien" element={<ImmobilienTemplate />} />
                      <Route path="/templates/immobilien/objekte" element={<ImmobilienObjekte />} />
                      <Route path="/templates/immobilien/3d-rundgang" element={<ImmobilienGrundriss3D />} />
                      <Route path="/templates/immobilien/team" element={<ImmobilienTeam />} />
                      <Route path="/templates/fotograf" element={<FotografTemplate />} />
                      <Route path="/templates/fotograf/portfolio" element={<FotografPortfolio />} />
                      <Route path="/templates/fotograf/hochzeit" element={<FotografHochzeit />} />
                      <Route path="/templates/fotograf/portrait" element={<FotografPortrait />} />
                      <Route path="/templates/friseur" element={<FriseurTemplate />} />
                      <Route path="/templates/friseur/services" element={<FriseurServices />} />
                      <Route path="/templates/friseur/buchung" element={<FriseurOnlineBuchung />} />
                      <Route path="/templates/friseur/haarschnitt" element={<FriseurHaarschnitt />} />
                      <Route path="/templates/friseur/coloration" element={<FriseurColoration />} />
                      <Route path="/templates/friseur/preise" element={<FriseurPreise />} />
                      <Route path="/templates/friseur/team" element={<FriseurTeam />} />
                      <Route path="/templates/friseur/galerie" element={<FriseurGalerie />} />
                      <Route path="/templates/autowerkstatt" element={<AutowerkstattTemplate />} />
                      <Route path="/templates/autowerkstatt/preisrechner" element={<AutowerkstattPreisrechner />} />
                      <Route path="/templates/autowerkstatt/inspektion" element={<AutowerkstattInspektion />} />
                      <Route path="/templates/autowerkstatt/motor" element={<AutowerkstattMotor />} />
                      <Route path="/templates/autowerkstatt/bremsen" element={<AutowerkstattBremsen />} />
                      <Route path="/templates/autowerkstatt/elektrik" element={<AutowerkstattElektrik />} />
                      <Route path="/templates/autowerkstatt/karosserie" element={<AutowerkstattKarosserie />} />
                      <Route path="/templates/autowerkstatt/tuv" element={<AutowerkstattTUV />} />
                      <Route path="/templates/handwerker/projekte" element={<HandwerkerProjekte />} />
                      <Route path="/templates/handwerker/elektro-installationen" element={<HandwerkerElektro />} />
                      <Route path="/templates/handwerker/sanitaer-heizung" element={<HandwerkerSanitaer />} />
                      <Route path="/templates/handwerker/schreiner-arbeiten" element={<HandwerkerSchreiner />} />
                      <Route path="/templates/handwerker/maler-arbeiten" element={<HandwerkerMaler />} />
                      <Route path="/templates/handwerker/renovierungen" element={<HandwerkerRenovierungen />} />
                      <Route path="/templates/handwerker/wartung-service" element={<HandwerkerWartung />} />
                      <Route path="/templates/versicherung/rechner" element={<VersicherungRechner />} />
                      <Route path="/templates/versicherung/produkte" element={<VersicherungProdukte />} />
                      <Route path="/templates/versicherung/beratung" element={<VersicherungBeratung />} />
                      {/* Admin Routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/verify-2fa" element={<AdminVerify2FA />} />
                      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
                      <Route path="/admin/magic-link" element={<AdminMagicLinkHandler />} />
                      <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                      <Route path="/admin/inquiries" element={<AdminProtectedRoute><AdminInquiries /></AdminProtectedRoute>} />
                      <Route path="/admin/customers" element={<AdminProtectedRoute><AdminCustomers /></AdminProtectedRoute>} />
                      <Route path="/admin/quotes" element={<AdminProtectedRoute><AdminQuotes /></AdminProtectedRoute>} />
                      <Route path="/admin/invoices" element={<AdminProtectedRoute><AdminInvoices /></AdminProtectedRoute>} />
                      <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />
                      <Route path="/admin/appointments" element={<AdminProtectedRoute><AdminAppointments /></AdminProtectedRoute>} />
                      <Route path="/admin/website-projects" element={<AdminProtectedRoute><AdminWebsiteProjects /></AdminProtectedRoute>} />
                      <Route path="/admin/users" element={<AdminProtectedRoute><AdminUserManagement /></AdminProtectedRoute>} />
                      <Route path="/admin/services" element={<AdminProtectedRoute><AdminServiceCatalog /></AdminProtectedRoute>} />
                      <Route path="/admin/jobs" element={<AdminProtectedRoute><AdminJobs /></AdminProtectedRoute>} />
                      <Route path="/admin/recurring-invoices" element={<AdminProtectedRoute><AdminRecurringInvoices /></AdminProtectedRoute>} />
                      <Route path="/admin/2fa-setup" element={<AdminProtectedRoute><AdminSetup2FA /></AdminProtectedRoute>} />
                      {/* Catch-all */}
                      <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                    <CookieBanner />
                  </AnalyticsWrapper>
                </RouteErrorBoundaryWrapper>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
