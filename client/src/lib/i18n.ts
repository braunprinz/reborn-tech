import { type Locale } from "@shared/schema";

export const locales: Locale[] = ["de", "en"];
export const defaultLocale: Locale = "de";

export function getLocaleFromPath(path: string): Locale {
  const match = path.match(/^\/(de|en)/);
  return match ? (match[1] as Locale) : defaultLocale;
}

export function setLocaleCookie(locale: Locale): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("preferredLocale", locale);
  }
}

export function getLocaleCookie(): Locale | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("preferredLocale");
    if (stored === "de" || stored === "en") {
      return stored;
    }
  }
  return null;
}

export function getBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }
  
  const languages = navigator.languages || [navigator.language];
  
  for (const lang of languages) {
    if (lang.startsWith("de")) {
      return "de";
    }
  }
  
  return "en";
}

export function getAlternateRoute(currentPath: string, newLocale: Locale): string {
  const pathWithoutLocale = currentPath.replace(/^\/(de|en)/, "");
  return `/${newLocale}${pathWithoutLocale || ""}`;
}

export async function loadContent<T>(locale: Locale, page: string): Promise<T> {
  const content = await import(`../content/${locale}/${page}.json`);
  return content.default as T;
}
