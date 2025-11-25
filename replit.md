# HopeNest Foundation - Charity Website

## Overview

HopeNest Foundation is a charity/nonprofit website designed to create emotional connections with visitors and drive donations. The project is a full-stack web application built with a modern React frontend served by an Express backend. The application features a warm, trust-building design inspired by successful charity organizations like UNICEF and Red Cross, with a focus on clarity and minimalism to guide users toward donation actions.

The site includes PayPal integration for payment processing and is designed to work seamlessly across desktop and mobile devices with a responsive, mobile-first approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type safety and modern component development
- Vite as the build tool and development server for fast, optimized builds
- TailwindCSS for utility-first styling with a custom design system
- Shadcn UI component library (New York style) providing pre-built, accessible components
- Wouter for lightweight client-side routing
- TanStack React Query for server state management and data fetching

**Design System:**
The application implements a comprehensive design system defined in `design_guidelines.md`:
- Typography: Poppins for headings (modern, friendly), Open Sans for body text (readable, professional)
- Color Palette: Primary white backgrounds, gentle orange (#FF9966) for CTAs and accents, with carefully chosen text colors for hierarchy
- Spacing: Consistent 8px-based spacing units (8, 16, 24, 32, 48, 64px)
- Layout: Mobile-first responsive design with 1200px max-width containers
- Component approach: Warmth & trust, clarity & action, minimalism as core principles

**Component Structure:**
The frontend uses a modular component architecture with Shadcn UI components extended through custom styling. Components are organized in the `client/src/components/ui` directory and leverage Radix UI primitives for accessibility. The design follows a reference-based approach drawing from modern charity websites.

**Static Site Approach:**
The application includes a vanilla HTML/CSS/JS implementation in `client/public/` that serves as the primary user-facing site. This includes:
- `index.html`: Main markup with semantic HTML structure
- `style.css`: Complete styling implementing the design guidelines
- `script.js`: JavaScript for navigation, scroll animations, intersection observers, and PayPal integration

### Backend Architecture

**Technology Stack:**
- Node.js with Express for the HTTP server
- TypeScript for type-safe server code
- ESM (ES Modules) throughout the codebase

**Server Structure:**
The backend follows a modular architecture with separate concerns:
- `server/app.ts`: Core Express application setup with middleware configuration
- `server/routes.ts`: Route registration and static file serving
- `server/index-dev.ts`: Development server with hot reload support
- `server/index-prod.ts`: Production server with optimized static file serving
- `server/storage.ts`: Data access layer abstraction

**API Design:**
The API is RESTful with minimal endpoints:
- `/api/paypal/client-id`: Returns PayPal client ID for frontend integration
- Static asset serving for `/attached_assets` directory
- SPA fallback routing for React application

**Middleware Stack:**
- JSON body parsing with raw body preservation for webhook verification
- URL-encoded form data parsing
- Request/response logging with timestamp formatting
- Static file serving for both development and production modes

### Data Storage

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL with Neon Database serverless driver
- Schema definition in `shared/schema.ts` using Drizzle's type-safe schema builder
- Migration files output to `./migrations` directory

**Current Schema:**
- Users table with UUID primary keys, username (unique), and password fields
- Zod schema validation integrated through drizzle-zod for runtime type checking

**Storage Abstraction:**
The application implements a storage interface pattern (`IStorage`) allowing for:
- In-memory storage implementation (`MemStorage`) for development/testing
- Easy migration to database-backed storage without changing business logic
- CRUD operations for user management (getUser, getUserByUsername, createUser)

**Session Management:**
- connect-pg-simple package included for PostgreSQL session store
- Session configuration prepared for production authentication flows

### External Dependencies

**Payment Processing:**
- PayPal Server SDK (`@paypal/paypal-server-sdk`) for server-side payment processing
- PayPal client-side integration via environment-based client ID
- Environment variables: `PAYPAL_CLIENT_ID` required for payment functionality

**Database:**
- Neon Database serverless PostgreSQL (`@neondatabase/serverless`)
- Environment variables: `DATABASE_URL` required for database connectivity
- Drizzle Kit for schema migrations and database management

**UI Component Libraries:**
- Radix UI primitives for 20+ accessible, unstyled component primitives (accordion, dialog, dropdown, etc.)
- Lucide React for consistent iconography
- React Day Picker for calendar/date selection
- Recharts for data visualization if needed
- Embla Carousel for carousel functionality
- CMDK for command palette patterns

**Form Management:**
- React Hook Form for performant form handling
- Hookform Resolvers with Zod for schema-based validation
- Date-fns for date manipulation and formatting

**Development Tools:**
- Replit-specific plugins for development environment integration
- Vite plugins for error overlay and development banner
- TypeScript for compile-time type checking

**Asset Management:**
- Static assets served from `attached_assets` directory
- Google Fonts CDN for Poppins and Open Sans typography
- Font Awesome CDN for icons in the vanilla HTML implementation