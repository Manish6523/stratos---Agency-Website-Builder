# Stratos Project Documentation

**Project Name:** Stratos
**Date:** Sunday, March 15, 2026
**Version:** 1.7.0 (Beta)

---

## 1. Project Overview

Stratos is a comprehensive **SaaS (Software as a Service) platform** designed for agencies. It provides a multi-tenant architecture allowing agencies to manage sub-accounts, pipelines, and funnels efficiently. The application is built with a focus on performance, scalability, and a modern user experience.

### Key Features

- **Multi-Tenancy**: Built-in subdomain support (e.g., `agency.app.com`) for distinct workspaces.
- **Robust Authentication**: Secure user management via Clerk, integrated deeply with the database.
- **Agency Dashboard**: Comprehensive analytics dashboard with financial metrics, client tracking, and data visualization.
- **Subaccount Management**: Complete isolation and management for agency clients with dedicated dashboards.
- **Team & User Management**: Dedicated interface for managing team roles, permissions, and invitations.
- **Media Management**: Full CRUD system for file uploads with searchable media bucket, copy-to-clipboard, and visual card interface.
- **Pipeline & Kanban Boards**: Drag-and-drop pipeline management with customizable lanes and tickets for sales/project tracking.
- **Ticket System**: Comprehensive task management with customer assignment, team delegation, tag categorization, and value tracking.
- **Tag Management**: Visual tag system with 5 color options for organizing tickets and content.
- **Funnel Builder**: Marketing funnel creation with custom subdomains, multi-page support, and Stripe/Razorpay integration.
- **Contact Management**: Centralized customer tracking with total value calculation, status badges, and activity logging.
- **Payment Infrastructure**: Robust subscription system with **Razorpay** support and a newly implemented **Open-Access Billing** model for frictionless onboarding.
- **Launchpad**: Onboarding checklist for new subaccounts to complete setup steps.
- **Dynamic Navigation**: Context-aware UI headers in the global InfoBar that adapt based on the user's current section.
- **Multi-Theme System**: Scalable CSS architecture with 7 visual themes (Portfolio, 2077, Claude, Dark Matter, Kodama Grove, MX-Brutalist, Notebook), each with independent light/dark mode variants, persistent selection, and flash-free page loads.
- **Visual Page Building**: (In Progress) `EditorProvider` state machine implemented with `useReducer`, 10-action discriminated union, full undo/redo history stack, and device-responsive canvas scaffold. Advanced sidebar tabs (`SettingsTab`, `MediaBucketTab`, `ComponentsTab`) and canvas components (`Checkout`, Contact Form) are implemented. `contentEditable` elements stabilized with `dangerouslySetInnerHTML` pattern.
- **High-Aesthetic Marketing Presence**: New landing page with glassmorphism, animated transitions, and structural support for About, Features, and Documentation pages.

---

## 2. Technical Architecture

### Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: MariaDB (via Prisma ORM)
- **Styling**: Tailwind CSS & Shadcn/UI
- **Data Table**: TanStack Table (React Table)
- **Data Visualization**: Tremor Charts
- **Drag & Drop**: React Beautiful DnD
- **Authentication**: Clerk
- **File Storage**: UploadThing
- **Payment Processing**: Razorpay (Primary) & Stripe

### Folder Structure Overview

The project follows a modular structure to separate concerns between the marketing site, the main application logic, and shared utilities.

```
src/
├── app/                  # Next.js App Router Pages & Layouts
│   ├── (main)/           # Authenticated application routes
│   │   ├── agency/       # Agency dashboard & logic
│   │   └── subaccount/   # Subaccount specific dashboard & logic
│   ├── site/             # Public marketing website
│   ├── api/              # API Routes (Razorpay, UploadThing, etc.)
│   └── [domain]/         # Dynamic route for custom subdomains
├── components/           # Reusable UI components
│   ├── global/           # App-wide components (e.g., ModeToggle, InfoBar)
│   ├── site/             # Components specific to the marketing site
│   ├── forms/            # Complex form components (AgencyDetails, UserDetails)
│   ├── sidebar/          # Dynamic navigation logic
│   └── ui/               # Shadcn/UI primitives (Button, Card, etc.)
├── lib/                  # Backend utilities & configurations
│   ├── db.ts             # Prisma Client singleton
│   ├── queries.ts        # Server actions & DB queries
│   ├── razorpay/         # Razorpay client & server actions
│   └── constants.ts      # Static configuration data
├── middleware.ts         # (Located at src/proxy.ts) Auth & Routing middleware
└── prisma/               # Database schema & migrations
```

