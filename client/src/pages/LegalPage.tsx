import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type Locale } from "@shared/schema";
import { loadContent } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface LegalPageProps {
  locale: Locale;
  page: "impressum" | "datenschutz";
}

export default function LegalPage({ locale, page }: LegalPageProps) {
  const [content, setContent] = useState<any>(null);
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      loadContent(locale, "legal"),
      loadContent(locale, "home"),
    ]).then(([legal, home]) => {
      setContent(legal);
      setHomeContent(home);
    });
  }, [locale, page]);

  if (!content || !homeContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const pageContent = content[page];

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} nav={homeContent.nav} />
      
      <main className="pt-24">
        <section className="section-padding">
          <div className="max-w-3xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold mb-8" data-testid={`text-${page}-title`}>
                {pageContent.title}
              </h1>

              {page === "impressum" ? (
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {pageContent.content}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {pageContent.sections.map((section: any, i: number) => (
                    <div key={i} className="glass-card rounded-2xl p-6">
                      <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
                      <p className="text-muted-foreground">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer locale={locale} content={homeContent.footer} />
    </div>
  );
}
