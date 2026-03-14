# Day 36: Subscription Feature Gating — AI & Templates

**Date:** March 14, 2026
**Week:** 05

---

## Today's Goal

Gate the **AI Builder** and **Templates** tabs in the funnel editor sidebar behind a paid subscription (Basic plan and above). Free (Starter) plan users should see an "Upgrade Required" overlay instead of the actual feature content.

---

## How I Achieved That Goal

### 1. New Server Query — `getSubscriptionPlanBySubaccountId()`

- **File:** `src/lib/queries.ts`
- Resolves `SubAccount → Agency → Subscription` chain in a single Prisma query.
- Returns the active plan string (`plan_basic`, `plan_unlimited_saas`) or `null` for free/inactive users.

### 2. Editor Page — Subscription Fetch

- **File:** `src/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/page.tsx`
- Calls `getSubscriptionPlanBySubaccountId(subaccountId)` on the server.
- Computes `isPaidPlan` boolean and passes it down to `<FunnelEditorSidebar>`.

### 3. Sidebar Conditional Rendering

- **File:** `src/app/.../funnel-editor-sidebar/index.tsx`
- Accepts new `isPaidPlan` prop.
- For the **AI** and **Templates** `<TabsContent>`, renders `<UpgradeOverlay>` when `isPaidPlan` is `false`, otherwise renders the normal `<AiBuilderTab>` / `<TemplatesTab>`.

### 4. Upgrade Overlay Component

- **File (NEW):** `src/app/.../funnel-editor-sidebar/tabs/upgrade-overlay.tsx`
- Reusable component accepting a `feature` prop (e.g., "AI Builder", "Templates").
- Displays a lock icon, "Upgrade Required" heading, descriptive message, and an "Upgrade Now" link pointing to `/agency/billing`.

---

## Problems Faced

- No direct query existed to get subscription from a subaccountId; had to traverse the `SubAccount → Agency → Subscription` relationship.
- Pre-existing TypeScript errors (unrelated `generated/prisma` import issues) were present but did not affect the new code.

---

## Key Files Changed

| File                                             | Change                                       |
| ------------------------------------------------ | -------------------------------------------- |
| `src/lib/queries.ts`                             | Added `getSubscriptionPlanBySubaccountId()`  |
| `editor/[funnelPageId]/page.tsx`                 | Fetches plan, passes `isPaidPlan` to sidebar |
| `funnel-editor-sidebar/index.tsx`                | Conditional rendering for AI/Templates tabs  |
| `funnel-editor-sidebar/tabs/upgrade-overlay.tsx` | **[NEW]** Upgrade overlay component          |

---

## Git Commit Message

```
day-36[feat]: Gate AI Builder & Templates behind subscription plan

- Added `getSubscriptionPlanBySubaccountId()` query resolving SubAccount → Agency → Subscription
- Editor page fetches active plan, computes `isPaidPlan`, passes to sidebar
- AI and Templates tabs show upgrade overlay for free (Starter) plan users
- Created reusable `UpgradeOverlay` component with lock icon and billing link
```
