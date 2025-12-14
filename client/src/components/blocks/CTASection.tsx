import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrackEvent } from "@/hooks/use-analytics";
import { type Locale } from "@shared/schema";

interface CTASectionProps {
  locale: Locale;
  title: string;
  description: string;
  buttonText: string;
  href?: string;
}

export function CTASection({ locale, title, description, buttonText, href }: CTASectionProps) {
  const targetHref = href || `/${locale}/contact`;
  const trackEvent = useTrackEvent();

  const handleClick = () => {
    trackEvent("cta_click", { location: "cta_section", destination: targetHref });
  };

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center glow-subtle"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-cta-title">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto" data-testid="text-cta-description">
            {description}
          </p>
          <Link href={targetHref} onClick={handleClick}>
            <Button size="lg" data-testid="button-cta-main">
              {buttonText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
