# Day 3: Data Layer, Backend Logic & Dashboard

## Today's Goal
Establish the database schema, implement the server-side logic for agency management, and refactor the middleware for final production readiness.

## How I Achieved That Goal
1.  **Database & ORM Setup**:
    -   Designed a comprehensive **Prisma Schema** (`prisma/schema.prisma`) defining core models: `User`, `Agency`, `SubAccount`, `Pipeline`, and their relationships.
    -   Configured the database client (`src/lib/db.ts`) to use the `@prisma/adapter-mariadb` driver for optimized connection pooling and performance with MariaDB.

2.  **Server-Side Logic Implementation**:
    -   Created a library of server actions in `src/lib/queries.ts`.
    -   Implemented `getAuthUserDetails` to securely fetch user data along with their permissions.
    -   Implemented `verifyAndAcceptInvitation` to handle the complex flow of inviting users to agencies and accepting those invites.

3.  **Middleware Refactor**:
    -   Moved and finalized the middleware at `src/proxy.ts` (root level), aligning with Next.js 14+ best practices.
    -   Finalized the logic for rewriting paths based on subdomains (multi-tenancy) and protecting private routes (`/agency`, `/subaccount`).

4.  **Agency Dashboard Integration**:
    -   Connected the `src/app/(main)/agency/page.tsx` page to the backend. It now verifies the user's identity and invitation status before rendering the dashboard, redirecting unauthorized users automatically.

## Problems Faced
-   **Database Connection Latency**: Initial connections to the database via `localhost` were slow due to IPv6 resolution issues. I forced the connection to use `127.0.0.1` in the `PrismaMariaDb` adapter configuration to resolve this DNS lag.
-   **Circular Dependencies**: Refactoring the middleware required careful handling of imports to avoid circular dependencies between the auth service and the route matching logic.

## Key Technical Changes
-   **New Middleware Location**: `src/proxy.ts` is now the single source of truth for routing logic.
-   **Server Actions**: `src/lib/queries.ts` abstracts complex DB operations from the UI components.
-   **Schema Definition**: A robust relational model is now in place to support the SaaS architecture.
