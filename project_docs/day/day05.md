# Day 5: Agency Dashboard, Sidebar & Global Modal System

## Today's Goal
Establish the core structure of the authenticated Agency Dashboard, implement a responsive and dynamic Sidebar navigation system, and create a global Modal provider to handle UI interactions like "Create Subaccount" or "Agency Settings" without leaving the page.

## How I Achieved That Goal
1.  **Agency Dashboard Layout**:
    -   Created the layout wrapper `src/app/(main)/agency/[agencyId]/layout.tsx` for specific agency views.
    -   **Security**: Implemented strict RBAC (Role-Based Access Control) to ensure only `AGENCY_OWNER` or `AGENCY_ADMIN` can access these routes.
    -   **Data Fetching**: Pre-fetches agency notifications and verifies user status before rendering.

2.  **Dynamic Sidebar Navigation**:
    -   Built `src/components/sidebar/index.tsx` as a smart component that adapts based on the context (`agency` vs `subaccount`).
    -   **Logic**:
        -   Fetches the active agency details and user permissions.
        -   Determines the correct logo (handling White-labeling logic).
        -   Filters sidebar options based on the user's access rights.
    -   **Responsiveness**: Designed to work on both Desktop and Mobile (via `MenuOptions`).

3.  **Global Modal System**:
    -   Implemented `src/providers/ModalProvider.tsx` using React Context.
    -   This allows any component in the app to trigger a modal by simply calling `setOpen(<MyComponent />)`, eliminating the need for local state prop-drilling.
    -   Created `src/components/global/custom-modal.tsx` (generic wrapper) to ensure consistent styling for all dialogs.

4.  **Backend Logic Updates**:
    -   Expanded `src/lib/queries.ts`:
        -   `getNotificationAndUser`: Fetches recent activity for the dashboard.
        -   `upsertSubAccount`: Logic to create/update subaccounts with default sidebar options (Launchpad, Funnels, etc.).
        -   `deleteAgency` & `updateAgencyDetails`: Administrative actions.

## Problems Faced
-   **Next.js 15 Params Handling**: The new `Promise`-based `params` and `searchParams` in Next.js 15 caused runtime errors in server components. I had to refactor `src/app/(main)/agency/page.tsx` and the layout to `await` these properties before usage.
-   **Sidebar State Sync**: Ensuring the sidebar stays in sync with the current path and user role required careful filtering of the `SidebarOption` relation.

## Key Files Created/Modified
-   **`src/app/(main)/agency/[agencyId]/layout.tsx`**: The authenticated dashboard shell.
-   **`src/components/sidebar/index.tsx`**: The brain of the navigation system.
-   **`src/providers/ModalProvider.tsx`**: Global state management for popups.
-   **`src/lib/queries.ts`**: Added notification and subaccount management logic.
