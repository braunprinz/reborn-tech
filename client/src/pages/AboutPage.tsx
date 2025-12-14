import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { type Locale } from "@shared/schema";
import { loadContent } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/blocks/CTASection";

interface AboutPageProps {
  locale: Locale;
}

export default function AboutPage({ locale }: AboutPageProps) {
  const [content, setContent] = useState<any>(null);
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      loadContent(locale, "about"),
      loadContent(locale, "home"),
    ]).then(([about, home]) => {
      setContent(about);
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
          <div className="max-w-4xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-gradient mb-4" data-testid="text-about-title">
                {content.hero.title}
              </h1>
              <p className="text-xl text-muted-foreground" data-testid="text-about-subtitle">
                {content.hero.subtitle}
              </p>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6">{content.story.title}</h2>
              <div className="space-y-4">
                {content.story.paragraphs.map((paragraph: string, i: number) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-8">{content.principles.title}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {content.principles.items.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <h3 className="font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 mb-16"
            >
              <h2 className="text-xl font-semibold mb-4">{content.approach.title}</h2>
              <p className="text-muted-foreground mb-6">{content.approach.description}</p>
              <ul className="space-y-3">
                {content.approach.steps.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>
        </section>

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
