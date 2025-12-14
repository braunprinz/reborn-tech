import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type Locale } from "@shared/schema";
import { loadContent } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorkShowcase } from "@/components/blocks/WorkShowcase";
import { CTASection } from "@/components/blocks/CTASection";

interface WorkPageProps {
  locale: Locale;
}

export default function WorkPage({ locale }: WorkPageProps) {
  const [content, setContent] = useState<any>(null);
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      loadContent(locale, "work"),
      loadContent(locale, "home"),
    ]).then(([work, home]) => {
      setContent(work);
      setHomeContent(home);
    });
  }, [locale]);

  if (!content || !homeContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} nav={homeContent.nav} />
      
      <main className="pt-24">
        <section className="section-padding">
          <div className="max-w-5xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-gradient mb-4" data-testid="text-work-page-title">
                {content.hero.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-work-page-subtitle">
                {content.hero.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-8 mb-16 text-center"
            >
              <h2 className="text-xl font-semibold mb-4">{content.intro.title}</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">{content.intro.description}</p>
            </motion.div>
          </div>
        </section>

        <WorkShowcase
          locale={locale}
          title=""
          subtitle=""
          cases={content.cases}
        />

        <CTASection
          locale={locale}
          title={content.cta.title}
          description={content.cta.description}
          buttonText={content.cta.buttonText}
        />
      </main>

      <Footer locale={locale} content={homeContent.footer} />
    </div>
  );
}
