import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";
import { sendLeadNotificationEmail } from "./email";

const pageViewRequestSchema = z.object({
  path: z.string(),
  locale: z.string(),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
  sessionId: z.string().optional(),
});

const analyticsEventRequestSchema = z.object({
  eventType: z.string(),
  eventData: z.string().optional(),
  path: z.string().optional(),
  locale: z.string().optional(),
  sessionId: z.string().optional(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission({
        businessName: data.businessName,
        website: data.website || null,
        gbpLink: data.gbpLink || null,
        country: data.country,
        city: data.city,
        primaryNeeds: data.primaryNeeds,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        message: data.message,
        locale: data.locale,
      });

      // Send email notification asynchronously (don't block the response)
      sendLeadNotificationEmail(submission).catch(err => {
        console.error("Failed to send lead notification:", err);
      });

      res.status(201).json({ 
        success: true, 
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          errors: error.errors 
        });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Analytics - Track page views
  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const data = pageViewRequestSchema.parse(req.body);
      const pageView = await storage.createPageView({
        path: data.path,
        locale: data.locale,
        referrer: data.referrer ?? null,
        userAgent: data.userAgent ?? null,
        sessionId: data.sessionId ?? null,
      });
      res.status(201).json({ success: true, id: pageView.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        console.error("Page view tracking error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  // Analytics - Track events
  app.post("/api/analytics/event", async (req, res) => {
    try {
      const data = analyticsEventRequestSchema.parse(req.body);
      const event = await storage.createAnalyticsEvent({
        eventType: data.eventType,
        eventData: data.eventData ?? null,
        path: data.path ?? null,
        locale: data.locale ?? null,
        sessionId: data.sessionId ?? null,
      });
      res.status(201).json({ success: true, id: event.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        console.error("Event tracking error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