---

## 3. Database Schema

The database is designed to support a hierarchical structure: **User -> Agency -> SubAccount**.

### Core Models

- **User**: Represents a system user. Can belong to an Agency and have permissions for multiple SubAccounts.
- **Agency**: The top-level entity. Contains business details, subscription info, and owns SubAccounts.
- **SubAccount**: A child entity of an Agency. Used for organizing specific clients or business units.
- **Permissions**: Controls user access levels (Access/No Access) for specific SubAccounts.

_(See `project_docs/tables.md` for the full field-level breakdown)_

---

## 4. Key Components & Logic

### Middleware (`src/proxy.ts`)

The application's "traffic controller". It handles:

1.  **Public Route Exemption**: Allowing access to the landing page and API endpoints without login.
2.  **Subdomain Rewriting**: Detecting if a user visits `subdomain.domain.com` and rewriting the request to the dynamic `/[domain]` route.
3.  **Auth Protection**: Redirecting unauthenticated users trying to access `/agency` or `/subaccount`.

### Media System (`src/app/api/uploadthing`)

The application uses **UploadThing** for handling file storage.

- **Endpoints**: Dedicated endpoints for `agencyLogo`, `subaccountLogo`, `avatar`, and generic `media`.
- **Security**: All upload routes are protected by a middleware that authenticates the user before processing files.

### Payment System (`src/lib/razorpay`)

The application integrates **Razorpay** for subscription management.

- **`subscriptionCreate()`**: Server action for creating/updating agency subscriptions in the database.
- **API Endpoints**: Dedicated routes for creating customers, checkout sessions, and managing subscriptions.
- **Pricing Logic**: Centralized configuration in `src/config/pricing.ts` supporting INR and multi-tier plans.

### Server Actions (`src/lib/queries.ts`)

Encapsulated backend logic for security and reusability.

- **`getAuthUserDetails()`**: Retrieves the currently logged-in user's profile from the database, expanding their relations (Agency, SidebarOptions).
- **`verifyAndAcceptInvitation()`**: Critical logic that runs when a user logs in. It checks if they have a pending invitation to an agency and links them automatically if they do.
- **`sendInvitation()`**: Backend logic for creating and tracking user invitations by email.
- **`upsertAgency()`**: Handles the creation and update of Agency details, automatically generating default sidebar options and linking the owner.
- **`upsertSubAccount()`**: Creates/Updates subaccounts. It intelligently initializes the subaccount with default Sidebar Options, a "Lead Cycle" pipeline, and grants access to the Agency Owner.
- **`saveActivityLogsNotification()`**: Centralized logging function that records user actions (e.g., "Updated Subaccount") to the Notification table for audit trails.
- **`initUser()`**: Syncs the Clerk user with the local database and persists roles.
- **`getMedia(subaccountId)`**: Fetches all media files associated with a specific subaccount.
- **`createMedia(subaccountId, mediaFile)`**: Creates a new media entry in the database.
- **`deleteMedia(mediaId)`**: Permanently removes a media file from the database.
- **Pipeline Management**:
  - **`getPipelineDetails(pipelineId)`**: Fetches a single pipeline by ID.
  - **`getPipelines(subaccountId)`**: Retrieves all pipelines for a subaccount with nested lanes and tickets.
  - **`upsertPipeline(pipeline)`**: Creates or updates a pipeline.
  - **`deletePipeline(pipelineId)`**: Permanently removes a pipeline.
  - **`getLanesWithTicketAndTags(pipelineId)`**: Fetches all lanes with nested tickets, tags, and relations.
  - **`upsertLane(lane)`**: Creates or updates a lane with auto-calculated order.
  - **`updateLanesOrder(lanes)`**: Batch updates lane positions after drag-and-drop.
  - **`deleteLane(laneId)`**: Removes a lane.
- **Ticket Management**:
  - **`getTicketsWithTags(pipelineId)`**: Fetches all tickets for a pipeline with relations.
  - **`upsertTicket(ticket, tags)`**: Creates or updates a ticket with tag associations. Automatically converts Decimal values to numbers for seamless frontend serialization.
  - **`updateTicketsOrder(tickets)`**: Batch updates ticket positions and lane assignments.
  - **`deleteTicket(ticketId)`**: Permanently removes a ticket.
  - **`searchContacts(searchTerms)`**: Searches contacts by name with fuzzy matching.
  - **`getSubAccountTeamMembers(subaccountId)`**: Fetches team members with subaccount access.
