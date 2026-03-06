# STRATOS - Comprehensive Project Documentation

**Version:** 1.5.1 (Beta)
**Last Updated:** 2026-03-05
**Purpose:** Primary reference for Claude Code - AI-optimized project documentation

---

## Table of Contents

1. [Project Overview & Purpose](#1-project-overview--purpose)
2. [Quick Start Guide](#2-quick-start-guide)
3. [Technology Stack](#3-technology-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Project Structure](#5-project-structure)
6. [Core Systems & Features](#6-core-systems--features)
7. [Database Schema & Relationships](#7-database-schema--relationships)
8. [Development Progress Timeline](#8-development-progress-timeline)
9. [Key Components & Utilities](#9-key-components--utilities)
10. [Development Patterns & Conventions](#10-development-patterns--conventions)
11. [Configuration & Environment](#11-configuration--environment)
12. [Common Tasks & Critical Paths](#12-common-tasks--critical-paths)
13. [Future Features & Roadmap](#13-future-features--roadmap)
14. [References](#14-references)

---

## 1. Project Overview & Purpose

**Stratos** is a multi-tenant SaaS platform designed for digital agencies to manage clients, projects, and marketing automation workflows. It provides white-labeling capabilities, team collaboration features, and comprehensive CRM functionality.

### Core Purpose

- **Agency Management:** Create and manage digital agencies with team members and permissions
- **Client Isolation:** Separate subaccounts for each client with independent resources
- **CRM & Pipeline Management:** Track deals, contacts, and sales processes
- **Marketing Automation:** Build funnels, landing pages, and automated workflows
- **White-labeling:** Customizable branding per agency

### Key Capabilities (Current - Day 25)

✅ User authentication and authorization (Clerk)
✅ Multi-tenant agency and subaccount management
✅ Role-based access control (4 role types)
✅ Team invitation system with email flows
✅ Media management with UploadThing
✅ Activity logging and notifications
✅ Dynamic sidebar navigation
✅ Global modal system
✅ Pipeline/CRM with Kanban boards (react-beautiful-dnd)
✅ Funnel builder with multi-page support
✅ Multi-theme system (7 themes with light/dark variants)
✅ Razorpay payment & subscription system
✅ Contact management with value tracking
✅ Visual page builder (Canvas rendering, Media Integration, Sidebar, DnD reordering)
✅ AI Assistant Integration (Layout generation & Text generation)
⏳ Automation engine (database ready, UI pending)

---

## 2. Quick Start Guide

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- MariaDB 10.11+ or MySQL 8.0+
- Clerk account (authentication)
- UploadThing account (file storage)

### Installation Steps

```bash
# 1. Clone repository (if applicable)
cd /home/manish/codes/work/stratos

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create .env file with required variables (see Section 11)

# 4. Set up database
npx prisma generate
npx prisma migrate dev

# 5. Start development server
npm run dev
# Application runs on http://localhost:3000
```

### Initial Setup Checklist

- [ ] Configure `.env` with Clerk credentials
- [ ] Configure `.env` with database connection
- [ ] Configure `.env` with UploadThing token
- [ ] Run Prisma migrations
- [ ] Create first agency through UI (requires Clerk sign-up)

---

## 3. Technology Stack

### Frontend Technologies

| Technology           | Version | Purpose                         |
| -------------------- | ------- | ------------------------------- |
| Next.js              | 16.1.6  | React framework with App Router |
| React                | 19.2.3  | UI library                      |
| TypeScript           | 5.x     | Type safety                     |
| Tailwind CSS         | 4.x     | Utility-first styling           |
| Radix UI             | Latest  | Accessible component primitives |
| Shadcn/UI            | Latest  | Pre-built component library     |
| TanStack React Table | 8.21.3  | Data tables                     |
| React Hook Form      | 7.54.2  | Form management                 |
| Zod                  | 3.24.1  | Schema validation               |
| Lucide React         | Latest  | Icon library                    |
| Sonner               | Latest  | Toast notifications             |
| Recharts             | 2.15.0  | Data visualization              |

### Backend Technologies

| Technology    | Version       | Purpose                          |
| ------------- | ------------- | -------------------------------- |
| Prisma        | 7.3.0         | ORM and database toolkit         |
| MariaDB/MySQL | 10.11+ / 8.0+ | Relational database              |
| Clerk         | 6.37.1        | Authentication & user management |
| UploadThing   | 7.7.4         | File upload and storage          |

### Additional Libraries

- **@tremor/react** (3.19.3) - Dashboard components
- **next-themes** (0.4.4) - Theme management
- **stripe** (17.5.0) - Payment processing (planned)
- **eslint** (9.x) - Code linting

---

## 4. Architecture Overview

### Multi-Tenancy Model

```
User (Clerk Auth)
  ↓
  └─→ Agency (Tenant Root)
        ├─→ Agency Owner/Admin
        ├─→ Team Members (via Invitations)
        ├─→ White-label Settings
        └─→ SubAccounts (Client Isolation)
              ├─→ Permissions (User ↔ SubAccount)
              ├─→ Pipelines, Contacts, Funnels
              ├─→ Media Assets
              └─→ Independent Resources
```

### Core Architectural Patterns

**1. Authentication & Authorization**

- **Clerk** handles authentication (sign-up, sign-in, session management)
- Middleware (`/src/proxy.ts`) enforces route protection
- RBAC implemented via `Permissions` model
- 4 Role Types: `AGENCY_OWNER`, `AGENCY_ADMIN`, `SUBACCOUNT_USER`, `SUBACCOUNT_GUEST`

**2. Server Actions Pattern**

- All backend operations centralized in `/src/lib/queries.ts`
- "use server" directive for server-side execution
- Type-safe operations with Prisma
- Direct function imports in client components

**3. Subdomain-Based Routing**

- Marketing site: `yourdomain.com`
- Agency dashboard: Authenticated route `/agency/[agencyId]`
- Subaccount dashboard: `/subaccount/[subaccountId]`
- Dynamic subdomains: `[clientname].yourdomain.com` (future)

**4. Global State Management**

- **ModalProvider**: Global modal dialog system
- **ThemeProvider**: Dark/light mode via next-themes
- **ThemePicker**: Multi-theme system with 7 visual themes (Portfolio, 2077, Claude, Dark Matter, Kodama Grove, MX-Brutalist, Notebook) scoped via `.theme-*` CSS classes, with `localStorage` persistence and inline script for flash-free restoration
- No Redux or Zustand - Context API for minimal global state

**5. File Storage Architecture**

- UploadThing for file uploads
- Media organized by subaccount
- File types: Agency logos, subaccount logos, avatars, general media
- Direct URL access after upload

---

## 5. Project Structure

```
/home/manish/codes/work/stratos/
│
├── src/                              # Application source code
│   │
│   ├── app/                          # Next.js App Router
│   │   ├── (main)/                   # Authenticated routes group
│   │   │   ├── agency/
│   │   │   │   └── [agencyId]/       # Agency dashboard routes
│   │   │   │       ├── all-subaccounts/
│   │   │   │       ├── settings/
│   │   │   │       ├── team/
│   │   │   │       └── layout.tsx    # Agency layout with sidebar
│   │   │   └── subaccount/
│   │   │       └── [subaccountId]/   # Subaccount dashboard routes
│   │   │           └── layout.tsx    # Subaccount layout
│   │   │
│   │   ├── site/                     # Public marketing site
│   │   │   ├── page.tsx              # Landing page
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                      # API routes
│   │   │   └── uploadthing/          # UploadThing endpoints
│   │   │
│   │   ├── [domain]/                 # Dynamic subdomain routes (future)
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # React components
│   │   ├── global/                   # App-wide components
│   │   │   ├── BlurPage.tsx
│   │   │   ├── CustomModal.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── InfoBar.tsx           # Notification center
│   │   │   ├── ThemePicker.tsx       # Multi-theme & dark/light toggle
│   │   │   └── Loading.tsx
│   │   │
│   │   ├── forms/                    # Form components
│   │   │   ├── AgencyDetails.tsx
│   │   │   ├── UserDetails.tsx
│   │   │   ├── SubaccountDetails.tsx
│   │   │   └── SendInvitation.tsx
│   │   │
│   │   ├── sidebar/                  # Navigation components
│   │   │   ├── index.tsx             # Main sidebar
│   │   │   ├── MenuOptions.tsx
│   │   │   └── SubaccountSelector.tsx
│   │   │
│   │   ├── ui/                       # Shadcn/UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (30+ UI components)
│   │   │
│   │   └── site/                     # Marketing site components
│   │       ├── Navigation.tsx
│   │       └── ...
│   │
│   ├── lib/                          # Utilities & business logic
│   │   ├── db.ts                     # Prisma client singleton
│   │   ├── queries.ts                # Server actions (646 lines) ⭐ CRITICAL
│   │   ├── constants.ts              # Pricing plans, icons config
│   │   ├── types.ts                  # TypeScript type definitions
│   │   ├── utils.ts                  # Helper functions (cn, etc.)
│   │   └── uploadthing.ts            # UploadThing configuration
│   │
│   ├── providers/                    # React Context providers
│   │   ├── ModalProvider.tsx         # Global modal state ⭐
│   │   ├── ThemeProvider.tsx         # Dark/light mode
│   │   └── editor/                   # Visual editor state
│   │       ├── editor-provider.tsx   # Editor context, reducer, useEditor hook ⭐
│   │       └── editor-actions.ts     # Discriminated union of 10 action types
│   │
│   └── proxy.ts                      # Auth & routing middleware ⭐ CRITICAL
│
├── prisma/
│   ├── schema.prisma                 # Database schema ⭐ CRITICAL
│   └── migrations/                   # Database migration history
│
├── project_docs/                     # Existing documentation
│   ├── documentation.md              # Master reference
│   ├── tables.md                     # Database schema details
│   ├── dayTitle.md                   # Day index
│   └── day/                          # Daily development logs
│       ├── day01.md
│       ├── ...
│       └── day08.md
│
├── public/                           # Static assets
│   ├── assets/                       # Images, icons
│   └── ...
│
├── .env                              # Environment variables (gitignored)
├── .env.example                      # Environment template
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── claude_documentation.md           # This file

⭐ = Critical files for understanding the system
```

---

## 6. Core Systems & Features

### 6.1 User Management System

**Authentication:** Powered by Clerk

- Email/password authentication
- OAuth providers support
- Session management
- Webhook integration for user sync

**Authorization:** Role-Based Access Control (RBAC)

| Role               | Access Level       | Capabilities                                          |
| ------------------ | ------------------ | ----------------------------------------------------- |
| `AGENCY_OWNER`     | Full agency access | Create/delete agency, manage all subaccounts, billing |
| `AGENCY_ADMIN`     | Agency management  | Manage team, create subaccounts, view all data        |
| `SUBACCOUNT_USER`  | Subaccount access  | Full access to assigned subaccounts                   |
| `SUBACCOUNT_GUEST` | Limited access     | Read-only or restricted subaccount access             |

**Team Invitations:**

- Email-based invitation flow
- Automatic permission assignment on acceptance
- Invitation expiration tracking
- Role selection during invite
- Status tracking: `PENDING`, `ACCEPTED`, `REVOKED`

**Key Functions:**

- `initUser()` - Syncs Clerk user to database
- `getAuthUserDetails()` - Fetches user with permissions and agency
- `verifyAndAcceptInvitation()` - Auto-accepts pending invitations
- `sendInvitation()` - Creates and emails team invites

### 6.2 Agency Management System

**Core Features:**

- Agency creation with automatic owner assignment
- White-labeling: Custom logo, brand colors
- Company information: Name, email, phone, address
- Billing configuration (Stripe integration ready)
- Goal tracking and subscription management

**Auto-Initialization:**
When a new agency is created:

1. Owner permissions automatically assigned
2. Default sidebar options created
3. User role set to `AGENCY_OWNER` or `AGENCY_ADMIN`
4. Activity notification logged

**Agency Settings:**

- Located at: `/agency/[agencyId]/settings`
- Combines agency form and user management
- File upload for agency logo
- Address and contact information

**Key Functions:**

- `upsertAgency()` - Create or update agency
- `updateAgencyDetails()` - Partial updates
- `deleteAgency()` - Cascade deletes all related data
- `getAgencyDetails()` - Fetch with subaccounts and sidebar options

### 6.3 Subaccount System

**Purpose:** Client/project isolation within an agency

**Core Features:**

- Independent resources per subaccount
- Separate permissions for each subaccount
- Custom branding (logo, colors)
- Subdomain support (planned)
- Automatic default setup

**Auto-Initialization:**
When a new subaccount is created:

1. Default sidebar options added
2. Default pipeline created with 5 lanes:
   - Lead, Contacted, Demo Scheduled, Proposal Sent, Closed Won
3. Creator receives `SUBACCOUNT_USER` permission
4. Activity notification logged

**Subaccount Resources:**

- Pipelines and lanes
- Contacts and tickets
- Funnels and pages
- Media files
- Permissions (user access)

**Key Functions:**

- `upsertSubAccount()` - Create or update with defaults
- `getSubaccountDetails()` - Fetch with permissions
- `deleteSubAccount()` - Cascade deletes resources
- `getUserPermissions()` - Check user access

### 6.4 Media Management System

**File Storage:** UploadThing integration

**Media Types:**

- Agency logos
- Subaccount logos
- User avatars
- General media files (images, documents)

**Organization:**

- Media linked to subaccounts
- File URLs stored in database
- Created timestamp for tracking
- Name and type metadata

**Component:**

- `FileUpload` component (`/src/components/global/FileUpload.tsx`)
- Handles upload, preview, and deletion
- Returns public URL on successful upload

**Key Functions:**

- `createMedia()` - Save media record to database
- `getMedia()` - Fetch media for subaccount

### 6.5 Notification System

**Purpose:** Activity tracking and audit logging

**Notification Types:**

- Agency-level notifications
- Subaccount-level notifications
- User-specific notifications

**Tracked Activities:**

- Agency created/updated
- Subaccount created/updated
- User permissions changed
- Team member invited/joined
- Media uploaded
- (Future: Pipeline updates, automation triggers)

**Display:**

- **InfoBar** component shows latest notifications
- Real-time count display
- User context switching (agency ↔ subaccount)

**Key Functions:**

- `saveActivityLogsNotification()` - Create notification entry
- `getNotificationAndUser()` - Fetch for InfoBar display

### 6.6 CRM Features (Database Ready, UI Pending)

**Pipeline Management:**

- Kanban-style deal tracking
- Customizable lanes per pipeline
- Drag-and-drop ticket movement
- Lane order management

**Ticket System:**

- Linked to contacts
- Assigned to team members
- Value tracking for deal size
- Tag support for categorization
- Due dates and descriptions

**Contact Management:**

- Full contact profiles
- Email and phone
- Linked to tickets
- Tag-based organization

**Tag System:**

- Custom tags per subaccount
- Color-coded categories
- Multi-tag support per ticket/contact

**Database Models Ready:**

- `Pipeline`, `Lane`, `Ticket`
- `Contact`, `Tag`
- Relationships fully defined

### 6.7 Marketing Automation (Database Ready, UI Pending)

**Funnel Builder:**

- Multi-page funnels
- Landing page creation
- Visual page editor (planned)
- Step order management
- DOM content storage

**Automation Engine:**

- Trigger-based workflows
- Action sequences
- Automation instances for tracking
- Status: `ACTIVE`, `PUBLISHED`

**Triggers:**

- Form submissions
- Contact creation
- Ticket movement
- Custom events

**Actions:**

- Create/update contact
- Send email
- Update ticket
- Custom webhooks

**Database Models Ready:**

- `Funnel`, `FunnelPage`, `ClassName`
- `Trigger`, `Automation`, `AutomationInstance`, `Action`

---

## 7. Database Schema & Relationships

**📄 Full Schema Reference:** `/home/manish/codes/work/stratos/project_docs/tables.md`

### Schema Overview

**Total Models:** 23
**Primary Database:** MariaDB/MySQL via Prisma ORM
**Key Features:** Cascade deletes, relational integrity, enum types

### Core Models Summary

| Model                     | Purpose                           | Key Relations                           |
| ------------------------- | --------------------------------- | --------------------------------------- |
| `User`                    | User accounts (synced from Clerk) | → Agency, Permissions, Tickets          |
| `Agency`                  | Tenant root entity                | → Users, SubAccounts, Invitations       |
| `SubAccount`              | Client/project isolation          | → Agency, Permissions, Pipelines, Media |
| `Permissions`             | User access control               | → User, SubAccount                      |
| `Invitation`              | Team invite tracking              | → Agency                                |
| `Pipeline`                | Deal tracking system              | → SubAccount, Lanes                     |
| `Lane`                    | Pipeline stages                   | → Pipeline, Tickets                     |
| `Ticket`                  | Individual deals/tasks            | → Lane, Contact, Assigned User, Tags    |
| `Tag`                     | Categorization labels             | → SubAccount, Tickets                   |
| `Contact`                 | CRM contacts                      | → SubAccount, Tickets                   |
| `Media`                   | File storage records              | → SubAccount                            |
| `Funnel`                  | Marketing funnels                 | → SubAccount, FunnelPages               |
| `FunnelPage`              | Landing pages                     | → Funnel                                |
| `Trigger`                 | Automation triggers               | → SubAccount                            |
| `Automation`              | Workflow definitions              | → SubAccount, Actions, Instances        |
| `Action`                  | Automation steps                  | → Automation                            |
| `Notification`            | Activity logs                     | → Agency, SubAccount, User              |
| `Subscription`            | Billing subscriptions             | → Agency                                |
| `AddOns`                  | Subscription add-ons              | → Agency                                |
| `AgencySidebarOption`     | Navigation items                  | → Agency                                |
| `SubAccountSidebarOption` | Navigation items                  | → SubAccount                            |
| `ClassName`               | CSS class storage                 | → FunnelPage                            |
| `AutomationInstance`      | Automation execution tracking     | → Automation                            |

### Critical Relationships

```
┌─────────────────────────────────────────────────────────┐
│                     AGENCY (Root Tenant)                 │
│  - id, name, logo, email, phone, address                │
│  - whiteLabel, goal, companyEmail                       │
└───────────┬─────────────────────────────────────────────┘
            │
            ├──→ Users (1:Many) [CASCADE DELETE]
            │    └─→ Permissions (Many:Many via SubAccount)
            │
            ├──→ SubAccounts (1:Many) [CASCADE DELETE]
            │    │
            │    ├──→ Permissions (1:Many)
            │    ├──→ Pipelines (1:Many) [CASCADE]
            │    │    └─→ Lanes (1:Many) [CASCADE]
            │    │         └─→ Tickets (1:Many) [CASCADE]
            │    │
            │    ├──→ Contacts (1:Many) [CASCADE]
            │    ├──→ Media (1:Many) [CASCADE]
            │    ├──→ Funnels (1:Many) [CASCADE]
            │    │    └─→ FunnelPages (1:Many) [CASCADE]
            │    │
            │    ├──→ Triggers (1:Many) [CASCADE]
            │    └──→ Automations (1:Many) [CASCADE]
            │
            ├──→ Invitations (1:Many) [CASCADE DELETE]
            ├──→ Notifications (1:Many) [CASCADE DELETE]
            ├──→ Subscription (1:1 optional) [CASCADE]
            ├──→ AddOns (1:Many) [CASCADE]
            └──→ AgencySidebarOptions (1:Many) [CASCADE]
```

### Enum Types

```typescript
enum Role {
  AGENCY_OWNER
  AGENCY_ADMIN
  SUBACCOUNT_USER
  SUBACCOUNT_GUEST
}

enum Icon {
  settings, chart, calendar, check, chip,
  compass, database, flag, home, info,
  link, lock, messages, notification,
  payment, power, receipt, shield, star,
  tune, video, wallet, warning, headphone,
  send, pipelines, person, category,
  contact, clipboardIcon
}

enum TriggerTypes {
  CONTACT_FORM
}

enum ActionType {
  CREATE_CONTACT
}

enum InvitationStatus {
  ACCEPTED
  REVOKED
  PENDING
}
```

### Cascade Delete Behavior

**Deleting Agency:**

- ✅ All Users (set agencyId to NULL)
- ✅ All SubAccounts + their resources
- ✅ All Invitations
- ✅ All Notifications
- ✅ Subscription and AddOns
- ✅ AgencySidebarOptions

**Deleting SubAccount:**

- ✅ All Permissions
- ✅ All Pipelines → Lanes → Tickets
- ✅ All Contacts
- ✅ All Media
- ✅ All Funnels → FunnelPages
- ✅ All Triggers
- ✅ All Automations

**Deleting Pipeline:**

- ✅ All Lanes
- ✅ All Tickets in those Lanes

### Unique Constraints

- `User.email` - Unique across platform
- `Agency.id` - UUID primary key
- `SubAccount.id` - UUID primary key
- `Pipeline.id` - UUID primary key

---

## 8. Development Progress Timeline

**📄 Detailed Daily Logs:** `/home/manish/codes/work/stratos/project_docs/day/`

| Day           | Date         | Focus Area                         | Key Achievements                                                                                                                                                                                                                                                                                                                                                                    | Files Modified                                                                                                                                                                  |
| ------------- | ------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Day 1**     | Early Jan    | Foundation & Auth                  | • Clerk integration<br>• Next.js 16 App Router setup<br>• Middleware implementation<br>• Shadcn/UI design system                                                                                                                                                                                                                                                                    | `src/proxy.ts`<br>`src/lib/db.ts`<br>Components initialized                                                                                                                     |
| **Day 2**     | Early Jan    | Marketing Site                     | • Landing page design<br>• Subdomain routing setup<br>• Theme provider (dark/light)<br>• Public site layout                                                                                                                                                                                                                                                                         | `src/app/site/`<br>`src/providers/ThemeProvider.tsx`                                                                                                                            |
| **Day 3**     | Early Jan    | Database Layer                     | • Prisma schema design (23 models)<br>• Migrations setup<br>• Dashboard foundation<br>• Type definitions                                                                                                                                                                                                                                                                            | `prisma/schema.prisma`<br>`src/lib/types.ts`<br>`src/lib/queries.ts` started                                                                                                    |
| **Day 4**     | Mid Jan      | Agency Creation                    | • `upsertAgency()` implementation<br>• `initUser()` Clerk sync<br>• Role-based routing<br>• Agency creation flow                                                                                                                                                                                                                                                                    | `src/lib/queries.ts`<br>`src/components/forms/AgencyDetails.tsx`<br>`src/app/(main)/agency/`                                                                                    |
| **Day 5**     | Mid Jan      | Dashboard Layout                   | • Sidebar navigation (agency/subaccount aware)<br>• Modal system (`ModalProvider`)<br>• RBAC enforcement<br>• InfoBar component                                                                                                                                                                                                                                                     | `src/components/sidebar/`<br>`src/providers/ModalProvider.tsx`<br>`src/components/global/InfoBar.tsx`                                                                           |
| **Day 6**     | Late Jan     | Settings & Users                   | • Agency settings page<br>• UserDetails form<br>• Permission management UI<br>• Notification center<br>• Activity logging                                                                                                                                                                                                                                                           | `src/app/(main)/agency/[agencyId]/settings/`<br>`src/components/forms/UserDetails.tsx`<br>`saveActivityLogsNotification()`                                                      |
| **Day 7**     | Late Jan     | Media & Subaccounts                | • UploadThing integration<br>• Subaccount CRUD operations<br>• Auto-defaults (pipeline, sidebar)<br>• Media management UI                                                                                                                                                                                                                                                           | `src/lib/uploadthing.ts`<br>`src/components/forms/SubaccountDetails.tsx`<br>`upsertSubAccount()` with defaults                                                                  |
| **Day 8**     | Feb 2026     | Team Management                    | • TanStack Table integration<br>• SendInvitation form<br>• Email invitation flow<br>• Team member list UI<br>• Notification polish                                                                                                                                                                                                                                                  | `src/app/(main)/agency/[agencyId]/team/`<br>`src/components/forms/SendInvitation.tsx`<br>`sendInvitation()`                                                                     |
| **Day 9-12**  | Feb 2026     | CRM & Funnels                      | • Agency Analytics Dashboard<br>• Media Management System<br>• Pipeline & Kanban Boards<br>• Ticket & Tag Management<br>• Funnel Management System                                                                                                                                                                                                                                  | `src/app/(main)/agency/`, `subaccount/`<br>Pipeline, Lane, Ticket components                                                                                                    |
| **Day 13-16** | Feb 2026     | Settings & Billing                 | • Subaccount Settings<br>• Contact Management<br>• Razorpay Integration<br>• Open-Access Billing                                                                                                                                                                                                                                                                                    | `src/lib/razorpay/`<br>`billing/`, `contacts/` routes                                                                                                                           |
| **Day 17-19** | Feb 2026     | Infrastructure & Polish            | • Prisma fixes<br>• Funnel expansion & editor routing<br>• Form refactors & DnD fixes                                                                                                                                                                                                                                                                                               | `funnel-step.tsx`, `funnel-page-form.tsx`                                                                                                                                       |
| **Day 20**    | Feb 26, 2026 | Multi-Theme System                 | • 7 CSS themes with `.theme-*` scoping<br>• ThemePicker (dropdown + dark/light toggle)<br>• Flash-free theme restoration via inline script<br>• Deployed to site nav & dashboard InfoBar                                                                                                                                                                                            | `src/app/globals.css`<br>`src/components/global/theme-picker.tsx`<br>`src/app/layout.tsx`                                                                                       |
| **Day 21**    | Feb 27, 2026 | Visual Editor Foundation           | • `EditorProvider` state machine (useReducer + history stack)<br>• 10 typed `EditorAction` variants (add/update/delete, undo/redo, device, modes)<br>• `EditorBtns` type + `defaultStyles` in constants<br>• Editor page bootstrapped with DB fetch + `EditorProvider`<br>• Funnel step card UI polish & Tailwind v4 fixes                                                          | `src/providers/editor/editor-provider.tsx`<br>`src/providers/editor/editor-actions.ts`<br>`src/lib/constants.ts`<br>`editor/[funnelPageId]/page.tsx`                            |
| **Day 22**    | Feb 28, 2026 | Editor Sidebar & Bug Fixes         | • `FunnelEditorSidebar` activated (dual-panel Sheet: 64px icon rail + 320px content panel)<br>• 4-tab icon rail (Settings, Components, Layers, Media) with `previewMode` hiding<br>• `TooltipTrigger asChild` fix — resolved nested `<button>` HTML error in navigation<br>• Tailwind v4 child selector syntax fix in `table.tsx`<br>• `table.tsx` & `sheet.tsx` code style cleanup | `funnel-editor-sidebar/index.tsx`<br>`funnel-editor-sidebar/tabs/index.tsx`<br>`funnel-editor-navigation.tsx`<br>`src/components/ui/table.tsx`<br>`src/components/ui/sheet.tsx` |
| **Day 23-24** | Mar 1, 2026  | Editor Canvas & Media              | • `SettingsTab` expansive styling properties (Typography, Dimensions, Decorations, Flexbox)<br>• `MediaBucketTab` integrated into editor sidebar<br>• `Checkout` component with live Stripe products<br>• `contactForm` component for funnels<br>• Uncached promise bug fixed in media components                                                                                   | `setting-tab.tsx`<br>`media-bucket-tab.tsx`<br>`FunnelEditorComponents/Checkout.tsx`<br>`contactForm.tsx`                                                                       |
| **Day 25**    | Mar 5, 2026  | ContentEditable Fixes & Template   | • `contentEditable` + React children fix in `TextComponent` & `LinkComponent` (suppressContentEditableWarning + dangerouslySetInnerHTML)<br>• `ComponentsTab` activated in editor sidebar for drag-and-drop element palette<br>• Navigation bar padding polish (`py-3`)<br>• Prebuilt landing page JSON template for DB seeding                                                     | `TextComponent.tsx`<br>`LinkComponent.tsx`<br>`funnel-editor-sidebar/index.tsx`<br>`funnel-editor-navigation.tsx`<br>`setting-tab.tsx`                                          |
| **Day 26**    | Mar 5, 2026  | Canvas Drag & Drop System          | • Visual reordering logic via drag and drop using geometry bounding boxes (`getBoundingClientRect`) inside `Container` and `TwoColumns`<br>• Canvas element drag disabled in Live and Preview modes<br>• DOM ID assignment to editor canvas elements for precise drop targeting<br>• `insertIndex` payloads added to `editor-actions`                                               | `editor-provider.tsx`<br>`editor-actions.ts`<br>`Container.tsx`<br>`TwoColumns.tsx`<br>All Canvas Components                                                                    |
| **Day 27**    | Mar 6, 2026  | AI Assistant & Editor Refinements  | • Gemini AI integrated via `/api/generate-text` and `/api/generate-layout` for automated block drafting<br>• UI property sidebar toggle mechanism with Canvas expansion adjustments<br>• History preservation logic adjusted for UI preference persistence                                                                                                                          | `ai-builder-tab.tsx`<br>`editor-provider.tsx`<br>`route.ts` API endpoints                                                                                                       |
| **Day 28**    | Mar 6, 2026  | Component Refinements & AI Context | • Interactive preview state for Slider arrows and raw CSS Hex Code injection for Progress Bars<br>• Enhanced AI block text generation via dynamic context injection based on selected element type<br>• Layout generation engine expanded to support Icon Blocks and Testimonials                                                                                                   | `FunnelEditorComponents/`<br>`api/generate-text/`<br>`api/generate-layout/`                                                                                                     |

### Current Status (Day 28 Complete)

**✅ Implemented:**

- Authentication & authorization
- Agency & subaccount management
- Team invitations & permissions
- Media management
- Notification system
- Dashboard layouts & navigation
- Pipeline/CRM with Kanban boards
- Ticket & Tag management
- Funnel builder with multi-page support
- Contact management
- Razorpay payment & subscriptions
- Multi-theme system (7 themes, light/dark)
- Visual Page Builder (Drag and Drop, Mode switching, History logic, Editor Provider)
- AI Content Generations (Layout Drafting via Gemini)

**⏳ Database Ready, UI Pending:**

- Automation engine

**🔮 Planned:**

- Advanced analytics
- Webhook integrations
- API for external tools

---

## 9. Key Components & Utilities

### 9.1 Critical Server-Side Files

#### `/src/lib/queries.ts` (646 lines) ⭐⭐⭐

**Purpose:** Central hub for all server actions and database operations

**Key Functions:**

| Function                                | Purpose                                                    | Returns                  |
| --------------------------------------- | ---------------------------------------------------------- | ------------------------ |
| `getAuthUserDetails()`                  | Get logged-in user with agency, permissions, notifications | `User \| null`           |
| `initUser(newUser)`                     | Sync Clerk user to database                                | `User`                   |
| `upsertAgency(agency)`                  | Create/update agency with defaults                         | `Agency`                 |
| `updateAgencyDetails()`                 | Partial agency updates                                     | `Agency`                 |
| `deleteAgency(agencyId)`                | Delete agency and cascade                                  | `void`                   |
| `getAgencyDetails(agencyId)`            | Fetch agency with subaccounts                              | `Agency \| null`         |
| `upsertSubAccount(subaccount)`          | Create/update subaccount with pipeline & permissions       | `SubAccount`             |
| `getSubaccountDetails(subaccountId)`    | Fetch subaccount with permissions                          | `SubAccount \| null`     |
| `deleteSubAccount(subaccountId)`        | Delete subaccount and resources                            | `void`                   |
| `getUserPermissions(userId)`            | Get user's permissions list                                | `Permissions[]`          |
| `saveActivityLogsNotification(...)`     | Log activity notification                                  | `Notification`           |
| `sendInvitation(role, email, agencyId)` | Create and email team invite                               | `Invitation`             |
| `verifyAndAcceptInvitation()`           | Auto-accept pending invitations                            | `void`                   |
| `getNotificationAndUser(agencyId)`      | Fetch notifications for InfoBar                            | `NotificationWithUser[]` |
| `createMedia(...)`                      | Save media record                                          | `Media`                  |
| `getMedia(subaccountId)`                | Fetch media files                                          | `Media[]`                |

**Usage Pattern:**

```typescript
// Import and call directly in client components
import { getAuthUserDetails } from "@/lib/queries";

const user = await getAuthUserDetails();
```

#### `/src/proxy.ts` ⭐⭐⭐

**Purpose:** Authentication and routing middleware

**Key Logic:**

- Clerk authentication enforcement
- Public vs. protected route handling
- Agency access verification
- Redirect logic for unauthorized users

**Protected Routes:**

- `/agency/*` - Requires agency access
- `/subaccount/*` - Requires subaccount permissions
- `/api/*` - API authentication (excluding UploadThing)

#### `/prisma/schema.prisma` ⭐⭐⭐

**Purpose:** Database schema definition

**Key Sections:**

- Generator and datasource config
- 23 model definitions
- Enum types (Role, Icon, TriggerTypes, etc.)
- Relations and cascade rules
- Index definitions

**Critical Command:**

```bash
npx prisma migrate dev --name description
```

#### `/src/providers/ModalProvider.tsx` ⭐⭐

**Purpose:** Global modal dialog system

**Features:**

- Context-based modal state
- Reusable across entire app
- Supports custom titles, subtitles, children
- Default and custom action buttons

**Usage:**

```typescript
const { setOpen } = useModal()

setOpen(
  <CustomModal title="Create Subaccount" subheading="Manage your client">
    <SubaccountDetails />
  </CustomModal>
)
```

### 9.2 Key React Components

#### Global Components (`/src/components/global/`)

| Component     | Purpose                                  | Props                                            |
| ------------- | ---------------------------------------- | ------------------------------------------------ |
| `InfoBar`     | Notification center with user context    | `notifications`, `role`, `className`             |
| `CustomModal` | Reusable modal dialog                    | `title`, `subheading`, `children`, `defaultOpen` |
| `FileUpload`  | UploadThing file upload wrapper          | `onChange`, `endpoint`, `value`                  |
| `ThemePicker` | Multi-theme selector + dark/light toggle | None (uses `useTheme` + `localStorage`)          |
| `Loading`     | Loading spinner                          | None                                             |
| `BlurPage`    | Blur background effect                   | `children`                                       |

#### Form Components (`/src/components/forms/`)

| Component           | Purpose                  | Validation                                        |
| ------------------- | ------------------------ | ------------------------------------------------- |
| `AgencyDetails`     | Create/update agency     | Zod schema with logo, name, email, phone, address |
| `UserDetails`       | Manage user permissions  | Zod schema with name, email, role, permissions    |
| `SubaccountDetails` | Create/update subaccount | Zod schema with logo, name, address               |
| `SendInvitation`    | Invite team members      | Zod schema with email, role                       |

**Common Pattern:**

- React Hook Form for state management
- Zod schemas for validation
- Shadcn/UI form primitives
- Sonner toast for feedback
- Server action calls on submit

#### Sidebar Components (`/src/components/sidebar/`)

| Component            | Purpose                    | Context                         |
| -------------------- | -------------------------- | ------------------------------- |
| `Sidebar`            | Main navigation wrapper    | Agency or Subaccount            |
| `MenuOptions`        | Dynamic menu items         | Fetches sidebar options from DB |
| `SubaccountSelector` | Switch between subaccounts | Shows agency's subaccounts      |

**Dynamic Behavior:**

- Renders different options for agency vs. subaccount
- Highlights active route
- Supports custom icons from enum
- User avatar and role display

### 9.3 Utility Files

#### `/src/lib/db.ts`

**Purpose:** Prisma client singleton

**Pattern:**

```typescript
import { db } from "@/lib/db";

const user = await db.user.findUnique({ where: { email } });
```

**Prevents:** Multiple Prisma client instances in development

#### `/src/lib/types.ts`

**Purpose:** Extended TypeScript types

**Key Types:**

- `NotificationWithUser` - Notification with user relation
- `UserWithPermissionsAndSubAccounts` - Full user data
- `AuthUserWithAgencySigebarOptionsSubAccounts` - Auth user complete
- `UsersWithAgencySubAccountPermissionsSidebarOptions` - Team member data
- `GetMediaFiles` - Media with relations
- (Ticket, Contact, Pipeline types as needed)

#### `/src/lib/constants.ts`

**Purpose:** Application constants

**Exports:**

- `pricingCards` - Pricing plan configurations
- `defaultPriceId` - Default pricing tier
- `icons` - Icon mapping for sidebar

#### `/src/lib/utils.ts`

**Purpose:** Helper functions

**Key Functions:**

- `cn()` - Tailwind class name merger (clsx + tailwind-merge)
- Additional utility functions as needed

#### `/src/lib/uploadthing.ts`

**Purpose:** UploadThing configuration

**Exports:**

- `ourFileRouter` - File upload endpoints
- Middleware for authentication
- File size and type restrictions

---

## 10. Development Patterns & Conventions

### 10.1 Code Organization

**Server Logic:**

- ✅ All database operations in `/src/lib/queries.ts`
- ✅ "use server" directive at function level
- ✅ Type-safe with Prisma client
- ❌ No inline database queries in components

**Client Components:**

- ✅ "use client" only when needed (interactivity, hooks, context)
- ✅ Server components by default
- ✅ Import server actions directly
- ❌ No database access in client components

**Form Management:**

- ✅ React Hook Form + Zod for all forms
- ✅ Shadcn/UI form primitives
- ✅ Sonner toast for user feedback
- ❌ No unvalidated form submissions

**State Management:**

- ✅ React Context for minimal global state (Modal, Theme)
- ✅ Server components fetch data directly
- ✅ URL state for navigation
- ❌ No Redux, Zustand, or heavy state libraries

### 10.2 Naming Conventions

**Server Actions:**

```typescript
// Pattern: verb + noun (camelCase)
getAuthUserDetails();
upsertAgency();
sendInvitation();
deleteSubAccount();
saveActivityLogsNotification();
```

**Components:**

```typescript
// PascalCase
UserDetails;
InfoBar;
CustomModal;
SendInvitation;
```

**Files:**

```typescript
// kebab-case
user - details.tsx;
send - invitation.tsx;
agency - details.tsx;
```

**Types:**

```typescript
// PascalCase with context suffix
NotificationWithUser;
UserWithPermissionsAndSubAccounts;
```

**Database Models:**

```typescript
// PascalCase singular
User;
Agency;
SubAccount;
```

### 10.3 Architecture Patterns

#### 1. Server Actions First

**Rule:** All backend operations go through server actions in `queries.ts`

**Benefits:**

- Centralized business logic
- Type safety end-to-end
- Easy testing and debugging
- Clear separation of concerns

**Example:**

```typescript
// ✅ GOOD - queries.ts
"use server"
export async function upsertAgency(agency: Agency) {
  const response = await db.agency.upsert({ ... })
  return response
}

// ✅ GOOD - Component
const response = await upsertAgency(formData)

// ❌ BAD - Component
const response = await db.agency.upsert({ ... }) // Direct DB access
```

#### 2. Automatic Defaults

**Rule:** New entities are seeded with sensible defaults

**Examples:**

- New agency → Default sidebar options
- New subaccount → Default pipeline with 5 lanes
- New subaccount → Creator gets SUBACCOUNT_USER permission
- New user → AGENCY_OWNER or AGENCY_ADMIN role

**Implementation:**

```typescript
// In upsertSubAccount()
if (!subaccount.id) {
  // Create default pipeline
  await db.pipeline.create({
    data: {
      name: "Lead Cycle",
      lanes: {
        create: [
          { name: "Lead", order: 0 },
          { name: "Contacted", order: 1 },
          // ...
        ],
      },
    },
  });
}
```

#### 3. RBAC Enforcement

**Rule:** Check permissions at route and component level

**Route Protection (middleware):**

```typescript
// proxy.ts
if (pathname.includes("/agency") && !user.agencyId) {
  return NextResponse.redirect("/unauthorized");
}
```

**Component Protection:**

```typescript
// In page.tsx
const authUser = await getAuthUserDetails();
if (!authUser || authUser.role !== "AGENCY_OWNER") {
  return redirect("/unauthorized");
}
```

**Permission Checks:**

```typescript
const hasAccess = authUser.Permissions.some(
  (p) => p.subAccountId === params.subaccountId,
);
```

#### 4. Activity Logging

**Rule:** All important actions create notifications

**Pattern:**

```typescript
await saveActivityLogsNotification({
  agencyId,
  description: `${user.name} | created a subaccount | ${subaccount.name}`,
  subaccountId: subaccount.id,
});
```

**Logged Actions:**

- Agency/subaccount created/updated
- User invited/joined
- Permissions changed
- Media uploaded
- (Future: Pipeline/ticket updates)

#### 5. Type Safety

**Rule:** Full TypeScript with strict mode

**Patterns:**

- Prisma-generated types as source of truth
- Extended types in `types.ts` for complex queries
- Zod schemas for runtime validation
- Type inference from server actions

**Example:**

```typescript
// Extended type with relations
export type UserWithPermissionsAndSubAccounts = Prisma.UserGetPayload<{
  include: {
    Permissions: { include: { SubAccount: true } };
    Agency: { include: { SubAccount: true } };
  };
}>;
```

### 10.4 Security Patterns

**Authentication:**

- ✅ Clerk handles all auth flows
- ✅ Middleware protects routes
- ✅ Session verification on server actions

**Authorization:**

- ✅ RBAC via Permissions model
- ✅ Route-level checks
- ✅ Data-level permission verification

**Input Validation:**

- ✅ Zod schemas for all forms
- ✅ Type checking on server actions
- ✅ Sanitization where needed

**Audit Trails:**

- ✅ Activity notifications for critical actions
- ✅ Timestamps on all records
- ✅ User attribution

**Best Practices:**

- Never expose sensitive data in client components
- Validate all inputs server-side
- Check permissions before data access
- Log security-relevant actions

### 10.5 Error Handling

**Server Actions:**

```typescript
try {
  const result = await db.agency.create({ ... })
  return result
} catch (error) {
  console.error('Error creating agency:', error)
  throw new Error('Failed to create agency')
}
```

**Client Components:**

```typescript
try {
  await upsertAgency(data);
  toast.success("Agency created");
  router.push("/agency/dashboard");
} catch (error) {
  toast.error("Failed to create agency");
}
```

**Patterns:**

- Server actions throw errors
- Client catches and shows toast
- Critical errors logged to console
- User-friendly messages in UI

---

## 11. Configuration & Environment

### 11.1 Environment Variables

**Required Variables:**

```bash
# Domain Configuration
NEXT_PUBLIC_DOMAIN=yourdomain.com

# Authentication (Clerk)
# Get from: https://dashboard.clerk.com
CLERK_SECRET_KEY=sk_test_your_key
CLERK_PUBLISHABLE_KEY=pk_test_your_key

# Database (MariaDB/MySQL)
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=stratos
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_URL=mysql://root:root@127.0.0.1:3306/stratos

# File Upload (UploadThing)
# Get from: https://uploadthing.com/dashboard
UPLOADTHING_TOKEN=sk_live_your_key

# Payment Processing (Stripe) - Optional for now
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

**Development Setup:**

1. Copy `.env.example` to `.env`
2. Fill in Clerk credentials
3. Set up local MariaDB/MySQL database
4. Add UploadThing token
5. Run `npx prisma generate && npx prisma migrate dev`

### 11.2 Configuration Files

#### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",
      "img.clerk.com",
      "subdomain",
      "files.stripe.com",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
```

**Key Settings:**

- Image domains for external sources
- React strict mode disabled (for development convenience)

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Key Settings:**

- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- JSX preserve for Next.js

#### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... full Shadcn/UI color system
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

**Key Features:**

- Dark mode support
- Shadcn/UI color system
- Tailwind animations

#### `prisma/schema.prisma`

**See Section 7 for full details**

**Generator:**

```prisma
generator client {
  provider = "prisma-client-js"
}
```

**Datasource:**

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### 11.3 Package Management

**Key Commands:**

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Production build
npm run build

# Run production build
npm run start

# Lint code
npm run lint

# Prisma commands
npx prisma generate              # Regenerate client after schema changes
npx prisma migrate dev           # Create and apply migration
npx prisma migrate dev --name description  # Named migration
npx prisma studio                # Database GUI (localhost:5555)
npx prisma db push               # Push schema without migration (dev only)
npx prisma db seed               # Run seed script (if configured)
```

**Package.json Scripts:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 12. Common Tasks & Critical Paths

### 12.1 Adding a Server Action

**Location:** `/home/manish/codes/work/stratos/src/lib/queries.ts`

**Steps:**

1. Add "use server" directive (already at file level)
2. Define function with TypeScript types
3. Use `db` client for Prisma operations
4. Handle errors with try/catch
5. Return typed data

**Example:**

```typescript
// In queries.ts
"use server";

export async function getSubaccountTeam(subaccountId: string) {
  try {
    const permissions = await db.permissions.findMany({
      where: { subAccountId: subaccountId },
      include: { User: true },
    });
    return permissions;
  } catch (error) {
    console.error("Error fetching subaccount team:", error);
    throw new Error("Failed to fetch team");
  }
}

// In component
import { getSubaccountTeam } from "@/lib/queries";

const team = await getSubaccountTeam(params.subaccountId);
```

### 12.2 Creating a New Form Component

**Location:** `/home/manish/codes/work/stratos/src/components/forms/`

**Steps:**

1. **Create component file** (e.g., `contact-form.tsx`)

2. **Set up form with React Hook Form + Zod:**

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Define Zod schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  // Handle submit
  const onSubmit = async (data: FormData) => {
    try {
      await createContact(data) // Server action
      toast.success('Contact created')
      router.refresh()
    } catch (error) {
      toast.error('Failed to create contact')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields using Shadcn/UI components */}
      </form>
    </Form>
  )
}
```

3. **Add to modal or page:**

```typescript
// In parent component
<CustomModal title="Create Contact">
  <ContactForm />
</CustomModal>
```

### 12.3 Adding a Dashboard Page

**Location:** `/home/manish/codes/work/stratos/src/app/(main)/agency/[agencyId]/` or `/subaccount/[subaccountId]/`

**Steps:**

1. **Create page file** (e.g., `contacts/page.tsx`)

2. **Implement with RBAC:**

```typescript
import { getAuthUserDetails } from '@/lib/queries'
import { redirect } from 'next/navigation'

export default async function ContactsPage({
  params
}: {
  params: { agencyId: string }
}) {
  // Get authenticated user
  const authUser = await getAuthUserDetails()

  // Check permissions
  if (!authUser || !authUser.Agency) {
    return redirect('/unauthorized')
  }

  // Fetch data
  const contacts = await getContacts(params.agencyId)

  // Render UI
  return (
    <div>
      <h1>Contacts</h1>
      {/* Use InfoBar, tables, modals, etc. */}
    </div>
  )
}
```

3. **Add to sidebar navigation:**

```typescript
// Update AgencySidebarOption or SubAccountSidebarOption in database
// Or add to default options in upsertAgency/upsertSubAccount
```

### 12.4 Extending Database Schema

**Location:** `/home/manish/codes/work/stratos/prisma/schema.prisma`

**Steps:**

1. **Modify schema:**

```prisma
model Contact {
  id            String   @id @default(uuid())
  name          String
  email         String
  phone         String?
  company       String?   // NEW FIELD
  createdAt     DateTime @default(now())
  subAccountId  String
  SubAccount    SubAccount @relation(fields: [subAccountId], references: [id], onDelete: Cascade)
}
```

2. **Create migration:**

```bash
npx prisma migrate dev --name add_company_to_contact
```

3. **Regenerate Prisma client:**

```bash
npx prisma generate
```

4. **Update types** (if needed) in `/src/lib/types.ts`:

```typescript
export type ContactWithCompany = Prisma.ContactGetPayload<{
  include: { SubAccount: true };
}>;
```

5. **Update server actions** in `/src/lib/queries.ts`:

```typescript
export async function createContact(data: ContactData) {
  return await db.contact.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company, // Use new field
      subAccountId: data.subAccountId,
    },
  });
}
```

### 12.5 Adding File Upload to a Form

**Steps:**

1. **Import FileUpload component:**

```typescript
import FileUpload from "@/components/global/FileUpload";
```

2. **Add to form schema:**

```typescript
const formSchema = z.object({
  name: z.string(),
  logo: z.string().min(1, "Logo is required"),
});
```

3. **Add to form:**

```typescript
<FormField
  control={form.control}
  name="logo"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Logo</FormLabel>
      <FormControl>
        <FileUpload
          endpoint="agencyLogo"
          value={field.value}
          onChange={field.onChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

4. **Handle in server action:**

```typescript
// Logo URL is already a string from UploadThing
await db.agency.create({
  data: {
    name: data.name,
    agencyLogo: data.logo, // Direct URL
  },
});
```

### 12.6 Adding Activity Notifications

**Location:** After important actions in `/src/lib/queries.ts`

**Pattern:**

```typescript
export async function updateSubAccount(data: SubAccountData) {
  const response = await db.subAccount.update({ ... })

  // Log activity
  await saveActivityLogsNotification({
    agencyId: data.agencyId,
    subaccountId: response.id,
    description: `Updated subaccount | ${response.name}`
  })

  return response
}
```

**Usage in saveActivityLogsNotification:**

```typescript
export async function saveActivityLogsNotification({
  agencyId,
  subaccountId,
  description,
}: {
  agencyId?: string;
  subaccountId?: string;
  description: string;
}) {
  const authUser = await currentUser();

  await db.notification.create({
    data: {
      notification: description,
      agencyId,
      subaccountId,
      userId: authUser?.id,
    },
  });
}
```

### 12.7 Debugging Common Issues

**Issue: Prisma Client Not Found**

```bash
# Solution: Regenerate client
npx prisma generate
```

**Issue: Migration Conflicts**

```bash
# Solution: Reset database (DESTRUCTIVE - dev only)
npx prisma migrate reset
npx prisma migrate dev
```

**Issue: Clerk User Not Syncing**

```bash
# Check: initUser() is called in middleware or on first load
# Verify: CLERK_SECRET_KEY is correct in .env
```

**Issue: File Upload Not Working**

```bash
# Check: UPLOADTHING_TOKEN is set
# Verify: Image domains in next.config.ts
# Check: API route at /api/uploadthing
```

**Issue: Permissions Not Working**

```bash
# Check: Permissions record exists in database
# Verify: User has correct role
# Check: getAuthUserDetails() returns permissions
```

---

## 13. Future Features & Roadmap

**Status:** Database models implemented, UI pending

### 13.1 Pipeline/CRM System

**Database:** ✅ Complete
**UI:** ⏳ Pending

**Features to Build:**

- Kanban board view with drag-and-drop (React DnD or dnd-kit)
- Ticket creation and editing forms
- Contact management interface
- Tag creation and assignment
- Value tracking and reporting
- Team member assignment
- Due date management

**Critical Files to Create:**

- `/src/app/(main)/subaccount/[subaccountId]/pipelines/page.tsx`
- `/src/components/forms/ticket-form.tsx`
- `/src/components/forms/contact-form.tsx`
- `/src/components/pipeline/kanban-board.tsx`

**Server Actions Needed:**

- `getPipelines()`, `createPipeline()`, `updatePipeline()`
- `getLanes()`, `createLane()`, `updateLaneOrder()`
- `getTickets()`, `createTicket()`, `updateTicket()`, `moveTicket()`
- `getContacts()`, `createContact()`, `updateContact()`
- `getTags()`, `createTag()`, `assignTag()`

### 13.2 Funnel Builder

**Database:** ✅ Complete
**UI:** ⏳ Pending

**Features to Build:**

- Visual page builder with drag-and-drop elements
- Template gallery
- Component library (headers, forms, CTAs, etc.)
- CSS class management
- Page preview and publishing
- Funnel analytics
- A/B testing support

**Critical Files to Create:**

- `/src/app/(main)/subaccount/[subaccountId]/funnels/page.tsx`
- `/src/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/page.tsx`
- `/src/components/funnel/page-editor.tsx`
- `/src/components/funnel/element-library.tsx`

**Server Actions Needed:**

- `getFunnels()`, `createFunnel()`, `updateFunnel()`
- `getFunnelPages()`, `createPage()`, `updatePageContent()`
- `publishFunnel()`

**External Libraries to Consider:**

- GrapesJS or similar page builder
- React DnD for drag-and-drop
- Monaco Editor for custom code

### 13.3 Automation Engine

**Database:** ✅ Complete
**UI:** ⏳ Pending

**Features to Build:**

- Visual workflow builder
- Trigger configuration (form submissions, ticket moves, etc.)
- Action chaining (create contact → send email → assign to pipeline)
- Conditional logic
- Automation history and logs
- Active/inactive toggle

**Critical Files to Create:**

- `/src/app/(main)/subaccount/[subaccountId]/automations/page.tsx`
- `/src/components/automation/workflow-builder.tsx`
- `/src/lib/automation-engine.ts` - Execution logic

**Server Actions Needed:**

- `getAutomations()`, `createAutomation()`, `updateAutomation()`
- `getTriggers()`, `createTrigger()`
- `executeAutomation()` - Run automation instances
- `getAutomationHistory()`

**Background Job System:**

- Consider implementing job queue (Bull, BullMQ, or similar)
- Webhook listener for external triggers
- Scheduled task execution

### 13.4 Stripe Billing Integration

**Database:** ✅ Models Ready (`Subscription`, `AddOns`)
**UI:** ⏳ Pending

**Features to Build:**

- Subscription plan selection
- Payment form with Stripe Elements
- Billing history
- Plan upgrade/downgrade
- Add-on marketplace
- Usage tracking

**Critical Files to Create:**

- `/src/app/(main)/agency/[agencyId]/billing/page.tsx`
- `/src/components/billing/plan-selector.tsx`
- `/src/components/billing/payment-form.tsx`
- `/src/lib/stripe.ts` - Stripe API wrapper

**Server Actions Needed:**

- `createSubscription()`, `updateSubscription()`, `cancelSubscription()`
- `addAddon()`, `removeAddon()`
- `getInvoices()`, `downloadInvoice()`

**Stripe Integration:**

- Webhook handling (`/api/stripe/webhook`)
- Subscription status sync
- Invoice.paid event handling
- Customer portal integration

### 13.5 Advanced Analytics Dashboard

**Features to Build:**

- Revenue tracking
- Funnel conversion rates
- Pipeline velocity
- Team performance metrics
- Client activity reports
- Custom date ranges

**Critical Files to Create:**

- `/src/app/(main)/agency/[agencyId]/analytics/page.tsx`
- `/src/components/analytics/revenue-chart.tsx`
- `/src/components/analytics/conversion-funnel.tsx`

**Libraries:**

- Recharts (already installed)
- Tremor (already installed)

### 13.6 Email System

**Features to Build:**

- Email template builder
- SMTP configuration
- Email campaigns
- Automated email sequences
- Email analytics (open rate, click rate)

**Integration Options:**

- Resend
- SendGrid
- AWS SES
- Mailgun

### 13.7 Webhook & API System

**Features to Build:**

- REST API for external tools
- Webhook endpoints for integrations
- API key management
- Rate limiting
- Request logging

**Critical Files to Create:**

- `/src/app/api/v1/` - Public API routes
- `/src/lib/api-auth.ts` - API authentication
- `/src/lib/rate-limiter.ts`

**Integrations to Support:**

- Zapier
- Make (Integromat)
- Custom webhooks

### 13.8 Subdomain Routing (Enhanced)

**Current:** Database field exists
**Future:** Full subdomain-based client access

**Features to Build:**

- DNS configuration guide
- Subdomain verification
- Custom domain support
- SSL certificate management
- Subdomain-based theming

**Implementation:**

- Update `proxy.ts` for subdomain detection
- Create `/src/app/[domain]/` routes
- Fetch subaccount by subdomain
- Apply white-label branding

---

## 14. References

### 14.1 Internal Documentation

| Document                 | Path                                                            | Purpose                        |
| ------------------------ | --------------------------------------------------------------- | ------------------------------ |
| **Master Documentation** | `/home/manish/codes/work/stratos/project_docs/documentation.md` | Comprehensive project guide    |
| **Database Schema**      | `/home/manish/codes/work/stratos/project_docs/tables.md`        | Detailed table definitions     |
| **Day Index**            | `/home/manish/codes/work/stratos/project_docs/dayTitle.md`      | Quick reference to daily logs  |
| **Daily Logs**           | `/home/manish/codes/work/stratos/project_docs/day/`             | Day-by-day development history |
| **Day 1 Log**            | `/home/manish/codes/work/stratos/project_docs/day/day01.md`     | Foundation & authentication    |
| **Day 2 Log**            | `/home/manish/codes/work/stratos/project_docs/day/day02.md`     | Marketing site                 |
| **Day 3 Log**            | `/home/manish/codes/work/stratos/project_docs/day/day03.md`     | Database layer                 |
| **Day 4 Log**            | `/home/manish/codes/work/stratos/project_docs/day/day04.md`     | Agency creation                |
| **Day 5 Log**            | `/home/manish/codes/work/stratos/project_docs/day/day05.md`     | Dashboard layout               |
| **Day 6 Log**            | `/home/manish/codes/work/stratos/project_docs/day/day06.md`     | Settings & users               |
| **Day 7 Log**            | `/home/manish/codes/work/stratos/project_docs/day/day07.md`     | Media & subaccounts            |
| **Day 8 Log**            | `/home/manish/codes/work/stratos/project_docs/day/day08.md`     | Team management                |

### 14.2 Critical Source Files

| File                | Path                                                                | Lines | Description            |
| ------------------- | ------------------------------------------------------------------- | ----- | ---------------------- |
| **Server Actions**  | `/home/manish/codes/work/stratos/src/lib/queries.ts`                | 646   | All backend operations |
| **Middleware**      | `/home/manish/codes/work/stratos/src/proxy.ts`                      | ~150  | Auth & routing         |
| **Database Schema** | `/home/manish/codes/work/stratos/prisma/schema.prisma`              | ~500  | Prisma models          |
| **Modal Provider**  | `/home/manish/codes/work/stratos/src/providers/ModalProvider.tsx`   | ~80   | Global modal state     |
| **Types**           | `/home/manish/codes/work/stratos/src/lib/types.ts`                  | ~100  | Extended types         |
| **Constants**       | `/home/manish/codes/work/stratos/src/lib/constants.ts`              | ~150  | Pricing, icons         |
| **InfoBar**         | `/home/manish/codes/work/stratos/src/components/global/InfoBar.tsx` | ~150  | Notification UI        |
| **Sidebar**         | `/home/manish/codes/work/stratos/src/components/sidebar/index.tsx`  | ~200  | Navigation             |

### 14.3 External Resources

**Framework & Core:**

- [Next.js Documentation](https://nextjs.org/docs) - App Router, Server Actions
- [React Documentation](https://react.dev) - React 19 features
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system

**Database & ORM:**

- [Prisma Documentation](https://prisma.io/docs) - ORM, migrations, queries
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [MariaDB Documentation](https://mariadb.org/documentation/)

**Authentication:**

- [Clerk Documentation](https://clerk.com/docs) - Auth, user management
- [Clerk Next.js Guide](https://clerk.com/docs/quickstarts/nextjs)

**UI & Styling:**

- [Shadcn/UI](https://ui.shadcn.com) - Component library
- [Radix UI](https://www.radix-ui.com/primitives) - Accessible primitives
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility classes

**Forms & Validation:**

- [React Hook Form](https://react-hook-form.com) - Form management
- [Zod Documentation](https://zod.dev) - Schema validation

**Data Tables:**

- [TanStack Table](https://tanstack.com/table/latest) - React Table v8

**File Upload:**

- [UploadThing Documentation](https://docs.uploadthing.com) - File storage

**Icons & UI:**

- [Lucide Icons](https://lucide.dev) - Icon library
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

**Payments:**

- [Stripe Documentation](https://stripe.com/docs) - Payment processing
- [Stripe Next.js Integration](https://stripe.com/docs/stripe-js/react)

**Charts:**

- [Recharts](https://recharts.org/en-US/) - React charts
- [Tremor](https://www.tremor.so/) - Dashboard components

### 14.4 Quick Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # Run linting

# Database
npx prisma generate                      # Regenerate client
npx prisma migrate dev --name <name>    # Create migration
npx prisma studio                        # Database GUI
npx prisma db push                       # Push without migration (dev only)
npx prisma migrate reset                 # Reset database (DESTRUCTIVE)

# Git (if version controlled)
git status               # Check status
git add .                # Stage changes
git commit -m "message"  # Commit
git push                 # Push to remote
```

### 14.5 Related Tools

**Development:**

- VS Code + Prisma extension
- VS Code + Tailwind CSS IntelliSense
- React Developer Tools (browser extension)

**Database Management:**

- Prisma Studio (built-in)
- DBeaver (desktop client)
- phpMyAdmin (web-based)

**API Testing:**

- Postman
- Insomnia
- Thunder Client (VS Code extension)

**Deployment:**

- Vercel (recommended for Next.js)
- Railway (database hosting)
- PlanetScale (MySQL-compatible serverless)

---

## Appendix: Maintenance Notes

### For Claude Code:

- This document is AI-optimized for quick comprehension
- File paths are absolute for easy navigation
- Critical files marked with ⭐ for priority
- Tables provide scannable information
- Section numbers enable quick reference
- Cross-references to existing documentation prevent duplication

### For Human Developers:

- Use this as a comprehensive onboarding guide
- Refer to `/project_docs/` for detailed daily logs
- All server actions are in `/src/lib/queries.ts` - start there
- Database schema is the source of truth
- Follow established patterns for consistency

### Updating This Document:

- Update after major feature additions
- Keep file paths accurate
- Add new server actions to Section 9
- Document new patterns in Section 10
- Update progress timeline in Section 8
- Increment version number at top

**Last Major Update:** Day 8 - Team Management System Complete

---

**End of Documentation**
