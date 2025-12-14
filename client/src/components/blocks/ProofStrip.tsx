import { motion } from "framer-motion";
import { type ProofMetric } from "@shared/schema";

interface ProofStripProps {
  title: string;
  metrics: ProofMetric[];
}

export function ProofStrip({ title, metrics }: ProofStripProps) {
  return (
    <section className="section-padding border-y border-border/30 bg-card/20">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground text-center mb-12 uppercase tracking-wider"
          data-testid="text-proof-title"
        >
          {title}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
              data-testid={`card-metric-${index}`}
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {metric.value}
              </div>
              <div className="font-medium mb-1">{metric.label}</div>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
