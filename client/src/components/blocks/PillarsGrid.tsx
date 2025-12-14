import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin, Globe, Cpu, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { type ServicePillar } from "@shared/schema";

interface PillarsGridProps {
  title: string;
  subtitle: string;
  items: ServicePillar[];
}

const iconMap: Record<string, typeof MapPin> = {
  "local-growth": MapPin,
  website: Globe,
  automation: Cpu,
  "custom-it": Code,
};

const colorMap: Record<string, string> = {
  "local-growth": "text-emerald-400",
  website: "text-cyan-400",
  automation: "text-violet-400",
  "custom-it": "text-amber-400",
};

export function PillarsGrid({ title, subtitle, items }: PillarsGridProps) {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="mb-4" data-testid="text-pillars-title">{title}</h2>
          <p className="text-lg text-muted-foreground" data-testid="text-pillars-subtitle">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => {
            const Icon = iconMap[item.id] || Globe;
            const color = colorMap[item.id] || "text-primary";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href} data-testid={`card-pillar-${item.id}`} className="block">
                  <Card className="p-8 h-full glass-card border-border/50 hover-elevate group cursor-pointer transition-all">
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-xl bg-background/50 ${color} shrink-0`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">{item.tagline}</p>
                        <ul className="space-y-2 mb-6">
                          {item.outcomes.map((outcome, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                          Learn more <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
