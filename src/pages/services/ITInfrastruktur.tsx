import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Server, ArrowRight, CheckCircle2, Phone, Cloud, Database, Network, HardDrive, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const managedPackages = [
  {
    name: "Managed Workplace",
    price: "35€/User/Monat",
    description: "PC-Verwaltung & Monitoring",
    features: ["PC-Wartung & Updates", "Software-Management", "24/7 Monitoring", "Remote-Support inkl."],
    highlight: true
  },
  {
    name: "Managed Server",
    price: "149€/Server/Monat",
    description: "Server-Betreuung",
    features: ["Server-Überwachung", "Updates & Patches", "Backup-Monitoring", "Proaktive Wartung"],
    highlight: false
  },
  {
    name: "Managed Network",
    price: "199€/Monat",
    description: "Netzwerk-Management",
    features: ["Netzwerk-Monitoring", "WLAN-Verwaltung", "Firewall-Management", "VPN-Betreuung"],
    highlight: false
  }
];

const infrastructureServices = [
  { icon: Server, title: "Server-Einrichtung", price: "ab 299€", description: "Windows/Linux Server Installation und Konfiguration" },
  { icon: Network, title: "Netzwerk-Installation", price: "ab 399€", description: "Professionelle Netzwerk-Infrastruktur" },
  { icon: Cloud, title: "Cloud-Migration", price: "ab 599€", description: "Umzug in die Cloud (Azure/AWS/Office 365)" },
  { icon: Database, title: "Backup-System", price: "ab 199€", description: "Automatisches Backup-System einrichten" },
  { icon: Shield, title: "Virtualisierung", price: "ab 499€", description: "VMware/Hyper-V Server-Virtualisierung" },
  { icon: HardDrive, title: "Storage-Lösungen", price: "ab 299€", description: "NAS/SAN Storage-Systeme" }
];

const cloudPackages = [
  {
    name: "Office 365 Migration",
    price: "49€/User",
    description: "Einmalig",
    features: ["E-Mail-Migration", "OneDrive-Setup", "Teams-Konfiguration", "Schulung inklusive"]
  },
  {
    name: "Cloud-Server Setup",
    price: "ab 399€",
    description: "Azure/AWS",
    features: ["Server-Konfiguration", "Netzwerk-Setup", "Backup-Einrichtung", "Monitoring"]
  },
  {
    name: "Hybrid-Cloud",
    price: "ab 999€",
    description: "On-Premise + Cloud",
    features: ["Architektur-Design", "VPN-Verbindung", "Sync-Einrichtung", "Disaster Recovery"]
  }
];

export default function ITInfrastruktur() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: managedRef, isRevealed: managedRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: cloudRef, isRevealed: cloudRevealed } = useScrollReveal();

  return (
    <Layout>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <Suspense fallback={null}><Floating3DScene variant="dense" className="opacity-30" /></Suspense>
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 py-32 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <Link to="/geschaeftskunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Geschäftskunden</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">IT-Infrastruktur</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-<span className="gradient-text">Infrastruktur</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Server, Netzwerk, Cloud und Managed Services für Ihr Unternehmen. Alles aus einer Hand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">Beratung anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />Jetzt anrufen</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        <div ref={managedRef} className={cn("container-tight relative transition-all duration-1000", managedRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Managed Services</h2>
            <p className="text-muted-foreground">Monatliche Flatrates für komplette IT-Betreuung</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {managedPackages.map((pkg, index) => (
              <div key={pkg.name} className={cn("relative p-8 rounded-2xl border transition-all hover:scale-105", pkg.highlight ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30" : "bg-white/5 border-white/10")} style={{ transitionDelay: `${index * 100}ms` }}>
                {pkg.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Beliebt</div>}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold gradient-text mb-2">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>
                <div className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className={cn("w-full mt-8 rounded-full", pkg.highlight ? "bg-primary hover:bg-primary/90" : "bg-white/10 hover:bg-white/20")} asChild>
                  <Link to="/kontakt">Jetzt buchen</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">Komplett-Paket für 5-10 Mitarbeiter: <span className="text-primary font-semibold">ab 499€/Monat</span></p>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={servicesRef} className={cn("transition-all duration-1000", servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Infrastruktur-Services</h2>
              <p className="text-muted-foreground">Einmalige Einrichtung & Projekte</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {infrastructureServices.map((service, index) => (
                <div key={service.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <div className="text-primary font-semibold">{service.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={cloudRef} className={cn("transition-all duration-1000", cloudRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Cloud-Services</h2>
              <p className="text-muted-foreground">Office 365, Azure, AWS und Hybrid-Lösungen</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {cloudPackages.map((pkg, index) => (
                <div key={pkg.name} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold gradient-text mb-2">{pkg.price}</div>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </div>
                  <div className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative text-center">
              <Server className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Kostenloser IT-Check</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Wir analysieren Ihre IT-Infrastruktur und zeigen Optimierungspotenziale auf.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">IT-Check anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
