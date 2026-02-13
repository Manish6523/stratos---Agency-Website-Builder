# Day 4: Agency Creation & Management Logic

## Today's Goal
Implement the core functionality for creating and managing agencies. This includes building the backend logic to handle agency upserts (create/update), managing user roles, and setting up the initial dashboard environment with default sidebar options.

## How I Achieved That Goal
1.  **Agency Creation Logic (`upsertAgency`)**:
    -   Implemented a robust server action in `src/lib/queries.ts` to handle Agency creation and updates.
    -   **Validation**: Added strict server-side validation for required fields (Name, Logo, Phone, Address, etc.).
    -   **Defaults**: Automatically generates default **Sidebar Options** (Dashboard, Launchpad, Billing, Team, etc.) when a new agency is created, ensuring immediate utility for the user.
    -   **Relation Linking**: Connects the creating user to the agency automatically.

2.  **Dashboard Routing & Access Control**:
    -   Overhauled `src/app/(main)/agency/page.tsx` to act as a smart traffic controller.
    -   **Role-Based Redirects**:
        -   `AGENCY_OWNER/ADMIN` -> Redirects to their specific Agency Dashboard or Billing page.
        -   `SUBACCOUNT_USER` -> Redirects to the Subaccount view.
        -   **New Users** -> Renders the `<AgencyDetails />` form to prompt agency creation.
    -   **Stripe Integration Prep**: Added logic to handle `plan`, `state`, and `code` search params for future billing flows.

3.  **User & System Utilities**:
    -   **`initUser`**: Added logic to sync Clerk users with the local database, ensuring roles are persisted in Clerk's `privateMetadata`.
    -   **Icon System**: defined a centralized `icons` array in `src/lib/constants.ts` to map UI selections to icon components (used in sidebar configuration).
    -   **Notifications**: Integrated `sonner` via `src/app/layout.tsx` for global toast notifications.

## Problems Faced
-   **Prisma Client Type Conflicts**: I had to switch the generator provider from `prisma-client-js` to `prisma-client` in `schema.prisma` to resolve some generation inconsistencies with the custom output path.
-   **Next.js Image Security**: The strict `remotePatterns` in `next.config.ts` blocked the new file upload domains (`utfs.io`, `uploadthing.com`). I had to explicitly whitelist these to allow user-uploaded logos to render.

## Key Files Created/Modified
-   **`src/lib/queries.ts`**: The heavy lifting for DB operations (`upsertAgency`, `initUser`).
-   **`src/app/(main)/agency/page.tsx`**: The main entry point logic for the Agency portal.
-   **`src/lib/constants.ts`**: Added the Icon mapping registry.
-   **`next.config.ts`**: Updated security rules for remote images.
