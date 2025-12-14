import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessName: text("business_name").notNull(),
  website: text("website"),
  gbpLink: text("gbp_link"),
  country: text("country").notNull(),
  city: text("city").notNull(),
  primaryNeeds: text("primary_needs").array().notNull(),
  budgetRange: text("budget_range").notNull(),
  timeline: text("timeline").notNull(),
  message: text("message").notNull(),
  locale: text("locale").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const contactFormSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  website: z.string().url().optional().or(z.literal("")),
  gbpLink: z.string().url().optional().or(z.literal("")),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  primaryNeeds: z.array(z.string()).min(1, "Select at least one service"),
  budgetRange: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  locale: z.string().default("en"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type ContactFormData = z.infer<typeof contactFormSchema>;

export type Locale = "de" | "en";

// Analytics tables
export const pageViews = pgTable("page_views", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  path: text("path").notNull(),
  locale: text("locale").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(), // 'form_submission', 'cta_click', 'language_switch'
  eventData: text("event_data"), // JSON string for flexible data
  path: text("path"),
  locale: text("locale"),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPageViewSchema = createInsertSchema(pageViews).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type PageView = typeof pageViews.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ProofMetric {
  value: string;
  label: string;
  description: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  tagline: string;
  outcomes: string[];
  href: string;
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  approach: string;
  outcomes: string[];
  disclaimer: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    tagline: string;
  };
  forWho: {
    title: string;
    description: string;
    points: string[];
  };
  problem: {
    title: string;
    description: string;
  };
  solution: {
    title: string;
    description: string;
  };
  outcomes: {
    title: string;
    items: { metric: string; description: string }[];
  };
  process: {
    title: string;
    steps: { title: string; description: string }[];
  };
  deliverables: {
    title: string;
    items: string[];
  };
  timeline: {
    title: string;
    description: string;
  };
  faq: FAQItem[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}
