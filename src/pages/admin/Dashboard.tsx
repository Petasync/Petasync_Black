import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Calendar, FileText, Receipt, TrendingUp, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DashboardStats {
  newInquiries: number;
  openAppointments: number;
  openQuotes: number;
  unpaidInvoices: number;
  recentInquiries: any[];
  openJobs: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    newInquiries: 0,
    openAppointments: 0,
    openQuotes: 0,
    unpaidInvoices: 0,
    recentInquiries: [],
    openJobs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch inquiries count (today)
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const { data: inquiries, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', todayStart.toISOString());

      if (inquiriesError) throw inquiriesError;

      // Fetch open quotes
      const { data: quotes, error: quotesError } = await supabase
        .from('quotes')
        .select('id', { count: 'exact', head: true })
        .in('status', ['entwurf', 'versendet']);

      if (quotesError) throw quotesError;

      // Fetch unpaid invoices
      const { data: invoices, error: invoicesError } = await supabase
        .from('invoices')
        .select('id', { count: 'exact', head: true })
        .in('status', ['entwurf', 'versendet', 'ueberfaellig']);

      if (invoicesError) throw invoicesError;

      // Fetch open appointments (this week)
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const { data: appointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .gte('scheduled_at', weekStart.toISOString())
        .lte('scheduled_at', weekEnd.toISOString())
        .eq('status', 'ausstehend');

      // Ignore error if appointments table doesn't exist

      // Fetch recent inquiries
      const { data: recentInquiries, error: recentInquiriesError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentInquiriesError) throw recentInquiriesError;

      // Fetch open jobs
      const { data: openJobs, error: openJobsError } = await supabase
        .from('jobs')
        .select('*')
        .in('status', ['offen', 'in_arbeit'])
        .order('created_at', { ascending: false })
        .limit(5);

      if (openJobsError) throw openJobsError;

      setStats({
        newInquiries: inquiries?.length || 0,
        openAppointments: appointments?.length || 0,
        openQuotes: quotes?.length || 0,
        unpaidInvoices: invoices?.length || 0,
        recentInquiries: recentInquiries || [],
        openJobs: openJobs || [],
      });
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Fehler beim Laden der Dashboard-Daten');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { name: 'Neue Anfragen', value: stats.newInquiries, icon: MessageSquare, change: 'Heute' },
    { name: 'Offene Termine', value: stats.openAppointments, icon: Calendar, change: 'Diese Woche' },
    { name: 'Angebote', value: stats.openQuotes, icon: FileText, change: 'Offen' },
    { name: 'Rechnungen', value: stats.unpaidInvoices, icon: Receipt, change: 'Unbezahlt' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Willkommen im Admin-Bereich</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <Card className="col-span-4">
              <CardContent className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </CardContent>
            </Card>
          ) : (
            statCards.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Neueste Anfragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : stats.recentInquiries.length === 0 ? (
                <p className="text-muted-foreground text-sm">Keine neuen Anfragen</p>
              ) : (
                <div className="space-y-2">
                  {stats.recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="text-sm">
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-muted-foreground">{inquiry.subject || inquiry.service_type}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Offene Aufträge
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : stats.openJobs.length === 0 ? (
                <p className="text-muted-foreground text-sm">Keine offenen Aufträge</p>
              ) : (
                <div className="space-y-2">
                  {stats.openJobs.map((job) => (
                    <div key={job.id} className="text-sm">
                      <p className="font-medium">{job.title}</p>
                      <p className="text-muted-foreground">Status: {job.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
