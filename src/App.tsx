import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { CookieBanner } from "@/components/CookieBanner";
import Index from "./pages/Index";
import Websites from "./pages/Websites";
import Privatkunden from "./pages/Privatkunden";
import Geschaeftskunden from "./pages/Geschaeftskunden";
import Kontakt from "./pages/Kontakt";
import FAQ from "./pages/FAQ";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import PCReparatur from "./pages/services/PCReparatur";
import LeihPC from "./pages/services/LeihPC";
import ITSicherheit from "./pages/services/ITSicherheit";
import Netzwerk from "./pages/services/Netzwerk";
import ITBusiness from "./pages/services/ITBusiness";
import Webdesign from "./pages/services/Webdesign";
import ITInfrastruktur from "./pages/services/ITInfrastruktur";
import ITSupport from "./pages/services/ITSupport";
import Beratung from "./pages/services/Beratung";
import WebsiteTemplate from "./pages/websites/Template";
import WebsiteStarter from "./pages/websites/Starter";
import WebsiteBusiness from "./pages/websites/Business";
import WebsiteEnterprise from "./pages/websites/Enterprise";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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
            <Route path="/services/pc-reparatur" element={<PCReparatur />} />
            <Route path="/services/leih-pc" element={<LeihPC />} />
            <Route path="/services/it-sicherheit" element={<ITSicherheit />} />
            <Route path="/services/netzwerk" element={<Netzwerk />} />
            <Route path="/services/it-business" element={<ITBusiness />} />
            <Route path="/services/webdesign" element={<Webdesign />} />
            <Route path="/services/it-infrastruktur" element={<ITInfrastruktur />} />
            <Route path="/services/it-support" element={<ITSupport />} />
            <Route path="/services/beratung" element={<Beratung />} />
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
