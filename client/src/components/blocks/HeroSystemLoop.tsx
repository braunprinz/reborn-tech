import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin, Globe, Cpu, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Locale } from "@shared/schema";

interface SystemLoopLabels {
  visibility: string;
  website: string;
  automation: string;
  custom: string;
}

interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface HeroSystemLoopProps {
  locale: Locale;
  content: HeroContent;
  systemLoop: SystemLoopLabels;
}

const systemNodes = [
  { key: "visibility", icon: MapPin, color: "text-emerald-400" },
  { key: "website", icon: Globe, color: "text-cyan-400" },
  { key: "automation", icon: Cpu, color: "text-violet-400" },
  { key: "custom", icon: Code, color: "text-amber-400" },
];

export function HeroSystemLoop({ locale, content, systemLoop }: HeroSystemLoopProps) {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto container-padding w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-gradient" data-testid="text-hero-headline">
                {content.headline}
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl" data-testid="text-hero-subheadline">
                {content.subheadline}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" data-testid="button-hero-cta-primary">
                  {content.ctaPrimary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button variant="outline" size="lg" data-testid="button-hero-cta-secondary">
                  {content.ctaSecondary}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full border border-border/30" />
              <div className="absolute inset-8 rounded-full border border-border/20" />
              <div className="absolute inset-16 rounded-full border border-border/10" />
              
              {systemNodes.map((node, index) => {
                const angle = (index * 90 - 45) * (Math.PI / 180);
                const radius = 42;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <motion.div
                    key={node.key}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                  >
                    <div className="glass-card rounded-2xl p-4 glow-subtle">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-3 rounded-xl bg-background/50 ${node.color}`}>
                          <node.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-center whitespace-nowrap">
                          {systemLoop[node.key as keyof SystemLoopLabels]}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <defs>
                  <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#loopGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </motion.svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 glow-primary">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">System</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
