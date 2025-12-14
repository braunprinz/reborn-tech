import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { type CaseStudy, type Locale } from "@shared/schema";

interface WorkShowcaseProps {
  locale: Locale;
  title: string;
  subtitle: string;
  cases: CaseStudy[];
  viewAllText?: string;
  viewAllHref?: string;
}

export function WorkShowcase({ locale, title, subtitle, cases, viewAllText, viewAllHref }: WorkShowcaseProps) {
  return (
    <section className="section-padding bg-card/20">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-work-title">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl" data-testid="text-work-subtitle">
              {subtitle}
            </p>
          </div>
          {viewAllText && viewAllHref && (
            <Link href={viewAllHref}>
              <Button variant="outline" data-testid="button-view-all-work">
                {viewAllText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseStudy, index) => (
            <motion.article
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden"
              data-testid={`card-case-study-${caseStudy.id}`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {caseStudy.industry}
                  </span>
                  <span className="text-xs text-muted-foreground">Case Simulation</span>
                </div>

                <h3 className="font-semibold text-lg">{caseStudy.title}</h3>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                        Challenge
                      </span>
                      <p className="text-sm text-muted-foreground">{caseStudy.challenge}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                        Approach
                      </span>
                      <p className="text-sm text-muted-foreground">{caseStudy.approach}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                    Outcomes
                  </span>
                  <ul className="space-y-1">
                    {caseStudy.outcomes.map((outcome, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="text-primary">+</span>
                        <span className="text-muted-foreground">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {caseStudy.disclaimer && (
                  <p className="text-xs text-muted-foreground/60 italic pt-2 border-t border-border/30">
                    {caseStudy.disclaimer}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
