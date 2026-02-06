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
import { useEffect, lazy, Suspense, useState, useCallback } from "react";
import React from "react";
import { AdminProtectedRoute } from "./components/admin/AdminProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Eager load critical pages
import Index from "./pages/Index";

// Lazy load all other pages for better performance
const Websites = lazy(() => import("./pages/Websites"));
const Privatkunden = lazy(() => import("./pages/Privatkunden"));
const Geschaeftskunden = lazy(() => import("./pages/Geschaeftskunden"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Service pages
const PCReparatur = lazy(() => import("./pages/services/PCReparatur"));
const LeihPC = lazy(() => import("./pages/services/LeihPC"));
const ITSicherheit = lazy(() => import("./pages/services/ITSicherheit"));
const Netzwerk = lazy(() => import("./pages/services/Netzwerk"));
const ITBusiness = lazy(() => import("./pages/services/ITBusiness"));
const Webdesign = lazy(() => import("./pages/services/Webdesign"));
const ITInfrastruktur = lazy(() => import("./pages/services/ITInfrastruktur"));
const ITSupport = lazy(() => import("./pages/services/ITSupport"));
const Beratung = lazy(() => import("./pages/services/Beratung"));
const Diagnose = lazy(() => import("./pages/services/Diagnose"));
const PCReinigung = lazy(() => import("./pages/services/PCReinigung"));
const Datenrettung = lazy(() => import("./pages/services/Datenrettung"));
const PCAufruestung = lazy(() => import("./pages/services/PCAufruestung"));
const PCZusammenbau = lazy(() => import("./pages/services/PCZusammenbau"));

// Website pages
const WebsiteTemplate = lazy(() => import("./pages/websites/Template"));
const WebsiteStarter = lazy(() => import("./pages/websites/Starter"));
const WebsiteBusiness = lazy(() => import("./pages/websites/Business"));
const WebsiteEnterprise = lazy(() => import("./pages/websites/Enterprise"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminVerify2FA = lazy(() => import("./pages/admin/Verify2FA"));
const AdminForgotPassword = lazy(() => import("./pages/admin/ForgotPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminInquiries = lazy(() => import("./pages/admin/Inquiries"));
const AdminCustomers = lazy(() => import("./pages/admin/Customers"));
const AdminQuotes = lazy(() => import("./pages/admin/Quotes"));
const AdminInvoices = lazy(() => import("./pages/admin/Invoices"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const AdminAppointments = lazy(() => import("./pages/admin/Appointments"));
const AdminWebsiteProjects = lazy(() => import("./pages/admin/WebsiteProjects"));
const AdminSetup2FA = lazy(() => import("./pages/admin/Setup2FA"));
const AdminMagicLinkHandler = lazy(() => import("./pages/admin/MagicLinkHandler"));
const AdminUserManagement = lazy(() => import("./pages/admin/UserManagement"));
const AdminServiceCatalog = lazy(() => import("./pages/admin/ServiceCatalog"));
const AdminJobs = lazy(() => import("./pages/admin/Jobs"));
const AdminRecurringInvoices = lazy(() => import("./pages/admin/RecurringInvoices"));

// Template pages
const TemplatesShowcase = lazy(() => import("./pages/TemplatesShowcase"));
const HandwerkerTemplate = lazy(() => import("./pages/templates/HandwerkerExtended"));
const VersicherungTemplate = lazy(() => import("./pages/templates/VersicherungExtended"));
const RestaurantTemplate = lazy(() => import("./pages/templates/RestaurantExtended"));
const RestaurantSpeisekarte = lazy(() => import("./pages/templates/restaurant/Speisekarte"));
const RestaurantVorspeisen = lazy(() => import("./pages/templates/restaurant/Vorspeisen"));
const RestaurantHauptgerichte = lazy(() => import("./pages/templates/restaurant/Hauptgerichte"));
const RestaurantDesserts = lazy(() => import("./pages/templates/restaurant/Desserts"));
const RestaurantReservierung = lazy(() => import("./pages/templates/restaurant/Reservierung"));
const RestaurantEvents = lazy(() => import("./pages/templates/restaurant/Events"));
const FitnessTemplate = lazy(() => import("./pages/templates/FitnessExtended"));
const FitnessKursplan = lazy(() => import("./pages/templates/fitness/Kursplan"));
const FitnessYoga = lazy(() => import("./pages/templates/fitness/Yoga"));
const FitnessHIIT = lazy(() => import("./pages/templates/fitness/HIIT"));
const ImmobilienTemplate = lazy(() => import("./pages/templates/ImmobilienExtended"));
const ImmobilienObjekte = lazy(() => import("./pages/templates/immobilien/Objekte"));
const ImmobilienGrundriss3D = lazy(() => import("./pages/templates/immobilien/Grundriss3D"));
const ImmobilienTeam = lazy(() => import("./pages/templates/immobilien/Team"));
const FotografTemplate = lazy(() => import("./pages/templates/FotografExtended"));
const FotografPortfolio = lazy(() => import("./pages/templates/fotograf/Portfolio"));
const FotografHochzeit = lazy(() => import("./pages/templates/fotograf/Hochzeit"));
const FotografPortrait = lazy(() => import("./pages/templates/fotograf/Portrait"));
const FriseurTemplate = lazy(() => import("./pages/templates/FriseurExtended"));
const FriseurServices = lazy(() => import("./pages/templates/friseur/Services"));
const FriseurOnlineBuchung = lazy(() => import("./pages/templates/friseur/OnlineBuchung"));
const FriseurHaarschnitt = lazy(() => import("./pages/templates/friseur/Haarschnitt"));
const FriseurColoration = lazy(() => import("./pages/templates/friseur/Coloration"));
const FriseurPreise = lazy(() => import("./pages/templates/friseur/Preise"));
const FriseurTeam = lazy(() => import("./pages/templates/friseur/Team"));
const FriseurGalerie = lazy(() => import("./pages/templates/friseur/Galerie"));
const AutowerkstattTemplate = lazy(() => import("./pages/templates/AutowerkstattExtended"));
const AutowerkstattPreisrechner = lazy(() => import("./pages/templates/autowerkstatt/Preisrechner"));
const AutowerkstattInspektion = lazy(() => import("./pages/templates/autowerkstatt/Inspektion"));
const AutowerkstattMotor = lazy(() => import("./pages/templates/autowerkstatt/Motor"));
const AutowerkstattBremsen = lazy(() => import("./pages/templates/autowerkstatt/Bremsen"));
const AutowerkstattElektrik = lazy(() => import("./pages/templates/autowerkstatt/Elektrik"));
const AutowerkstattKarosserie = lazy(() => import("./pages/templates/autowerkstatt/Karosserie"));
const AutowerkstattTUV = lazy(() => import("./pages/templates/autowerkstatt/TUV"));
const HandwerkerProjekte = lazy(() => import("./pages/templates/handwerker/Projekte"));
const HandwerkerElektro = lazy(() => import("./pages/templates/handwerker/ElektroInstallationen"));
const HandwerkerSanitaer = lazy(() => import("./pages/templates/handwerker/SanitaerHeizung"));
const HandwerkerSchreiner = lazy(() => import("./pages/templates/handwerker/SchreinerArbeiten"));
const HandwerkerMaler = lazy(() => import("./pages/templates/handwerker/MalerArbeiten"));
const HandwerkerRenovierungen = lazy(() => import("./pages/templates/handwerker/Renovierungen"));
const HandwerkerWartung = lazy(() => import("./pages/templates/handwerker/WartungService"));
const VersicherungRechner = lazy(() => import("./pages/templates/versicherung/Rechner"));
const VersicherungProdukte = lazy(() => import("./pages/templates/versicherung/Produkte"));
const VersicherungBeratung = lazy(() => import("./pages/templates/versicherung/Beratung"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

/**
 * Enhanced Error Boundary with auto-recovery
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorCount: number;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Increment error count
    this.setState(prev => ({ errorCount: prev.errorCount + 1 }));

    // Auto-recovery nach 3 Sekunden (max 3 Versuche)
    if (this.state.errorCount < 3) {
      this.retryTimeout = setTimeout(() => {
        this.setState({ hasError: false, error: undefined });
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorCount: 0 });
  };

  handleClearCache = () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    // Reload page
    window.location.href = '/admin/login';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Etwas ist schiefgelaufen</h1>
            <p className="text-muted-foreground mb-6">
              Die Seite konnte nicht geladen werden.
            </p>
            {this.state.errorCount < 3 && (
              <p className="text-sm text-muted-foreground mb-4">
                Automatischer Neuversuch in 3 Sekunden...
              </p>
            )}
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
                Cache leeren & neu anmelden
              </button>
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
 * Admin Routes Wrapper - enthält AuthProvider
 */
const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Admin Routes (no auth required) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/verify-2fa" element={<AdminVerify2FA />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/magic-link" element={<AdminMagicLinkHandler />} />

        {/* Protected Admin Routes */}
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
      </Routes>
    </AuthProvider>
  );
};

/**
 * Route Handler - entscheidet ob Admin oder Public Routes
 */
const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminRoutes />;
  }

  return (
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
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Initialize analytics on app mount
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
              <AnalyticsWrapper>
                <ScrollToTop />
                <Suspense fallback={<PageLoader />}>
                  <AppRoutes />
                </Suspense>
                <CookieBanner />
              </AnalyticsWrapper>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
