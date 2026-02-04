import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Calendar, FileText, Receipt, TrendingUp, Clock, AlertCircle, Loader2, Euro, Users, RefreshCw } from 'lucide-react';
import { dashboard, jobs, type DashboardStats } from '@/lib/api-client';
import { toast } from 'sonner';

interface ExtendedStats extends DashboardStats {
  recentInquiries: any[];
  openJobs: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<ExtendedStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch dashboard stats from API
      const [statsResponse, activityResponse, jobsResponse] = await Promise.all([
        dashboard.getStats(),
        dashboard.getRecentActivity(),
        jobs.list({ status: 'offen' }),
      ]);

      if (!statsResponse.success) {
        throw new Error(statsResponse.error || 'Fehler beim Laden der Statistiken');
      }

      const dashboardStats = statsResponse.data;
      const activity = activityResponse.data;
      const openJobs = Array.isArray(jobsResponse.data) ? jobsResponse.data : [];

      setStats({
        ...dashboardStats!,
        recentInquiries: activity?.inquiries || [],
        openJobs: openJobs.slice(0, 5),
      });
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Fehler beim Laden der Dashboard-Daten');
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    { name: 'Neue Anfragen', value: stats.neue_anfragen, icon: MessageSquare, change: 'Unbearbeitet' },
    { name: 'Offene Termine', value: stats.anstehende_termine, icon: Calendar, change: 'Anstehend' },
    { name: 'Angebote', value: stats.offene_angebote + stats.versendete_angebote, icon: FileText, change: 'Offen' },
    { name: 'Rechnungen', value: stats.offene_rechnungen + stats.ueberfaellige_rechnungen, icon: Receipt, change: 'Unbezahlt' },
  ] : [];

  const revenueCards = stats ? [
    { name: 'Umsatz (Monat)', value: stats.umsatz_diesen_monat, icon: Euro },
    { name: 'Umsatz (Jahr)', value: stats.umsatz_dieses_jahr, icon: TrendingUp },
    { name: 'Kunden', value: stats.kunden_gesamt, icon: Users },
    { name: 'Wiederkehrend', value: stats.monatlicher_wiederkehrend, icon: RefreshCw },
  ] : [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value || 0);
  };

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

        {/* Revenue Stats */}
        {!loading && stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {revenueCards.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.name === 'Kunden' ? stat.value : formatCurrency(stat.value)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
              ) : !stats?.recentInquiries?.length ? (
                <p className="text-muted-foreground text-sm">Keine neuen Anfragen</p>
              ) : (
                <div className="space-y-2">
                  {stats.recentInquiries.map((inquiry: any) => (
                    <div key={inquiry.id} className="text-sm">
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-muted-foreground">{inquiry.subject || inquiry.inquiry_type}</p>
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
              ) : !stats?.openJobs?.length ? (
                <p className="text-muted-foreground text-sm">Keine offenen Aufträge</p>
              ) : (
                <div className="space-y-2">
                  {stats.openJobs.map((job: any) => (
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

        {/* Ausstehende Zahlungen Warnung */}
        {!loading && stats && (stats.ausstehende_zahlungen > 0 || stats.ueberfaellige_rechnungen > 0) && (
          <Card className="border-yellow-500/50 bg-yellow-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-500">
                <AlertCircle className="h-5 w-5" />
                Zahlungen ausstehend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-yellow-500">
                    {formatCurrency(stats.ausstehende_zahlungen)}
                  </p>
                  <p className="text-sm text-muted-foreground">Ausstehend</p>
                </div>
                {stats.ueberfaellige_rechnungen > 0 && (
                  <div>
                    <p className="text-2xl font-bold text-red-500">
                      {stats.ueberfaellige_rechnungen}
                    </p>
                    <p className="text-sm text-muted-foreground">Überfällig</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
