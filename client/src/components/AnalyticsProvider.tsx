import { createContext, useContext, type ReactNode } from "react";
import { useTrackEvent } from "@/hooks/use-analytics";

interface AnalyticsContextValue {
  trackEvent: (eventType: string, eventData?: Record<string, unknown>) => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    return { trackEvent: async () => {} };
  }
  return context;
}

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const trackEvent = useTrackEvent();

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
