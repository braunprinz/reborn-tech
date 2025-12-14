import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { type MethodStep } from "@shared/schema";

interface MethodTimelineProps {
  title: string;
  subtitle: string;
  steps: MethodStep[];
}

export function MethodTimeline({ title, subtitle, steps }: MethodTimelineProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-method-title">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-method-subtitle">
            {subtitle}
          </p>
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border/30" />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow-subtle">
                    <span className="text-primary font-bold text-lg">{step.number}</span>
                  </div>
                </div>

                <div
                  className="glass-card rounded-2xl p-6 cursor-pointer hover-elevate"
                  onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                  data-testid={`card-method-step-${step.number}`}
                >
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-primary">
                    <span>Details</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expandedStep === step.number ? "rotate-180" : ""}`}
                    />
                  </div>

                  <AnimatePresence>
                    {expandedStep === step.number && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-border/50 space-y-2"
                      >
                        {step.details.map((detail, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="glass-card rounded-2xl p-6 cursor-pointer hover-elevate"
                onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                data-testid={`card-method-step-mobile-${step.number}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex-shrink-0 flex items-center justify-center">
                    <span className="text-primary font-bold">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${expandedStep === step.number ? "rotate-180" : ""}`}
                  />
                </div>

                <AnimatePresence>
                  {expandedStep === step.number && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border/50 space-y-2 ml-16"
                    >
                      {step.details.map((detail, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
