import { useEffect, useState } from "react";
import { type Locale, type ServicePageContent } from "@shared/schema";
import { loadContent } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicePageLayout } from "@/components/blocks/ServicePageLayout";

interface ServiceDetailPageProps {
  locale: Locale;
  serviceId: string;
}

const serviceContentMap: Record<string, string> = {
  "local-growth": "local-growth",
  "website": "website",
  "ai-automations": "ai-automations",
  "custom-it": "custom-it",
};

export default function ServiceDetailPage({ locale, serviceId }: ServiceDetailPageProps) {
  const [content, setContent] = useState<ServicePageContent | null>(null);
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    const contentFile = serviceContentMap[serviceId] || "local-growth";
    Promise.all([
      loadContent<ServicePageContent>(locale, contentFile),
      loadContent(locale, "home"),
    ]).then(([service, home]) => {
      setContent(service);
      setHomeContent(home);
    });
  }, [locale, serviceId]);

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
      
      <main>
        <ServicePageLayout locale={locale} content={content} />
      </main>

      <Footer locale={locale} content={homeContent.footer} />
    </div>
  );
}
