import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CookieBanner } from "@/components/CookieBanner";
import { lazy, Suspense } from "react";

// Critical pages - loaded immediately
import Index from "./pages/Index";
import Privatkunden from "./pages/Privatkunden";
import Geschaeftskunden from "./pages/Geschaeftskunden";
import Kontakt from "./pages/Kontakt";
import NotFound from "./pages/NotFound";

// Secondary pages - lazy loaded for performance
const Websites = lazy(() => import("./pages/Websites"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));

// Service pages - lazy loaded
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
const PCZusammenbau = lazy(() => import("./pages/services/PCZusammenbau"));
const Datenrettung = lazy(() => import("./pages/services/Datenrettung"));
const Aufruestung = lazy(() => import("./pages/services/Aufruestung"));
const Fernwartung = lazy(() => import("./pages/services/Fernwartung"));
const ManagedIT = lazy(() => import("./pages/services/ManagedIT"));
const BusinessSupport = lazy(() => import("./pages/services/BusinessSupport"));

// Website pages - lazy loaded
const WebsiteTemplate = lazy(() => import("./pages/websites/Template"));
const WebsiteStarter = lazy(() => import("./pages/websites/Starter"));
const WebsiteBusiness = lazy(() => import("./pages/websites/Business"));
const WebsiteEnterprise = lazy(() => import("./pages/websites/Enterprise"));
import AdminLogin from "./pages/admin/Login";
import AdminVerify2FA from "./pages/admin/Verify2FA";
import AdminForgotPassword from "./pages/admin/ForgotPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminCustomers from "./pages/admin/Customers";
import AdminQuotes from "./pages/admin/Quotes";
import AdminInvoices from "./pages/admin/Invoices";
import AdminSettings from "./pages/admin/Settings";
import AdminAppointments from "./pages/admin/Appointments";
import AdminWebsiteProjects from "./pages/admin/WebsiteProjects";
import AdminSetup2FA from "./pages/admin/Setup2FA";
import { AdminProtectedRoute } from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient();

// Loading fallback for lazy loaded components
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Critical pages - immediate load */}
              <Route path="/" element={<Index />} />
              <Route path="/privatkunden" element={<Privatkunden />} />
              <Route path="/geschaeftskunden" element={<Geschaeftskunden />} />
              <Route path="/kontakt" element={<Kontakt />} />

              {/* Secondary pages - lazy loaded */}
              <Route path="/websites" element={<Websites />} />
              <Route path="/websites/template" element={<WebsiteTemplate />} />
              <Route path="/websites/starter" element={<WebsiteStarter />} />
              <Route path="/websites/business" element={<WebsiteBusiness />} />
              <Route path="/websites/enterprise" element={<WebsiteEnterprise />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />

              {/* Service pages - lazy loaded */}
              <Route path="/services/pc-reparatur" element={<PCReparatur />} />
              <Route path="/services/leih-pc" element={<LeihPC />} />
              <Route path="/services/it-sicherheit" element={<ITSicherheit />} />
              <Route path="/services/netzwerk" element={<Netzwerk />} />
              <Route path="/services/it-business" element={<ITBusiness />} />
              <Route path="/services/webdesign" element={<Webdesign />} />
              <Route path="/services/it-infrastruktur" element={<ITInfrastruktur />} />
              <Route path="/services/it-support" element={<ITSupport />} />
              <Route path="/services/beratung" element={<Beratung />} />
              <Route path="/services/diagnose" element={<Diagnose />} />
              <Route path="/services/pc-zusammenbau" element={<PCZusammenbau />} />
              <Route path="/services/datenrettung" element={<Datenrettung />} />
              <Route path="/services/aufruestung" element={<Aufruestung />} />
              <Route path="/services/fernwartung" element={<Fernwartung />} />
              <Route path="/services/managed-it" element={<ManagedIT />} />
              <Route path="/services/business-support" element={<BusinessSupport />} />

              {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/verify-2fa" element={<AdminVerify2FA />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
            <Route path="/admin/inquiries" element={<AdminProtectedRoute><AdminInquiries /></AdminProtectedRoute>} />
            <Route path="/admin/customers" element={<AdminProtectedRoute><AdminCustomers /></AdminProtectedRoute>} />
            <Route path="/admin/quotes" element={<AdminProtectedRoute><AdminQuotes /></AdminProtectedRoute>} />
            <Route path="/admin/invoices" element={<AdminProtectedRoute><AdminInvoices /></AdminProtectedRoute>} />
            <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />
            <Route path="/admin/appointments" element={<AdminProtectedRoute><AdminAppointments /></AdminProtectedRoute>} />
            <Route path="/admin/website-projects" element={<AdminProtectedRoute><AdminWebsiteProjects /></AdminProtectedRoute>} />
            <Route path="/admin/2fa-setup" element={<AdminProtectedRoute><AdminSetup2FA /></AdminProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <CookieBanner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
