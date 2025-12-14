import { useEffect, useState } from "react";
import { type Locale } from "@shared/schema";
import { loadContent } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSystemLoop } from "@/components/blocks/HeroSystemLoop";
import { ProofStrip } from "@/components/blocks/ProofStrip";
import { PillarsGrid } from "@/components/blocks/PillarsGrid";
import { MapGridDemo } from "@/components/blocks/MapGridDemo";
import { MethodTimeline } from "@/components/blocks/MethodTimeline";
import { WorkShowcase } from "@/components/blocks/WorkShowcase";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { CTASection } from "@/components/blocks/CTASection";

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const [content, setContent] = useState<any>(null);
  const [workContent, setWorkContent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      loadContent(locale, "home"),
      loadContent(locale, "work"),
    ]).then(([home, work]) => {
      setContent(home);
      setWorkContent(work);
    });
  }, [locale]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} nav={content.nav} />
      
      <main>
        <HeroSystemLoop
          locale={locale}
          content={content.hero}
          systemLoop={content.systemLoop}
        />

        <ProofStrip
          title={content.proof.title}
          metrics={content.proof.metrics}
        />

        <PillarsGrid
          title={content.pillars.title}
          subtitle={content.pillars.subtitle}
          items={content.pillars.items}
        />

        <MapGridDemo
          title={content.mapDemo.title}
          subtitle={content.mapDemo.subtitle}
          keywordLabel={content.mapDemo.keywordLabel}
          cityLabel={content.mapDemo.cityLabel}
          keywords={content.mapDemo.keywords}
          cities={content.mapDemo.cities}
          disclaimer={content.mapDemo.disclaimer}
        />

        <MethodTimeline
          title={content.method.title}
          subtitle={content.method.subtitle}
          steps={content.method.steps}
        />

        {workContent && (
          <WorkShowcase
            locale={locale}
            title={content.work.title}
            subtitle={content.work.subtitle}
            cases={workContent.cases.slice(0, 3)}
            viewAllText={locale === "de" ? "Alle Projekte" : "View All Work"}
            viewAllHref={`/${locale}/work`}
          />
        )}

        <FAQBlock
          title={content.faq.title}
          subtitle={content.faq.subtitle}
          items={content.faq.items}
        />

        <CTASection
          locale={locale}
          title={content.cta.title}
          description={content.cta.description}
          buttonText={content.cta.buttonText}
        />
      </main>

      <Footer locale={locale} content={content.footer} />
    </div>
  );
}
