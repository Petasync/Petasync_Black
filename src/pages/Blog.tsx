import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/lib/constants/blog-data";

export default function Blog() {
  useSEO({
    title: "IT-Ratgeber & Blog | Petasync – Tipps zu PC, Sicherheit & Web",
    description: "Praxisnahe Ratgeber zu PC-Reparatur, IT-Sicherheit, Webdesign und IT für Unternehmen. Expertenwissen von Ihrem lokalen IT-Partner Petasync.",
  });

  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: articlesRef, isRevealed: articlesRevealed } = useScrollReveal();

  const [activeCategory, setActiveCategory] = useState("alle");

  const filteredArticles = activeCategory === "alle"
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter(a => a.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-<span className="gradient-text">Ratgeber</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Praxisnahe Anleitungen, Expertentipps und aktuelle Themen rund um PC, IT-Sicherheit und Webdesign.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-y border-white/[0.08]">
        <div className="container-tight">
          <div className="flex flex-wrap gap-3">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all",
                  activeCategory === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div ref={articlesRef} className={cn("container-tight transition-all duration-1000", articlesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Keine Artikel in dieser Kategorie.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02] flex flex-col"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                      <Tag className="w-3 h-3" />
                      {article.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {article.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    Weiterlesen
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">IT-Problem? Wir helfen sofort.</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Wenn Ratgeber nicht mehr reichen – rufen Sie uns an oder schreiben Sie uns.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">Jetzt anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
