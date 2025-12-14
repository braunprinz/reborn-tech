import { motion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type ServicePageContent, type Locale } from "@shared/schema";

interface ServicePageLayoutProps {
  locale: Locale;
  content: ServicePageContent;
}

export function ServicePageLayout({ locale, content }: ServicePageLayoutProps) {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="max-w-5xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-gradient mb-4" data-testid="text-service-title">
              {content.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-service-tagline">
              {content.hero.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-8 mb-16"
          >
            <h2 className="text-xl font-semibold mb-4">{content.forWho.title}</h2>
            <p className="text-muted-foreground mb-6">{content.forWho.description}</p>
            <ul className="grid md:grid-cols-2 gap-3">
              {content.forWho.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-xl font-semibold mb-4 text-amber-400">{content.problem.title}</h2>
              <p className="text-muted-foreground">{content.problem.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-xl font-semibold mb-4 text-emerald-400">{content.solution.title}</h2>
              <p className="text-muted-foreground">{content.solution.description}</p>
            </motion.div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">{content.outcomes.title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.outcomes.items.map((item, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{item.metric}</div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">{content.process.title}</h2>
            <div className="space-y-4">
              {content.process.steps.map((step, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex-shrink-0 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-xl font-semibold mb-6">{content.deliverables.title}</h2>
              <ul className="space-y-3">
                {content.deliverables.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">{content.timeline.title}</h2>
              </div>
              <p className="text-muted-foreground">{content.timeline.description}</p>
            </motion.section>
          </div>

          {content.faq.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">FAQ</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {content.faq.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="glass-card rounded-2xl border-0 px-6 overflow-visible"
                  >
                    <AccordionTrigger className="text-left py-6 hover:no-underline">
                      <span className="font-medium pr-4">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.section>
          )}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center glow-subtle"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.cta.title}</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {content.cta.description}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" data-testid="button-service-cta">
                {content.cta.buttonText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.section>
        </div>
      </section>
    </div>
  );
}
