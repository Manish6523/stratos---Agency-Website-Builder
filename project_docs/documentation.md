# Stratos Project Documentation

**Project Name:** Stratos
**Date:** Sunday, February 8, 2026
**Version:** 0.4.0 (Alpha)

---

## 1. Project Overview

Stratos is a comprehensive **SaaS (Software as a Service) platform** designed for agencies. It provides a multi-tenant architecture allowing agencies to manage sub-accounts, pipelines, and funnels efficiently. The application is built with a focus on performance, scalability, and a modern user experience.

### Key Features

- **Multi-Tenancy**: Built-in subdomain support (e.g., `agency.app.com`) for distinct workspaces.
- **Robust Authentication**: Secure user management via Clerk, integrated deeply with the database.
- **Agency Dashboard**: Centralized control center for managing team members, permissions, and metrics.
- **Subaccount Management**: Complete isolation and management for agency clients.
- **Media Management**: Integrated file system for handling assets like logos and project media.
- **Visual Page Building**: (Planned) Tools for building funnels and agency pages.

---

## 2. Technical Architecture

### Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: MariaDB (via Prisma ORM)
- **Styling**: Tailwind CSS & Shadcn/UI
- **Authentication**: Clerk
- **File Storage**: UploadThing

### Folder Structure Overview

The project follows a modular structure to separate concerns between the marketing site, the main application logic, and shared utilities.

```
src/
├── app/                  # Next.js App Router Pages & Layouts
│   ├── (main)/           # Authenticated application routes
│   │   ├── agency/       # Agency dashboard & logic
│   │   └── subaccount/   # Subaccount specific dashboard & logic
│   ├── site/             # Public marketing website
│   ├── api/              # API Routes (UploadThing, etc.)
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

-   **Endpoints**: Dedicated endpoints for `agencyLogo`, `subaccountLogo`, `avatar`, and generic `media`.
-   **Security**: All upload routes are protected by a middleware that authenticates the user before processing files.

### Global State (`src/providers/ModalProvider.tsx`)

A React Context provider that manages the application's modal system. It allows any component to trigger a popup (with data fetching capabilities) without complex prop drilling, ensuring a seamless UI experience.

### Server Actions (`src/lib/queries.ts`)

Encapsulated backend logic for security and reusability.

-   **`getAuthUserDetails()`**: Retrieves the currently logged-in user's profile from the database, expanding their relations (Agency, SidebarOptions).
-   **`verifyAndAcceptInvitation()`**: Critical logic that runs when a user logs in. It checks if they have a pending invitation to an agency and links them automatically if they do.
-   **`upsertAgency()`**: Handles the creation and update of Agency details, automatically generating default sidebar options and linking the owner.
-   **`upsertSubAccount()`**: Creates/Updates subaccounts. It intelligently initializes the subaccount with default Sidebar Options, a "Lead Cycle" pipeline, and grants access to the Agency Owner.
-   **`saveActivityLogsNotification()`**: Centralized logging function that records user actions (e.g., "Updated Subaccount") to the Notification table for audit trails.
-   **`initUser()`**: Syncs the Clerk user with the local database and persists roles.

### Database Client (`src/lib/db.ts`)

Initializes the Prisma Client.

-   **Optimization**: Uses `@prisma/adapter-mariadb` for efficient connection handling.
-   **Performance**: Configured to use `127.0.0.1` to bypass local DNS resolution delays common with `localhost`.

---

## 5. Development Progress

The development is tracked in daily logs located in `project_docs/day/`.

-   **Day 1**: Established the foundation, authentication, and design system.
-   **Day 2**: Built the public marketing site and implemented complex routing.
-   **Day 3**: Integrated the database, implemented core backend logic, and connected the dashboard.
-   **Day 4**: Implemented Agency creation, role-based routing, and default system setup.
-   **Day 5**: Established the authenticated Dashboard layout, dynamic Sidebar navigation, and a global Modal system.
-   **Day 6**: Implemented the Agency Settings page, User Details management (including permissions), and the global InfoBar with notifications.
-   **Day 7**: Implemented the Media/File Upload infrastructure (UploadThing) and the Subaccount creation/management logic with automated default setup.

---

## 6. How to Use This Documentation

-   **For Codebase Navigation**: Refer to the "Technical Architecture" section to understand where specific logic resides.
-   **For Database Understanding**: Check `prisma/schema.prisma` or `project_docs/tables.md`.
-   **For Daily Progress**: See the individual logs in `project_docs/day/` for a breakdown of "Goals vs. Achievements".