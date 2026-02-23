import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface RelatedService {
  title: string;
  href: string;
  price: string;
  icon: LucideIcon;
}

interface RelatedServicesProps {
  services: RelatedService[];
}

export function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <section className="section-padding relative">
      <div className="container-tight">
        <div className="divider-glow mb-12" />

        <h2 className="text-2xl font-bold text-foreground mb-8">
          Das könnte Sie auch interessieren
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="group flex items-center gap-4 p-5 rounded-xl border border-white/5 hover:border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent transition-all hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                <service.icon className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{service.title}</h3>
                <span className="text-xs text-primary">{service.price}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
