import { 
  type User, type InsertUser, 
  type ContactSubmission, type InsertContact,
  type PageView, type InsertPageView,
  type AnalyticsEvent, type InsertAnalyticsEvent
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submissions
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: string): Promise<ContactSubmission | undefined>;
  
  // Analytics - Page views
  createPageView(data: InsertPageView): Promise<PageView>;
  getPageViews(limit?: number): Promise<PageView[]>;
  getPageViewStats(): Promise<{ path: string; locale: string; count: number }[]>;
  
  // Analytics - Events
  createAnalyticsEvent(data: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(eventType?: string, limit?: number): Promise<AnalyticsEvent[]>;
  getEventStats(): Promise<{ eventType: string; count: number }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private pageViews: Map<string, PageView>;
  private analyticsEvents: Map<string, AnalyticsEvent>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.pageViews = new Map();
    this.analyticsEvents = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact submissions
  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      id,
      businessName: data.businessName,
      website: data.website ?? null,
      gbpLink: data.gbpLink ?? null,
      country: data.country,
      city: data.city,
      primaryNeeds: data.primaryNeeds,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      message: data.message,
      locale: data.locale,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getContactSubmission(id: string): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  // Analytics - Page views
  async createPageView(data: InsertPageView): Promise<PageView> {
    const id = randomUUID();
    const pageView: PageView = {
      id,
      path: data.path,
      locale: data.locale,
      referrer: data.referrer ?? null,
      userAgent: data.userAgent ?? null,
      sessionId: data.sessionId ?? null,
      createdAt: new Date(),
    };
    this.pageViews.set(id, pageView);
    return pageView;
  }

  async getPageViews(limit?: number): Promise<PageView[]> {
    const views = Array.from(this.pageViews.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
    return limit ? views.slice(0, limit) : views;
  }

  async getPageViewStats(): Promise<{ path: string; locale: string; count: number }[]> {
    const stats = new Map<string, { path: string; locale: string; count: number }>();
    for (const view of Array.from(this.pageViews.values())) {
      const key = `${view.path}:${view.locale}`;
      const existing = stats.get(key);
      if (existing) {
        existing.count++;
      } else {
        stats.set(key, { path: view.path, locale: view.locale, count: 1 });
      }
    }
    return Array.from(stats.values()).sort((a, b) => b.count - a.count);
  }

  // Analytics - Events
  async createAnalyticsEvent(data: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const id = randomUUID();
    const event: AnalyticsEvent = {
      id,
      eventType: data.eventType,
      eventData: data.eventData ?? null,
      path: data.path ?? null,
      locale: data.locale ?? null,
      sessionId: data.sessionId ?? null,
      createdAt: new Date(),
    };
    this.analyticsEvents.set(id, event);
    return event;
  }

  async getAnalyticsEvents(eventType?: string, limit?: number): Promise<AnalyticsEvent[]> {
    let events = Array.from(this.analyticsEvents.values());
    if (eventType) {
      events = events.filter(e => e.eventType === eventType);
    }
    events.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    return limit ? events.slice(0, limit) : events;
  }

  async getEventStats(): Promise<{ eventType: string; count: number }[]> {
    const stats = new Map<string, number>();
    for (const event of Array.from(this.analyticsEvents.values())) {
      stats.set(event.eventType, (stats.get(event.eventType) || 0) + 1);
    }
    return Array.from(stats.entries())
      .map(([eventType, count]) => ({ eventType, count }))
      .sort((a, b) => b.count - a.count);
  }
}

export const storage = new MemStorage();
