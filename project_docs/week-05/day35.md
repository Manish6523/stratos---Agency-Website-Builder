# Day 35: Dashboard Fixes, Currency Localization & Branding Updates

**Date:** March 13, 2026
**Focus:** Bug fixes, INR currency localization, Razorpay branding alignment

---

## Today's Goal

Resolve multiple console errors on the subaccount dashboard (Decimal serialization, hydration errors), localize all currency references from USD ($) to INR (₹), fix Tailwind dynamic class issues in the funnel chart, and update remaining Stripe references to Razorpay branding.

---

## How I Achieved That Goal

### 1. Prisma Decimal Serialization Fix

**Problem:** Next.js Server Components cannot pass Prisma `Decimal` objects to Client Components — only plain objects are supported.

**Fix:** Updated `getPipelines()` in `queries.ts` to map over the response and convert `ticket.value` from `Decimal` to `Number()` before returning, making the data serializable across the Server→Client boundary.

### 2. HTML Hydration Error Fix

**Problem:** Bare text `"No Data"` was placed directly inside `<TableBody>` (renders as `<tbody>`), which is invalid HTML and caused a hydration mismatch.

**Fix:** Wrapped the text in `<TableRow><TableCell colSpan={4}>` in `subaccount/[subaccountId]/page.tsx`.

### 3. Subaccount Funnel Chart — Tailwind Dynamic Class Fix

**Problem:** `bg-${categoryPayload?.color}` in the tooltip dot was a dynamically constructed Tailwind class. Tailwind purges classes at build time and can't detect dynamically constructed names, so the color dot rendered without color.

**Fix:** Replaced the dynamic class with an inline `style={{ backgroundColor: categoryPayload?.color }}` to use the raw CSS color value from the chart payload at runtime.

**Note:** The `DonutChart` `colors` prop from `@tremor/react` only accepts Tailwind color family names (e.g., `"amber"`, `"stone"`), not CSS custom property names like `"primary"` or `"secondary"`. Using custom property names results in black/invisible chart segments.

### 4. USD → INR Currency Conversion (6 Files)

Converted all currency references from USD ($) to INR (₹) across the application:

| File                  | Changes                                                 |
| --------------------- | ------------------------------------------------------- |
| `subaccount/page.tsx` | `currency = "₹"`, `$0.00` → `₹0.00`                     |
| `agency/page.tsx`     | `currency = "₹"`, `$0.00` → `₹0.00`                     |
| `contacts/page.tsx`   | `Intl.NumberFormat` currency → `INR`, `$0.00` → `₹0.00` |
| `PipelineLane.tsx`    | `Intl.NumberFormat` currency → `INR`                    |
| `PipelineTicket.tsx`  | `Intl.NumberFormat` currency → `INR`                    |
| `pipeline-value.tsx`  | `Closed $` → `Closed ₹`, `Total $` → `Total ₹`          |

`utils.ts` already defaulted to `INR` — no change needed.

### 5. Razorpay Branding Updates

- `CheckoutPlaceholder.tsx`: `stripelogo.png` → `razorpaylogo.png`
- `agency/launchpad/page.tsx`: Stripe logo/text → Razorpay
- `subaccount/launchpad/page.tsx`: Stripe logo/text → Razorpay

### 6. Funnel Page Visit Tracking

Added `db.funnelPage.update()` with `visits: { increment: 1 }` in `[domain]/[path]/page.tsx` to track page visits on live funnel pages.

### 7. Tailwind v4 Syntax Fixes

- `!sticky !top-0` → `sticky! top-0!`
- `xl:!flex-row` → `xl:flex-row!`
- `!rounded-lg` → `rounded-lg!`

---

## Problems Faced

1. **Prisma Decimal type** — Not serializable across Next.js Server→Client boundary. Required explicit `Number()` conversion.
2. **Tremor color system** — `@tremor/react` DonutChart only accepts Tailwind color family names, not CSS custom properties. Custom theme colors like `"primary"` render as black.
3. **Dynamic Tailwind classes** — Build-time purging means interpolated class names (`bg-${variable}`) never make it into the CSS bundle.

---

## Key Files Modified

- `src/lib/queries.ts` — Decimal→Number conversion in `getPipelines()`
- `src/app/(main)/subaccount/[subaccountId]/page.tsx` — Hydration fix, currency, Tailwind v4 syntax
- `src/app/(main)/agency/[agencyId]/page.tsx` — Currency conversion
- `src/app/(main)/subaccount/[subaccountId]/contacts/page.tsx` — Currency conversion
- `src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineLane.tsx` — Currency
- `src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineTicket.tsx` — Currency
- `src/components/global/pipeline-value.tsx` — Currency symbol
- `src/components/global/subaccount-funnel-chart.tsx` — Tooltip color fix
- `src/app/[domain]/[path]/page.tsx` — Visit tracking
- `src/app/(main)/agency/[agencyId]/launchpad/page.tsx` — Razorpay branding
- `src/app/(main)/subaccount/[subaccountId]/launchpad/page.tsx` — Razorpay branding
- `CheckoutPlaceholder.tsx` — Razorpay logo
