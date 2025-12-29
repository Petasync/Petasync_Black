import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  Code,
  Palette,
  Globe
} from "lucide-react";
import { TEMPLATE_LIST } from "@/lib/constants/template-config";
import { cn } from "@/lib/utils";
import { Suspense, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const categories = ['Alle', 'Handwerk', 'Beratung', 'Gastronomie', 'Sport & Gesundheit', 'Immobilien', 'Kreativ', 'Beauty & Wellness', 'Automotive'];

export default function TemplatesShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const filteredTemplates = selectedCategory === 'Alle'
    ? TEMPLATE_LIST
    : TEMPLATE_LIST.filter(template => template.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] animate-pulse delay-1000" />

        <div className="container-tight relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">8 Spektakuläre Templates</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Entdecken Sie unsere{" "}
              <span className="gradient-text">Template-Vielfalt</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Professionelle Website-Templates für verschiedene Branchen –
              jedes mit eigenem Design-Stil, 3D-Animationen und modernen Features.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
              >
                <a href="#templates">
                  Templates durchstöbern
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link to="/kontakt">
                  Beratung anfragen
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding relative">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Alle Templates beinhalten
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Premium-Features inklusive
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Globe,
                title: "Responsive Design",
                description: "Perfekte Darstellung auf allen Geräten",
              },
              {
                icon: Zap,
                title: "Blitzschnell",
                description: "Optimierte Performance & Ladezeiten",
              },
              {
                icon: Code,
                title: "Modern & Clean",
                description: "React, TypeScript & TailwindCSS",
              },
              {
                icon: Palette,
                title: "3D & Animationen",
                description: "Three.js & GSAP Animationen",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors">
                  <feature.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Templates Grid */}
      <section id="templates" className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-20" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Unsere Templates
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-8">
              Für jede Branche das passende Design
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group relative"
              >
                <Link to={`/templates/${template.id}`}>
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 hover:border-white/20 transition-all">
                    {/* Color Preview */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r opacity-50"
                      style={{
                        background: `linear-gradient(to right, ${template.colors.primary}, ${template.colors.accent})`,
                      }}
                    />

                    {/* Template Preview Placeholder */}
                    <div
                      className="aspect-[4/3] rounded-lg mb-4 relative overflow-hidden"
                      style={{ backgroundColor: template.colors.background }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="text-6xl font-bold opacity-10"
                          style={{ color: template.colors.primary }}
                        >
                          {template.name.charAt(0)}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                          {template.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {template.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="w-3 h-3 text-primary flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                      {template.features.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{template.features.length - 3} weitere Features
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full rounded-full group-hover:bg-foreground group-hover:text-background transition-colors"
                      variant="outline"
                    >
                      Live Demo ansehen
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Bereit für Ihre eigene Website?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Wählen Sie Ihr Lieblingstemplate und lassen Sie uns gemeinsam
                Ihren professionellen Webauftritt gestalten.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
              >
                <Link to="/kontakt">
                  Kostenlos beraten lassen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
