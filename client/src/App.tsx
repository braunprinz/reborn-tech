import { useEffect, useRef } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getLocaleCookie, getBrowserLocale, setLocaleCookie } from "@/lib/i18n";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import WorkPage from "@/pages/WorkPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LegalPage from "@/pages/LegalPage";
import NotFound from "@/pages/not-found";

function getSessionId(): string {
  const stored = sessionStorage.getItem("analytics_session_id");
  if (stored) return stored;
  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  sessionStorage.setItem("analytics_session_id", id);
  return id;
}

function AnalyticsTracker() {
  const [location] = useLocation();
  const lastTrackedPath = useRef<string>("");

  useEffect(() => {
    if (location !== lastTrackedPath.current) {
      lastTrackedPath.current = location;
      const locale = location.startsWith("/de") ? "de" : "en";
      
      fetch("/api/analytics/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: location,
          locale,
          referrer: document.referrer || undefined,
          userAgent: navigator.userAgent,
          sessionId: getSessionId(),
        }),
      }).catch(err => console.error("Failed to track page view:", err));
    }
  }, [location]);

  return null;
}

function LocaleRedirect() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    const savedLocale = getLocaleCookie();
    
    if (savedLocale) {
      setLocation(`/${savedLocale}`);
    } else {
      const browserLocale = getBrowserLocale();
      setLocaleCookie(browserLocale);
      setLocation(`/${browserLocale}`);
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Redirecting...</div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LocaleRedirect} />
      
      <Route path="/en">
        <HomePage locale="en" />
      </Route>
      <Route path="/de">
        <HomePage locale="de" />
      </Route>

      <Route path="/en/services">
        <ServicesPage locale="en" />
      </Route>
      <Route path="/de/services">
        <ServicesPage locale="de" />
      </Route>

      <Route path="/en/services/:serviceId">
        {(params) => <ServiceDetailPage locale="en" serviceId={params.serviceId} />}
      </Route>
      <Route path="/de/services/:serviceId">
        {(params) => <ServiceDetailPage locale="de" serviceId={params.serviceId} />}
      </Route>

      <Route path="/en/work">
        <WorkPage locale="en" />
      </Route>
      <Route path="/de/work">
        <WorkPage locale="de" />
      </Route>

      <Route path="/en/about">
        <AboutPage locale="en" />
      </Route>
      <Route path="/de/about">
        <AboutPage locale="de" />
      </Route>

      <Route path="/en/contact">
        <ContactPage locale="en" />
      </Route>
      <Route path="/de/contact">
        <ContactPage locale="de" />
      </Route>

      <Route path="/de/impressum">
        <LegalPage locale="de" page="impressum" />
      </Route>
      <Route path="/de/datenschutz">
        <LegalPage locale="de" page="datenschutz" />
      </Route>
      
      <Route path="/en/imprint">
        <LegalPage locale="en" page="impressum" />
      </Route>
      <Route path="/en/privacy">
        <LegalPage locale="en" page="datenschutz" />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AnalyticsTracker />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
