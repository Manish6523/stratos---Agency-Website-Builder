# Stratos Project Documentation

**Project Name:** Stratos
**Date:** Monday, February 2, 2026
**Version:** 0.3.0 (Alpha)

---

## 1. Project Overview

Stratos is a comprehensive **SaaS (Software as a Service) platform** designed for agencies. It provides a multi-tenant architecture allowing agencies to manage sub-accounts, pipelines, and funnels efficiently. The application is built with a focus on performance, scalability, and a modern user experience.

### Key Features
-   **Multi-Tenancy**: Built-in subdomain support (e.g., `agency.app.com`) for distinct workspaces.
-   **Robust Authentication**: Secure user management via Clerk, integrated deeply with the database.
-   **Agency Dashboard**: Centralized control center for managing team members, permissions, and metrics.
-   **Visual Page Building**: (Planned) Tools for building funnels and agency pages.

---

## 2. Technical Architecture

### Tech Stack
-   **Framework**: Next.js 15+ (App Router)
-   **Language**: TypeScript
-   **Database**: MariaDB (via Prisma ORM)
-   **Styling**: Tailwind CSS & Shadcn/UI
-   **Authentication**: Clerk

### Folder Structure Overview

The project follows a modular structure to separate concerns between the marketing site, the main application logic, and shared utilities.

```
src/
├── app/                  # Next.js App Router Pages & Layouts
│   ├── (main)/           # Authenticated application routes
│   │   └── agency/       # Agency dashboard & logic
│   ├── site/             # Public marketing website
│   └── [domain]/         # Dynamic route for custom subdomains
├── components/           # Reusable UI components
│   ├── global/           # App-wide components (e.g., ModeToggle)
│   ├── site/             # Components specific to the marketing site
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
-   **User**: Represents a system user. Can belong to an Agency and have permissions for multiple SubAccounts.
-   **Agency**: The top-level entity. Contains business details, subscription info, and owns SubAccounts.
-   **SubAccount**: A child entity of an Agency. Used for organizing specific clients or business units.
-   **Permissions**: Controls user access levels (Access/No Access) for specific SubAccounts.

*(See `project_docs/tables.md` for the full field-level breakdown)*

---

## 4. Key Components & Logic

### Middleware (`src/proxy.ts`)
The application's "traffic controller". It handles:
1.  **Public Route Exemption**: Allowing access to the landing page and API endpoints without login.
2.  **Subdomain Rewriting**: Detecting if a user visits `subdomain.domain.com` and rewriting the request to the dynamic `/[domain]` route.
3.  **Auth Protection**: Redirecting unauthenticated users trying to access `/agency` or `/subaccount`.

### Server Actions (`src/lib/queries.ts`)
Encapsulated backend logic for security and reusability.
-   **`getAuthUserDetails()`**: Retrieves the currently logged-in user's profile from the database, expanding their relations (Agency, SidebarOptions).
-   **`verifyAndAcceptInvitation()`**: Critical logic that runs when a user logs in. It checks if they have a pending invitation to an agency and links them automatically if they do.

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

---

## 6. How to Use This Documentation

-   **For Codebase Navigation**: Refer to the "Technical Architecture" section to understand where specific logic resides.
-   **For Database Understanding**: Check `prisma/schema.prisma` or `project_docs/tables.md`.
-   **For Daily Progress**: See the individual logs in `project_docs/day/` for a breakdown of "Goals vs. Achievements".
