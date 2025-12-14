import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type FAQItem } from "@shared/schema";

interface FAQBlockProps {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export function FAQBlock({ title, subtitle, items }: FAQBlockProps) {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg" data-testid="text-faq-subtitle">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-2xl border-0 px-6 overflow-visible"
                data-testid={`accordion-faq-${index}`}
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
        </motion.div>
      </div>
    </section>
  );
}
