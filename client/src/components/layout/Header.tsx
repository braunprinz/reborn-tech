import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTrackEvent } from "@/hooks/use-analytics";
import { type Locale } from "@shared/schema";
import { getAlternateRoute, setLocaleCookie } from "@/lib/i18n";
import logoImage from "@assets/logo_1765611819986.png";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  locale: Locale;
  nav: NavItem[];
}

export function Header({ locale, nav }: HeaderProps) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const trackEvent = useTrackEvent();

  const switchLocale = (newLocale: Locale) => {
    trackEvent("language_switch", { from: locale, to: newLocale });
    setLocaleCookie(newLocale);
    const newPath = getAlternateRoute(location, newLocale);
    setLocation(newPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href={`/${locale}`} className="flex items-center" data-testid="link-logo">
            <img 
              src={logoImage} 
              alt="Reoborn Tech" 
              className="w-[180px] h-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover-elevate"
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-language-toggle">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => switchLocale("en")}
                  className={locale === "en" ? "bg-accent" : ""}
                  data-testid="button-language-en"
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => switchLocale("de")}
                  className={locale === "de" ? "bg-accent" : ""}
                  data-testid="button-language-de"
                >
                  Deutsch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background"
          >
            <nav className="container-padding py-4 flex flex-col gap-1">
              {nav.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors rounded-md hover-elevate block"
                  onClick={() => setMobileOpen(false)}
                  data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