- **Tag System**:
  - **`upsertTag(subaccountId, tag)`**: Creates or updates a tag for a subaccount.
  - **`deleteTag(tagId)`**: Permanently removes a tag.
  - **`getTagsForSubaccount(subaccountId)`**: Fetches all tags for a subaccount.
- **Funnel Management**:
  - **`getFunnel(funnelId)`**: Fetches a single funnel with ordered pages.
  - **`getFunnels(subaccountId)`**: Retrieves all funnels for a subaccount with nested pages.
  - **`upsertFunnel(subaccountId, funnel, funnelId)`**: Creates or updates a funnel with Stripe/Razorpay integration.
  - **`upsertFunnelPage(subaccountId, funnelPage, funnelId)`**: Creates or updates a funnel page with default content structure.
  - **`deleteFunnelPage(funnelPageId)`**: Permanently removes a funnel page.
  - **`getDomainContent(subDomainName)`**: Fetches funnel by custom subdomain for public rendering.

### Database Client (`src/lib/db.ts`)

Initializes the Prisma Client.

- **Optimization**: Uses `@prisma/adapter-mariadb` for efficient connection handling.
- **Performance**: Configured to use `127.0.0.1` to bypass local DNS resolution delays common with `localhost`.

---

## 5. Development Progress

The development is tracked in daily logs located in `project_docs/week-01/` and `project_docs/week-02/`.

### Week 01

- **Day 1**: Established the foundation, authentication, and design system.
- **Day 2**: Built the public marketing site and implemented complex routing.
- **Day 3**: Integrated the database, implemented core backend logic, and connected the dashboard.
- **Day 4**: Implemented Agency creation, role-based routing, and default system setup.
- **Day 5**: Established the authenticated Dashboard layout, dynamic Sidebar navigation, and a global Modal system.
- **Day 6**: Implemented the Agency Settings page, User Details management (including permissions), and the global InfoBar with notifications.
- **Day 7**: Implemented the Media/File Upload infrastructure (UploadThing) and the Subaccount creation/management logic with automated default setup.
- **Day 8**: Implemented the Team Management system, Invitation logic, and refined the Notification UI using TanStack Table.

### Week 02

- **Day 9**: Built comprehensive Agency Analytics Dashboard with Tremor Charts and implemented a complete Media Management system with searchable bucket, card UI, and full CRUD operations. Established Subaccount infrastructure with Launchpad onboarding.
- **Day 10**: Implemented Pipeline & Kanban Board System with react-beautiful-dnd for drag-and-drop functionality. Built PipelineView, PipelineLane, and PipelineTicket components with real-time financial tracking and lane/ticket reordering.
- **Day 11**: Built comprehensive Ticket & Tag Management System with customer search, team member assignment, multi-select tag system with inline creation, and 5-color tag categorization. Implemented debounced contact search and tag creator component.
- **Day 12**: Implemented complete Funnel Management System with custom subdomain support, multi-page funnels, and Stripe product integration. Added funnel form with favicon upload. Performed code quality improvements: fixed loading page typo, changed media card aspect ratio, and converted to type-only imports.
- **Day 13**: Implemented the Subaccount Settings page for localized management of client details and user permissions. Resolved Prisma Decimal serialization issues across the Pipeline and Ticket systems by converting values to native numbers in server actions and frontend state. Added UI interaction improvements to dropdown menus.
- **Day 14**: Implemented the Contact Management System for subaccounts, featuring a customer table with total value tracking and status badges. Polished the global InfoBar notification UI and improved the Switch component interactivity.
- **Day 15**: Implemented the Razorpay Payment & Subscription System, featuring multi-currency support (INR), centralized payment actions, and semantic plan management. Added robust logging and enhanced core utilities.
- **Day 16**: Implemented the Open-Access Billing System and dynamic navigation UI. Pivoted to a frictionless onboarding model and enhanced the global InfoBar with context-aware section headers.

### Week 03

