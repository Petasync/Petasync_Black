import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  Calendar,
  FileText,
  Receipt,
  TrendingUp,
  Clock,
  AlertCircle,
  Users,
  Euro,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isPast, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

interface DashboardStats {
  newInquiriesToday: number;
  openAppointmentsThisWeek: number;
  openQuotes: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  status: string;
  created_at: string;
  inquiry_type: string | null;
}

interface OverdueInvoice {
  id: string;
  invoice_number: string;
  total: number;
  due_date: string;
  customer_id: string | null;
  customers?: {
    first_name: string | null;
    last_name: string;
  } | null;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    newInquiriesToday: 0,
    openAppointmentsThisWeek: 0,
    openQuotes: 0,
    unpaidInvoices: 0,
    overdueInvoices: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalCustomers: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [overdueInvoices, setOverdueInvoices] = useState<OverdueInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    const today = new Date().toISOString().split('T')[0];
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString();
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 }).toISOString();
    const monthStart = startOfMonth(new Date()).toISOString().split('T')[0];
    const monthEnd = endOfMonth(new Date()).toISOString().split('T')[0];

    try {
      // New inquiries today
      const { count: newInquiries } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      // Open appointments this week
      const { count: openAppointments } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .gte('scheduled_at', weekStart)
        .lte('scheduled_at', weekEnd)
        .in('status', ['ausstehend', 'bestaetigt']);

      // Open quotes
      const { count: openQuotes } = await supabase
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .in('status', ['entwurf', 'versendet']);

      // Unpaid invoices
      const { count: unpaidInvoices } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true })
        .in('status', ['entwurf', 'versendet', 'ueberfaellig']);

      // Overdue invoices
      const { data: overdueData } = await supabase
        .from('invoices')
        .select(`
          id,
          invoice_number,
          total,
          due_date,
          customer_id,
          customers (
            first_name,
            last_name
          )
        `)
        .eq('status', 'versendet')
        .not('due_date', 'is', null)
        .lt('due_date', new Date().toISOString())
        .order('due_date', { ascending: true })
        .limit(5);

      // Total revenue (all paid invoices)
      const { data: allInvoices } = await supabase
        .from('invoices')
        .select('total')
        .eq('status', 'bezahlt');

      const totalRevenue = allInvoices?.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0) || 0;

      // Monthly revenue
      const { data: monthlyInvoices } = await supabase
        .from('invoices')
        .select('total')
        .eq('status', 'bezahlt')
        .gte('invoice_date', monthStart)
        .lte('invoice_date', monthEnd);

      const monthlyRevenue = monthlyInvoices?.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0) || 0;

      // Total customers
      const { count: totalCustomers } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true });

      // Recent inquiries
      const { data: recentInquiriesData } = await supabase
        .from('inquiries')
        .select('id, name, email, subject, status, created_at, inquiry_type')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        newInquiriesToday: newInquiries || 0,
        openAppointmentsThisWeek: openAppointments || 0,
        openQuotes: openQuotes || 0,
        unpaidInvoices: unpaidInvoices || 0,
        overdueInvoices: overdueData?.length || 0,
        totalRevenue,
        monthlyRevenue,
        totalCustomers: totalCustomers || 0,
      });

      setRecentInquiries(recentInquiriesData || []);
      setOverdueInvoices(overdueData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getInquiryStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      neu: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      in_bearbeitung: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      erledigt: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getInquiryTypeLabel = (type: string | null) => {
    const labels: Record<string, string> = {
      privat: 'Privatkunde',
      business: 'Geschäftskunde',
      website: 'Website',
    };
    return type ? labels[type] || type : 'Allgemein';
  };

  const mainStats = [
    {
      name: 'Neue Anfragen',
      value: stats.newInquiriesToday.toString(),
      icon: MessageSquare,
      change: 'Heute',
      color: 'text-blue-500',
    },
    {
      name: 'Offene Termine',
      value: stats.openAppointmentsThisWeek.toString(),
      icon: Calendar,
      change: 'Diese Woche',
      color: 'text-green-500',
    },
    {
      name: 'Offene Angebote',
      value: stats.openQuotes.toString(),
      icon: FileText,
      change: 'Zu bearbeiten',
      color: 'text-yellow-500',
    },
    {
      name: 'Unbezahlte Rechnungen',
      value: stats.unpaidInvoices.toString(),
      icon: Receipt,
      change: stats.overdueInvoices > 0 ? `${stats.overdueInvoices} überfällig` : 'Keine überfällig',
      color: stats.overdueInvoices > 0 ? 'text-red-500' : 'text-gray-500',
    },
  ];

  const revenueStats = [
    {
      name: 'Umsatz (Monat)',
      value: formatCurrency(stats.monthlyRevenue),
      icon: TrendingUp,
      change: format(new Date(), 'MMMM yyyy', { locale: de }),
      color: 'text-emerald-500',
    },
    {
      name: 'Umsatz (Gesamt)',
      value: formatCurrency(stats.totalRevenue),
      icon: Euro,
      change: 'Alle bezahlten Rechnungen',
      color: 'text-blue-500',
    },
    {
      name: 'Kunden',
      value: stats.totalCustomers.toString(),
      icon: Users,
      change: 'Registriert',
      color: 'text-purple-500',
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Lade Dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Willkommen im Admin-Bereich</p>
        </div>

        {/* Main Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mainStats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {revenueStats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Alerts */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Neueste Anfragen
              </CardTitle>
              <CardDescription>Zuletzt eingegangene Kontaktanfragen</CardDescription>
            </CardHeader>
            <CardContent>
              {recentInquiries.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4">Keine neuen Anfragen</p>
              ) : (
                <div className="space-y-3">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium truncate">{inquiry.name}</p>
                          <Badge variant="outline" className={getInquiryStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{inquiry.subject || 'Keine Betreff'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(inquiry.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {getInquiryTypeLabel(inquiry.inquiry_type)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link to="/admin/inquiries">
                    <Button variant="ghost" className="w-full" size="sm">
                      Alle Anfragen anzeigen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Overdue Invoices */}
          <Card className={overdueInvoices.length > 0 ? 'border-red-500/50' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className={overdueInvoices.length > 0 ? 'h-5 w-5 text-red-500' : 'h-5 w-5'} />
                Überfällige Rechnungen
              </CardTitle>
              <CardDescription>
                {overdueInvoices.length > 0
                  ? `${overdueInvoices.length} Rechnung${overdueInvoices.length > 1 ? 'en' : ''} überfällig`
                  : 'Alle Rechnungen sind aktuell'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {overdueInvoices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Keine überfälligen Rechnungen</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {overdueInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-start gap-3 p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                      <XCircle className="h-4 w-4 mt-1 text-red-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium">{invoice.invoice_number}</p>
                          <span className="font-bold text-red-500">{formatCurrency(Number(invoice.total))}</span>
                        </div>
                        {invoice.customers && (
                          <p className="text-sm text-muted-foreground truncate">
                            {invoice.customers.first_name} {invoice.customers.last_name}
                          </p>
                        )}
                        <p className="text-xs text-red-500 mt-1">
                          Fällig seit: {format(parseISO(invoice.due_date), 'dd.MM.yyyy', { locale: de })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link to="/admin/invoices">
                    <Button variant="ghost" className="w-full" size="sm">
                      Alle Rechnungen anzeigen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
