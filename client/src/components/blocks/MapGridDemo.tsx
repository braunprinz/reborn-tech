import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MapGridDemoProps {
  title: string;
  subtitle: string;
  keywordLabel: string;
  cityLabel: string;
  keywords: string[];
  cities: string[];
  disclaimer: string;
}

function generateGridData() {
  return Array.from({ length: 49 }, () => ({
    rank: Math.floor(Math.random() * 20) + 1,
    visible: Math.random() > 0.3,
  }));
}

export function MapGridDemo({
  title,
  subtitle,
  keywordLabel,
  cityLabel,
  keywords,
  cities,
  disclaimer,
}: MapGridDemoProps) {
  const [selectedKeyword, setSelectedKeyword] = useState(keywords[0]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [gridData, setGridData] = useState(generateGridData());

  useEffect(() => {
    setGridData(generateGridData());
  }, [selectedKeyword, selectedCity]);

  const getRankColor = (rank: number, visible: boolean) => {
    if (!visible) return "bg-muted/50";
    if (rank <= 3) return "bg-emerald-500/80";
    if (rank <= 7) return "bg-yellow-500/80";
    if (rank <= 10) return "bg-orange-500/80";
    return "bg-red-500/60";
  };

  return (
    <section className="section-padding bg-card/30">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="mb-4" data-testid="text-mapdemo-title">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-border/50 p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">
                  {keywordLabel}
                </label>
                <Select value={selectedKeyword} onValueChange={setSelectedKeyword}>
                  <SelectTrigger data-testid="select-keyword">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {keywords.map((kw) => (
                      <SelectItem key={kw} value={kw}>
                        {kw}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">
                  {cityLabel}
                </label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger data-testid="select-city">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {gridData.map((cell, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className={`aspect-square rounded-md ${getRankColor(cell.rank, cell.visible)} flex items-center justify-center text-xs font-medium`}
                    data-testid={`cell-grid-${index}`}
                  >
                    {cell.visible && cell.rank <= 10 && (
                      <span className="text-white/90">{cell.rank}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500/80" />
                <span className="text-muted-foreground">Top 3</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-yellow-500/80" />
                <span className="text-muted-foreground">4-7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-orange-500/80" />
                <span className="text-muted-foreground">8-10</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500/60" />
                <span className="text-muted-foreground">10+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-muted/50" />
                <span className="text-muted-foreground">Not ranked</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6 italic">
              {disclaimer}
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
