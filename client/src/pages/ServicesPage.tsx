import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Locale } from "@shared/schema";
import { loadContent } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/blocks/CTASection";

interface ServicesPageProps {
  locale: Locale;
}

export default function ServicesPage({ locale }: ServicesPageProps) {
  const [content, setContent] = useState<any>(null);
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      loadContent(locale, "services"),
      loadContent(locale, "home"),
    ]).then(([services, home]) => {
      setContent(services);
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
              className="text-center mb-16"
            >
              <h1 className="text-gradient mb-4" data-testid="text-services-title">
                {content.hero.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-subtitle">
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

            <div className="space-y-8">
              {content.services.map((service: any, index: number) => (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-8 hover-elevate"
                  data-testid={`card-service-${service.id}`}
                >
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <Link href={service.href}>
                        <Button data-testid={`button-service-${service.id}`}>
                          {locale === "de" ? "Mehr erfahren" : "Learn More"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
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
