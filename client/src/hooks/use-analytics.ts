import { useCallback } from "react";
import { useLocation } from "wouter";

function getSessionId(): string {
  const stored = sessionStorage.getItem("analytics_session_id");
  if (stored) return stored;
  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  sessionStorage.setItem("analytics_session_id", id);
  return id;
}

export async function trackAnalyticsEvent(
  eventType: string,
  eventData?: Record<string, unknown>,
  path?: string,
  locale?: string
) {
  try {
    const response = await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType,
        eventData: eventData ? JSON.stringify(eventData) : undefined,
        path,
        locale,
        sessionId: getSessionId(),
      }),
    });
    if (!response.ok) {
      console.error("Analytics event failed:", response.status);
    }
  } catch (error) {
    console.error("Failed to track event:", error);
  }
}

export function useTrackEvent() {
  const [location] = useLocation();
  const locale = location.startsWith("/de") ? "de" : "en";

  const trackEvent = useCallback(async (
    eventType: string,
    eventData?: Record<string, unknown>
  ) => {
    await trackAnalyticsEvent(eventType, eventData, location, locale);
  }, [locale, location]);

  return trackEvent;
}
