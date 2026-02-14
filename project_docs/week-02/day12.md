# Day 12: Funnel Management System & Code Polish

## Today's Goal
Implement a complete Funnel Management system for creating marketing funnels with customizable pages and subdomains, plus perform code quality improvements and bug fixes across the application.

## How I Achieved That Goal

### 1. **Funnel Management Backend** (`src/lib/queries.ts`)
   Added comprehensive server actions for funnel and funnel page CRUD:

   #### Funnel Queries:
   - **`getFunnel(funnelId: string)`**:
     - Fetches a single funnel by ID.
     - Includes all FunnelPages ordered by `order` field (ascending).
   - **`getFunnels(subaccountId: string)`**:
     - Retrieves all funnels for a subaccount.
     - Includes nested FunnelPages for each funnel.
   - **`upsertFunnel(subaccountId: string, funnel: z.infer<typeof FunnelFormSchema> & { liveProducts: string }, funnelId: string)`**:
     - Creates or updates a funnel with zod-validated data.
     - Accepts `liveProducts` as a JSON string for Stripe product integration.
     - Auto-generates `funnelId` using `v4()` if creating new.
     - Links funnel to subaccount via `subAccountId`.
   - **`getDomainContent(subDomainName: string)`**:
     - Fetches funnel by custom subdomain name.
     - Used for public funnel page rendering (e.g., `mycompany.yourdomain.com`).
     - Includes all FunnelPages for server-side rendering.

   #### Funnel Page Queries:
   - **`upsertFunnelPage(subaccountId: string, funnelPage: UpsertFunnelPage, funnelId: string)`**:
     - Creates or updates a single funnel page.
     - **Default Content**: If no content provided, creates a blank page with:
       ```json
       [{
         "content": [],
         "id": "__body",
         "name": "Body",
         "styles": { "backgroundColor": "white" },
         "type": "__body"
       }]
       ```
     - This prepares pages for a drag-and-drop page builder (future feature).
     - Calls `revalidatePath()` to update Next.js cache after changes.
   - **`deleteFunnelPage(funnelPageId: string)`**: Permanently removes a funnel page.
   - **`getFunnelPageDetails(funnelPageId: string)`**: Fetches a single funnel page by ID (used for page builder).

### 2. **Funnel Form Component** (`src/components/forms/funnel-form.tsx`)
   A comprehensive form for creating/editing marketing funnels:

   #### **Form Fields**:
   - **Funnel Name** (required): Text input with min 1 character validation.
   - **Description**: Textarea for funnel purpose/description.
   - **Sub Domain Name** (optional): Custom subdomain for public funnel access (e.g., "promo" -> `promo.yourdomain.com`).
   - **Favicon** (optional): File upload for funnel-specific favicon using `FileUpload` component.

   #### **Zod Schema** (`FunnelFormSchema`):
   ```typescript
   z.object({
     name: z.string().min(1),
     description: z.string(),
     subDomainName: z.string().optional(),
     favicon: z.string().optional(),
   })
   ```

   #### **Submission Logic**:
   - Merges form values with `liveProducts` (defaults to empty array JSON if creating new).
   - Generates new `funnelId` via `v4()` if not editing.
   - Calls `upsertFunnel()` with all data.
   - Logs activity: "Update funnel | {name}".
   - Shows success/error toast notifications.
   - Closes modal and refreshes router on success.

   #### **Edit Mode**:
   - Pre-fills all fields with `defaultData` values.
   - Uses `useEffect` to reset form when `defaultData` changes.
   - Preserves existing `liveProducts` array when updating.

### 3. **Type System Updates** (`src/lib/types.ts`)
   - **Activated Funnel Types**:
     - `FunnelsForSubAccount`: Full funnel data with nested pages from `getFunnels()`.
     - `UpsertFunnelPage`: Type for funnel page creation/update operations.
   - **Changed to Type-Only Imports**:
     - Converted import statements to `import type` for better tree-shaking:
       ```typescript
       import type { Contact, Lane, Notification, ... } from "../../generated/prisma"
       import type { _getTicketsWithAllRelations, getAuthUserDetails, ... } from "./queries"
       ```
     - This prevents importing actual query functions into type-only contexts, reducing bundle size.

### 4. **Code Quality Improvements**

   #### **Fixed Typo in Loading Component**:
   - **Problem**: File was named `loaging-page.tsx` (typo: "loaging" instead of "loading").
   - **Solution**:
     - Deleted `src/components/global/loaging-page.tsx`.
     - Created proper `src/components/global/loading-page.tsx` (assumed to exist from Day 9).
     - Updated imports in:
       - `src/app/(main)/agency/loading.tsx`
       - `src/app/(main)/subaccount/loading.tsx`
     - Changed from:
       ```typescript
       import LoadingPage from "@/components/global/loaging-page";
       ```
     - To:
       ```typescript
       import LoadingPage from "@/components/global/loading-page";
       ```

   #### **Media Card UI Enhancement** (`src/components/media/media-card.tsx`):
   - **Changed Aspect Ratio**: From `aspect-square` to `aspect-video` (16:9).
   - **Reasoning**: Most uploaded images/thumbnails are landscape-oriented (screenshots, banners, photos).
   - **Impact**: Better utilization of space and improved visual hierarchy in media grid.

   #### **TypeScript Type Safety**:
   - Changed type imports to `import type` syntax throughout `types.ts`.
   - This prevents accidental runtime imports of query functions in type-only files.
   - Improves bundle splitting and reduces circular dependency risks.

