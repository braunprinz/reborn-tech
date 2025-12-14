import { Link } from "wouter";
import { type Locale } from "@shared/schema";
import logoImage from "@assets/logo_1765611819986.png";

interface FooterContent {
  tagline: string;
  services: string;
  company: string;
  legal: string;
  copyright: string;
}

interface FooterProps {
  locale: Locale;
  content: FooterContent;
}

export function Footer({ locale, content }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { label: locale === "de" ? "Lokales Wachstum" : "Local Growth", href: `/${locale}/services/local-growth` },
    { label: locale === "de" ? "Website-Erstellung" : "Website Creation", href: `/${locale}/services/website` },
    { label: locale === "de" ? "KI-Automatisierung" : "AI Automations", href: `/${locale}/services/ai-automations` },
    { label: "Custom IT", href: `/${locale}/services/custom-it` },
  ];

  const companyLinks = [
    { label: locale === "de" ? "Über uns" : "About", href: `/${locale}/about` },
    { label: locale === "de" ? "Projekte" : "Work", href: `/${locale}/work` },
    { label: locale === "de" ? "Kontakt" : "Contact", href: `/${locale}/contact` },
  ];

  const legalLinks = locale === "de" ? [
    { label: "Impressum", href: `/${locale}/impressum` },
    { label: "Datenschutz", href: `/${locale}/datenschutz` },
  ] : [
    { label: "Legal Notice", href: `/${locale}/imprint` },
    { label: "Privacy Policy", href: `/${locale}/privacy` },
  ];

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto container-padding section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center mb-4" data-testid="link-footer-logo">
              <img 
                src={logoImage} 
                alt="Reoborn Tech" 
                className="w-[180px] h-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm">{content.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {content.services}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {content.company}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {legalLinks.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                {content.legal}
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Digital Systems. {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
