# Day 7: Media System & Subaccount Management

## Today's Goal
Implement the infrastructure for handling file uploads (Media) and build the full-stack logic for creating and managing Subaccounts (clients), ensuring they are initialized with useful defaults.

## How I Achieved That Goal
1.  **Media Infrastructure (UploadThing)**:
    -   Configured the backend for file handling in `src/app/api/uploadthing/core.ts`.
    -   Defined specific endpoints: `agencyLogo`, `subaccountLogo`, `avatar`, and `media` to categorize uploads.
    -   Integrated authentication middleware to ensure only logged-in users can upload files.

2.  **Subaccount Backend Logic**:
    -   Enhanced `src/lib/queries.ts` with `upsertSubAccount`.
    -   **Smart Initialization**: When a subaccount is created, the system now automatically:
        -   Generates a default set of **Sidebar Options** (Launchpad, Funnels, Media, etc.).
        -   Creates a default **Pipeline** ("Lead Cycle") so the client can start tracking leads immediately.
        -   **Security**: Automatically grants the Agency Owner full `Access` permissions to this new subaccount.

3.  **Subaccount Frontend**:
    -   Built `src/components/forms/subaccount-details.tsx` using `react-hook-form` and `zod`.
    -   Integrated the `FileUpload` component to handle logo uploads directly to the new storage endpoints.
    -   Connected the form to the global `ModalProvider`, allowing it to be used from anywhere in the agency dashboard.

## Problems Faced
-   **Permission Linking**: A new subaccount is technically isolated by default. I had to ensure that the creating user (the Agency Owner) was immediately granted "Access" in the `Permissions` table. Without this, the owner would create a subaccount and then be unable to see it.
-   **Type Safety in File Uploads**: Ensuring the `FileUpload` component passed the correct image URL string back to the form required careful handling of the UploadThing `onClientUploadComplete` callback.

## Key Files Created/Modified
-   **`src/app/api/uploadthing/core.ts`**: The file upload router definitions.
-   **`src/lib/queries.ts`**: Added `upsertSubAccount`, `deleteSubAccount`, and permission logic.
-   **`src/components/forms/subaccount-details.tsx`**: The main form for client management.
