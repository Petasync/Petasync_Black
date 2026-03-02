import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Tag, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";
import { BLOG_ARTICLES } from "@/lib/constants/blog-data";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = BLOG_ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return <BlogArticleContent article={article} />;
}

function BlogArticleContent({ article }: { article: typeof BLOG_ARTICLES[number] }) {
  useSEO({
    title: `${article.title} | Petasync IT-Ratgeber`,
    description: article.description,
    ogType: "article",
  });

  const { ref: contentRef, isRevealed: contentRevealed } = useScrollReveal();

  // Find related articles (same category, excluding current)
  const relatedArticles = BLOG_ARTICLES
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  return (
    <Layout>
      {/* Article Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.publishDate,
        author: {
          "@type": "Organization",
          name: "Petasync IT-Service",
          url: "https://petasync.de",
        },
        publisher: {
          "@type": "Organization",
          name: "Petasync",
          logo: { "@type": "ImageObject", url: "https://petasync.de/og-image.png" },
        },
      })}} />

      {/* Article Header */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div className="container-tight relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                IT-Ratgeber
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">{article.categoryLabel}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-[1.1] text-foreground">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                {article.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime} Lesezeit
              </span>
              <span>{new Date(article.publishDate).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div ref={contentRef} className={cn("container-tight transition-all duration-1000", contentRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              {article.content.map((section, index) => {
                switch (section.type) {
                  case "heading":
                    return (
                      <h2 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4">
                        {section.text}
                      </h2>
                    );
                  case "paragraph":
                    return (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                        {section.text}
                      </p>
                    );
                  case "list":
                    return (
                      <ul key={index} className="space-y-2 mb-6 ml-4">
                        {section.items?.map((item, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start gap-3">
                            <span className="text-primary mt-1.5 text-xs">&#9679;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  case "tip":
                    return (
                      <div key={index} className="my-8 p-6 rounded-xl bg-primary/10 border border-primary/20">
                        <p className="text-foreground font-medium mb-1">Tipp von Petasync</p>
                        <p className="text-muted-foreground text-sm">{section.text}</p>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* Author Box */}
            <div className="mt-16 p-8 rounded-2xl border border-white/10 bg-white/5">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">P</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Petasync IT-Service</p>
                  <p className="text-muted-foreground text-sm">
                    Ihr lokaler IT-Partner in Ansbach und Umgebung. Wir teilen unser Wissen, damit Sie informierte Entscheidungen treffen können.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section-padding">
          <div className="container-tight">
            <div className="divider-glow mb-16" />
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Weitere Artikel</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{related.description.slice(0, 100)}...</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Professionelle Hilfe gesucht?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Wenn Sie lieber einen Profi ranlassen möchten – wir sind für Sie da.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">Jetzt anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />Anrufen</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
