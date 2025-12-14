# Digital Systems - Premium Bilingual Agency Website

## Overview

This is a premium, bilingual (German/English) digital agency website built with a systems-driven approach. The project positions the agency as a boutique digital partner rather than a generic marketing agency, emphasizing an engineered, calm, and confident aesthetic.

The core business system follows four pillars: Local Growth (Maps/SEO) → Website Creation → AI Automation → Custom IT. The website features fully separated locale routes, dark-first premium design, and interactive system visualizations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing with locale-prefixed paths (`/en/*`, `/de/*`)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with custom dark-first theme, CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix primitives) configured in `components.json`
- **Animations**: Framer Motion for subtle, purposeful micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api/*`
- **Build Process**: Custom script using esbuild for server bundling, Vite for client

### Content Management
- **Approach**: JSON-based static content files per locale (`client/src/content/{locale}/{page}.json`)
- **Loading**: Dynamic imports via `loadContent()` utility function
- **Benefits**: Full separation of DE/EN content, easy translation workflow, no CMS dependency

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Generated via `drizzle-kit push`
- **Current Tables**: `users` (auth), `contact_submissions` (form data)
- **Runtime Fallback**: `MemStorage` class for development without database

### Form Handling
- **Validation**: Zod schemas shared between client and server (`shared/schema.ts`)
- **Client Forms**: React Hook Form with Zod resolver
- **Server Validation**: Same Zod schemas for request body parsing

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Database
- **PostgreSQL**: Required for production, configured via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations and schema pushing

### UI/Component Libraries
- **Radix UI**: Full suite of accessible primitive components
- **shadcn/ui**: Pre-styled component layer using "new-york" style variant
- **Lucide React**: Icon library

### Animation & Interaction
- **Framer Motion**: Animation library for React
- **Embla Carousel**: Carousel/slider functionality
- **Vaul**: Drawer component

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation (shared client/server)
- **@hookform/resolvers**: Zod integration for React Hook Form

### Fonts
- **Google Fonts**: DM Sans, Geist Mono, Fira Code, Architects Daughter (loaded via CDN in `index.html`)