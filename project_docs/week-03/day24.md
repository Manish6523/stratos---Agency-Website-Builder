# Day 24: Funnel Components (Checkout & Contact Form)

## Today's Goal

Develop dynamic elements for the funnel canvas builder, integrating Stripe payments and contact ingestion.

## How I Achieved That Goal

- **Checkout Component (`Checkout.tsx`)**: Created an advanced editor element that automatically fetches live Stripe products (`liveProducts`) associated with the active funnel pipeline. Leveraged `getSubaccountDetails` to retrieve the connected Stripe Account ID and dynamically generate a `clientSecret` for the Stripe Elements provider.
- **Contact Form Component (`contactForm.tsx`)**: Implemented an embedded form to collect subaccount leads directly from deployed funnel pages.
- **Type/Prisma Fixes**: Fixed imports for `Plan` from the regenerated Prisma client to ensure type stability across the agency and subaccount pages.

## Problems Faced

- **Stripe Session Creation**: Establishing the checkout session required a careful orchestration of `useEffect` hooks across `funnelId`, `subaccountId`, and Stripe API dependencies to ensure the `clientSecret` initializes only when the required accounts are fully loaded.

## Key Files

- `src/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/FunnelEditorComponents/Checkout.tsx`
- `src/components/forms/contactForm.tsx`