- **Day 17**: Performed critical Prisma infrastructure fixes following client regeneration and simplified the agency onboarding logic with fallback mechanisms.
- **Day 18**: Expanded the Funnel Management system with dedicated list views and editor routing. Overhauled the Theme Switcher for hydration safety and enhanced the global type system.
- **Day 19**: Refactored Funnel Page Form to remove shadcn/ui form abstraction in favor of native inputs with `react-hook-form` register. Fixed `router.refresh()` state sync in FunnelSteps with `useEffect`. Resolved drag-and-drop container collapse by adding `provided.placeholder`. Polished funnel step cards, navigation, and SVG attribute casing.
- **Day 20**: Implemented scalable Multi-Theme CSS Architecture with 7 themes scoped under `.theme-*` classes. Redesigned ThemePicker into a two-part UI (theme dropdown + dark/light toggle). Added inline script for flash-free theme restoration. Deployed theme picker to both site navigation and dashboard InfoBar.
- **Day 21**: Scaffolded Visual Page Editor infrastructure. Created `editor-provider.tsx` (full state machine with `useReducer`, recursive element operations, undo/redo history stack) and `editor-actions.ts` (discriminated union of 10 action types). Added `EditorBtns` union type and `defaultStyles` to `constants.ts`. Rebuilt funnel editor route with DB-fetched `FunnelPage` data, guard clause, and `EditorProvider` wrapper. Polished funnel step card UI and fixed Tailwind v4 class syntax.
- **Day 22**: Activated `FunnelEditorSidebar` with dual-panel layout, `TooltipTrigger` fixes, and refined Tailwind `table.tsx` child selectors.
- **Day 23**: Built expansive `SettingsTab` property inspector (Typography, Dimensions, Decorations, Flexbox) and embedded the `MediaBucketTab` into the editor allowing seamless asset selection. Fixed uncached promise routing bugs.
- **Day 24**: Developed dynamic funnel components including a Stripe `Checkout` element and an embedded `contactForm`. Addressed Stripe elements integration complexities regarding async liveProducts and connected account ID loading.
- **Day 25**: Resolved `contentEditable` + React children conflicts in `TextComponent` and `LinkComponent` using `suppressContentEditableWarning` + `dangerouslySetInnerHTML`. Activated `ComponentsTab` in editor sidebar. Polished editor navigation padding. Created prebuilt landing page JSON template for DB seeding.

### Week 04

- **Day 26**: Implemented Canvas Drag & Drop System leveraging bounding box geometry. Imposed edit restrictions inside live/preview modes. Linked DOM element mapping with dynamic identifiers. Built precise index payloads for positional arrays.
- **Day 27**: Built AI Layout & Text generation endpoints hitting the Gemini API natively inside the editor interface via the `ai-builder-tab.tsx`.
- **Day 28**: Integrated context-injection logic within Gemini API prompts, feeding block-specific variables from the Canvas directly to the AI text-generator. Stabilized `ProgressBar`, `Testimonial`, and `Slider` interactions on the Canvas.
- **Day 29**: Completely retooled the AI system prompts, organizing them into discrete category structures to secure robust block drafting payloads that bypass JSON formatting crashes. Addressed missing UI padding and toasts global module.
- **Day 30**: Expanded Funnel execution by securely activating recursive `<EditorProvider>` deployments under strict `liveMode={true}` across designated funnel endpoints. Blocked raw browser image drag-interactions disrupting builder flows.
- **Day 31**: Defined scalable Visual Template capabilities bridging categories inside `<templates-tab.tsx>` natively powered by `next/image` thumbnails pointing directly towards metadata URLs.
- **Day 32**: Radically optimized Settings properties via highly-dense CSS grids resolving legacy visual collisions for Select dropdowns. Introduced live, integrated color swatch previews on inputs. Deployed Width `fit-content` fast-toggle controls and enhanced vector `IconBlock` bounds mapping specifically addressing `strokeWidth` configuration overrides.

### Week 05

- **Day 33**: E-commerce Template Refactoring & Styling Polish
- **Day 34**: Razorpay Full Integration & Live Payment History
- **Day 35**: Dashboard Fixes, Currency Localization & Branding Updates
- **Day 36**: Subscription Feature Gating — AI & Templates
- **Day 37**: Marketing Site Redesign & Structural Expansion

---

## 6. How to Use This Documentation

- **For Codebase Navigation**: Refer to the "Technical Architecture" section to understand where specific logic resides.
- **For Database Understanding**: Check `prisma/schema.prisma` or `project_docs/tables.md`.
- **For Daily Progress**: See the individual logs in `project_docs/day/` for a breakdown of "Goals vs. Achievements".
