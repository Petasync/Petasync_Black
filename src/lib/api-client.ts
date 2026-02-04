/**
 * API Client für Petasync Backend
 *
 * Ersetzt den Supabase Client mit direkten API-Aufrufen
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Token Storage
const TOKEN_KEY = 'petasync_access_token';
const REFRESH_TOKEN_KEY = 'petasync_refresh_token';

// ============================================
// Token Management
// ============================================
export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// ============================================
// Base Fetch Wrapper
// ============================================
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { skipAuth = false, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers || {}),
  };

  // Add auth token if available and not skipped
  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle CSV downloads
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/csv')) {
      const blob = await response.blob();
      return { success: true, data: blob as unknown as T };
    }

    const data = await response.json();

    // Handle token refresh on 401
    if (response.status === 401 && !skipAuth) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry the request with new token
        return apiFetch<T>(endpoint, options);
      }
      // Refresh failed, clear tokens
      clearTokens();
      window.location.href = '/admin/login';
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (data.success && data.data?.access_token) {
      localStorage.setItem(TOKEN_KEY, data.data.access_token);
      return true;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
  }

  return false;
}

// ============================================
// Auth API
// ============================================
export const auth = {
  async login(email: string, password: string) {
    const response = await apiFetch<{
      requires_2fa?: boolean;
      temp_token?: string;
      access_token?: string;
      refresh_token?: string;
      user?: {
        id: string;
        email: string;
        display_name: string;
        role: string;
      };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });

    if (response.success && response.data) {
      if (response.data.access_token && response.data.refresh_token) {
        setTokens(response.data.access_token, response.data.refresh_token);
      }
    }

    return response;
  },

  async verify2FA(tempToken: string, code: string) {
    const response = await apiFetch<{
      access_token: string;
      refresh_token: string;
      user: {
        id: string;
        email: string;
        display_name: string;
        role: string;
      };
    }>('/auth/verify-2fa', {
      method: 'POST',
      body: JSON.stringify({ temp_token: tempToken, code }),
      skipAuth: true,
    });

    if (response.success && response.data) {
      setTokens(response.data.access_token, response.data.refresh_token);
    }

    return response;
  },

  async logout() {
    await apiFetch('/auth/logout', { method: 'POST' });
    clearTokens();
  },

  async getMe() {
    return apiFetch<{
      id: string;
      email: string;
      display_name: string;
      role: string;
      totp_enabled: boolean;
    }>('/auth/me');
  },

  async forgotPassword(email: string) {
    return apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      skipAuth: true,
    });
  },

  async resetPassword(token: string, password: string) {
    return apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
      skipAuth: true,
    });
  },

  async changePassword(currentPassword: string, newPassword: string) {
    return apiFetch('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
  },

  async setup2FA() {
    return apiFetch<{
      secret: string;
      qr_code: string;
      otpauth_url: string;
    }>('/auth/setup-2fa', {
      method: 'POST',
    });
  },

  async enable2FA(code: string) {
    return apiFetch<{
      backup_codes: string[];
    }>('/auth/enable-2fa', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  async disable2FA(code: string) {
    return apiFetch('/auth/disable-2fa', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  async regenerateBackupCodes() {
    return apiFetch<{
      backup_codes: string[];
    }>('/auth/regenerate-backup-codes', {
      method: 'POST',
    });
  },

  isAuthenticated(): boolean {
    return !!getAccessToken();
  },
};

// ============================================
// Generic CRUD Functions
// ============================================
function createCrudApi<T>(resource: string) {
  return {
    async list(params?: Record<string, unknown>) {
      const queryString = params
        ? '?' + new URLSearchParams(params as Record<string, string>).toString()
        : '';
      return apiFetch<T[] | { items: T[]; pagination: unknown }>(`/v1/${resource}${queryString}`);
    },

    async get(id: string) {
      return apiFetch<T>(`/v1/${resource}/${id}`);
    },

    async create(data: Partial<T>) {
      return apiFetch<T>(`/v1/${resource}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    async update(id: string, data: Partial<T>) {
      return apiFetch<T>(`/v1/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    async delete(id: string) {
      return apiFetch(`/v1/${resource}/${id}`, {
        method: 'DELETE',
      });
    },
  };
}

// ============================================
// Resource APIs
// ============================================
export interface Customer {
  id: string;
  customer_number: string;
  company_name: string | null;
  first_name: string | null;
  last_name: string;
  email: string | null;
  phone: string | null;
  street: string | null;
  zip: string | null;
  city: string | null;
  customer_type: 'privat' | 'business' | 'website';
  tags: string[];
  notes: string | null;
  total_revenue: number;
  inquiry_count: number;
  last_inquiry_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  customer_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  inquiry_type: 'privat' | 'business' | 'website';
  subject: string | null;
  message: string;
  status: 'neu' | 'in_bearbeitung' | 'angebot_erstellt' | 'beantwortet' | 'erledigt' | 'archiviert';
  priority: 'normal' | 'hoch' | 'dringend';
  internal_notes: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string | null;
  inquiry_id: string | null;
  title: string;
  description: string | null;
  service_type: string | null;
  scheduled_at: string;
  duration_minutes: number;
  status: 'ausstehend' | 'bestaetigt' | 'abgesagt' | 'erledigt';
  location: string | null;
  notes: string | null;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  default_price: number | null;
  unit: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface QuoteItem {
  id?: string;
  quote_id?: string;
  service_id: string | null;
  position: number;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  discount_percent: number;
  total: number;
}

export interface Quote {
  id: string;
  quote_number: string;
  customer_id: string | null;
  inquiry_id: string | null;
  status: 'entwurf' | 'versendet' | 'angenommen' | 'abgelehnt' | 'rechnung_erstellt';
  quote_date: string;
  valid_until: string | null;
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  total: number;
  notes: string | null;
  terms: string | null;
  sent_at: string | null;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
  items?: QuoteItem[];
}

export interface InvoiceItem {
  id?: string;
  invoice_id?: string;
  service_id: string | null;
  position: number;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  discount_percent: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string | null;
  quote_id: string | null;
  recurring_invoice_id: string | null;
  status: 'entwurf' | 'versendet' | 'bezahlt' | 'ueberfaellig' | 'storniert';
  invoice_date: string;
  delivery_date: string | null;
  due_date: string | null;
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  total: number;
  notes: string | null;
  payment_terms: string | null;
  sent_at: string | null;
  paid_at: string | null;
  paid_amount: number | null;
  payment_method: string | null;
  created_at: string;
  updated_at: string;
  items?: InvoiceItem[];
}

export interface Job {
  id: string;
  customer_id: string | null;
  quote_id: string | null;
  invoice_id: string | null;
  title: string;
  description: string | null;
  status: string;
  scheduled_date: string | null;
  completed_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface WebsiteProject {
  id: string;
  customer_id: string | null;
  inquiry_id: string | null;
  quote_id: string | null;
  project_name: string;
  package_type: string | null;
  budget_range: string | null;
  industry: string | null;
  domain: string | null;
  features: string[];
  status: 'anfrage' | 'angebot' | 'anzahlung' | 'umsetzung' | 'review' | 'live' | 'wartung';
  checklist: Record<string, unknown>;
  notes: string | null;
  go_live_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface RecurringInvoice {
  id: string;
  customer_id: string;
  title: string;
  description: string | null;
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  total: number;
  notes: string | null;
  payment_terms: string | null;
  interval: 'monatlich' | 'vierteljaehrlich' | 'halbjaehrlich' | 'jaehrlich';
  start_date: string;
  end_date: string | null;
  next_invoice_date: string;
  last_invoice_date: string | null;
  status: 'aktiv' | 'pausiert' | 'beendet';
  invoices_generated: number;
  created_at: string;
  updated_at: string;
  items?: InvoiceItem[];
}

// Resource APIs
export const customers = createCrudApi<Customer>('customers');
export const inquiries = createCrudApi<Inquiry>('inquiries');
export const appointments = createCrudApi<Appointment>('appointments');
export const serviceCatalog = createCrudApi<Service>('service-catalog');
export const quotes = createCrudApi<Quote>('quotes');
export const invoices = createCrudApi<Invoice>('invoices');
export const jobs = createCrudApi<Job>('jobs');
export const websiteProjects = createCrudApi<WebsiteProject>('website-projects');
export const recurringInvoices = {
  ...createCrudApi<RecurringInvoice>('recurring-invoices'),

  async generate(id: string) {
    return apiFetch<Invoice>(`/v1/recurring-invoices/${id}/generate`, {
      method: 'POST',
    });
  },
};

// ============================================
// Settings API
// ============================================
export interface CompanySettings {
  name: string;
  owner: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  tax_number: string;
  iban: string;
  bic: string;
  bank_name: string;
}

export interface NumberSequences {
  quote_prefix: string;
  quote_suffix: string;
  quote_counter: number;
  quote_year_reset: boolean;
  invoice_prefix: string;
  invoice_suffix: string;
  invoice_counter: number;
  invoice_year_reset: boolean;
  customer_prefix: string;
  customer_counter: number;
}

export interface PdfTemplates {
  quote_header: string;
  quote_footer: string;
  invoice_header: string;
  invoice_footer: string;
  accent_color: string;
}

export const settings = {
  async getAll() {
    return apiFetch<Record<string, unknown>>('/v1/settings');
  },

  async get<T>(key: string) {
    return apiFetch<T>(`/v1/settings/${key}`);
  },

  async update<T>(key: string, value: T) {
    return apiFetch<T>(`/v1/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify(value),
    });
  },
};

// ============================================
// Dashboard API
// ============================================
export interface DashboardStats {
  neue_anfragen: number;
  anfragen_diesen_monat: number;
  offene_angebote: number;
  versendete_angebote: number;
  angebotssumme_offen: number;
  offene_rechnungen: number;
  ueberfaellige_rechnungen: number;
  ausstehende_zahlungen: number;
  gesamtumsatz: number;
  umsatz_diesen_monat: number;
  umsatz_dieses_jahr: number;
  kunden_gesamt: number;
  neue_kunden_diesen_monat: number;
  anstehende_termine: number;
  offene_auftraege: number;
  aktive_abos: number;
  monatlicher_wiederkehrend: number;
}

export interface MonthlyRevenue {
  monat: string;
  anzahl_rechnungen: number;
  umsatz: number;
}

export const dashboard = {
  async getStats() {
    return apiFetch<DashboardStats>('/v1/dashboard/stats');
  },

  async getMonthlyRevenue() {
    return apiFetch<MonthlyRevenue[]>('/v1/dashboard/monthly-revenue');
  },

  async getRecentActivity() {
    return apiFetch<{
      inquiries: Inquiry[];
      invoices: Invoice[];
      appointments: Appointment[];
    }>('/v1/dashboard/recent-activity');
  },
};

// ============================================
// Export API
// ============================================
export const exportApi = {
  async invoices(params?: { from?: string; to?: string; status?: string }) {
    const queryString = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';

    const response = await fetch(`${API_BASE_URL}/v1/export/invoices${queryString}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rechnungen_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  },

  async customers() {
    const response = await fetch(`${API_BASE_URL}/v1/export/customers`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kunden_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  },
};

// ============================================
// Contact Form (Public)
// ============================================
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  customerType?: string;
  turnstileToken?: string;
}) {
  return apiFetch('/contact-form', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  });
}

// Default export for compatibility
const api = {
  auth,
  customers,
  inquiries,
  appointments,
  serviceCatalog,
  quotes,
  invoices,
  jobs,
  websiteProjects,
  recurringInvoices,
  settings,
  dashboard,
  export: exportApi,
  submitContactForm,
};

export default api;