### 5. **Funnel Use Cases & Architecture**

   #### **Purpose**:
   Funnels are marketing/sales conversion paths, typically consisting of multiple pages:
   - Landing Page (entry point)
   - Product/Service Details
   - Pricing Page
   - Checkout/Contact Form
   - Thank You Page

   #### **Subdomain System**:
   - Each funnel can have a custom `subDomainName`.
   - Enables white-label marketing campaigns (e.g., `campaign1.youragency.com`, `blackfriday.clientdomain.com`).
   - `getDomainContent()` query powers subdomain routing for public access.

   #### **Page Content Storage**:
   - `content` field stores JSON array of page elements.
   - Default structure (`__body` element) prepares for future drag-and-drop page builder.
   - Will eventually support components like:
     - Text blocks
     - Images
     - Videos
     - Forms
     - Call-to-action buttons

   #### **Live Products Integration**:
   - `liveProducts` field stores JSON array of Stripe product IDs.
   - Enables direct product sales within funnels.
   - Future integration: Checkout buttons link to Stripe payment flows.

### 6. **Revalidation Strategy**
   - Added `revalidatePath()` in `upsertFunnelPage()`:
     ```typescript
     revalidatePath(`/subaccount/${subaccountId}/funnels/${funnelId}`, "page");
     ```
   - Ensures Next.js 15 cache is updated immediately after funnel page changes.
   - Prevents stale data when users navigate between funnel pages.

## Problems Faced
- **Typo Discovery**: The `loaging-page.tsx` typo went unnoticed until Day 12. This highlights the importance of spell-checking component names early. No runtime errors occurred because imports were also misspelled consistently.
- **Funnel Content Structure**: Deciding on the JSON schema for page content required planning for future page builder features. Settled on a flexible array structure that can accommodate nested components.
- **Type Import Confusion**: Initially mixed runtime and type-only imports in `types.ts`, causing TypeScript to warn about circular dependencies. Fixed by converting to `import type` syntax.
- **Revalidation Path**: Needed to determine the correct path pattern for `revalidatePath()`. Used `"page"` type to target specific route pages without invalidating entire layout.

## Key Files Created
### Forms:
- **`src/components/forms/funnel-form.tsx`**: Funnel creation/edit form with subdomain and favicon support.

### Modified:
- **`src/lib/queries.ts`**: Added 6 new funnel-related functions:
  - `getFunnel`, `getFunnels`, `upsertFunnel`, `getDomainContent`
  - `upsertFunnelPage`, `deleteFunnelPage`, `getFunnelPageDetails`
- **`src/lib/types.ts`**:
  - Activated `FunnelsForSubAccount`, `UpsertFunnelPage`.
  - Changed to `import type` for better tree-shaking.
  - Fixed type imports from queries.
- **`src/app/(main)/agency/loading.tsx`**: Fixed import path from `loaging-page` to `loading-page`.
- **`src/app/(main)/subaccount/loading.tsx`**: Fixed import path from `loaging-page` to `loading-page`.
- **`src/components/media/media-card.tsx`**: Changed aspect ratio from `aspect-square` to `aspect-video`.
- **`src/components/global/loaging-page.tsx`**: Deleted (typo file).

## Architecture Insights
### Funnel System Design:
```
Funnel (Sales/Marketing Campaign)
├── Metadata (name, description, subdomain, favicon)
├── liveProducts[] (Stripe product IDs for checkout)
└── FunnelPages[] (ordered sequence)
    ├── Page 1: Landing
    ├── Page 2: Details
    ├── Page 3: Pricing
    └── Page 4: Thank You

Each FunnelPage:
├── name, pathName, order
├── visits (analytics tracking)
└── content (JSON page builder structure)
    └── [{ id, type, name, styles, content[] }]
```

### Future Enhancements (Implied by Structure):
- Drag-and-drop page builder (content JSON is ready).
- A/B testing (multiple funnel variants).
- Analytics dashboard (visits field exists).
- Stripe checkout integration (liveProducts field exists).
- Custom domain mapping (subdomain system in place).

## Next Steps
- Build the visual page builder for funnel pages.
- Implement funnel analytics tracking (page views, conversion rates).
- Add Stripe product integration for e-commerce funnels.
- Create funnel templates (pre-built page structures).
- Implement A/B testing for funnel optimization.
