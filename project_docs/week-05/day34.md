# Day 34: Razorpay Full Integration & Payment History

## Today's Goal

Wire up the Razorpay payment system end-to-end — from agency plan upgrades with real INR pricing, to webhook-based subscription activation, to a complete payment history table powered by the Razorpay API. Also replace the funnel editor's legacy Stripe-based Checkout component with a Razorpay checkout flow.

## How I Achieved That Goal

### 1. INR Pricing Constants

Updated `src/lib/constants.ts` — replaced USD placeholder prices ($49/$199 Stripe IDs) with proper INR plans:

- **Starter**: Free (no payment required)
- **Basic**: ₹999/month → `plan_basic`
- **Unlimited Saas**: ₹2,999/month → `plan_unlimited_saas`

Added `amountInRupees` field to feed directly into Razorpay order creation without conversion ambiguity.

### 2. Razorpay Webhook Handler — `POST /api/razorpay/webhook`

New route that:

- Verifies the `x-razorpay-signature` header via HMAC-SHA256 (`crypto.createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)`)
- Handles three events: `payment.captured`, `subscription.charged`, `subscription.activated`
- Extracts `agencyId` + `planId` from payment `notes` and calls `db.subscription.upsert()` to activate the plan

### 3. Payment Verification Route — `POST /api/razorpay/verify-payment`

Client-side payment completion handler:

- Validates the Razorpay signature: `HMAC-SHA256(order_id|payment_id, key_secret)`
- On successful verification: upserts the agency `Subscription` record with `active: true`, `plan`, `price`, `currentPeriodEndDate` (now + 30 days)
- Returns HTTP 200 with `{ success: true }` or structured error

### 4. Agency Billing UI — Full Checkout Flow

Rewrote `billing/page.tsx`:

- Parallelly fetches `agencySubscription`, `currentUser`, and `paymentHistory` (via Razorpay API)
- Shows an active plan banner with renewal date if subscription exists
- Passes `agencyId`, `planId`, `userName`, `userEmail` to each `PricingCard`

Rewrote `pricing-card.tsx` with complete Razorpay checkout logic:

1. `loadRazorpay()` — dynamically injects `checkout.js` script
2. `POST /api/razorpay/create-subscription` — creates Razorpay Order
3. `new window.Razorpay(options).open()` — opens checkout modal with INR price, agency branding
4. `handler()` — calls `POST /api/razorpay/verify-payment`
5. `router.refresh()` — refreshes billing page to reflect new active plan
6. Sonner toasts for success/failure/cancel; spinner on `loading` state
7. Active plan highlighted with ring border + "Current Plan" badge

### 5. Funnel Editor — Razorpay Checkout Component

Replaced legacy Stripe-based `Checkout.tsx` (`api/stripe/create-checkout-session` + `clientSecret`) with a Razorpay implementation:

- **Editor mode**: displays a placeholder card with CreditCard icon
- **Live mode**: renders "Pay Securely via Razorpay" button
- On click: loads script → POSTs `/api/razorpay/create-checkout-session` (with `subAccountConnectedId`, `prices`, `subAccountId`) → opens Razorpay modal
- On success: calls `goToNextPage()` to advance to next funnel step

### 6. Full Payment History Table

Added `getAgencyPayments(agencyId)` server action to `razorpay-action.ts`:

- Calls `razorpay.payments.all({ count: 100 })`
- Filters results where `payment.notes.agencyId === agencyId`
- Returns structured objects: `{ id, amount (₹), currency, status, planId, orderId, createdAt, method }`

Updated billing page Payment History section from a single-record view to a full table showing every individual payment with: date/time, plan name, payment method, amount in ₹, and a color-coded status badge (green=captured, red=failed, yellow=other).

### 7. Route Cleanup

Deleted `src/app/api/razorpay/create-customer/` — its only caller in `agency-details.tsx` was already commented out. All remaining routes are actively used.

### 8. Import Path Fixes

Fixed pre-existing broken `generated/prisma` imports (missing `/client` suffix) in:

- `razorpay-action.ts`
- `webhook/route.ts`
- `verify-payment/route.ts`

## Problems Faced

- **Payment History is 1:1**: The `Subscription` model is a single upserted record — not a history table. Solved by querying the Razorpay API directly (`razorpay.payments.all()`) and filtering by `notes.agencyId`.
- **Razorpay Plan enum mismatch**: `constants.ts` previously used Stripe-style `price_xxx` IDs. Updated to match the Prisma `Plan` enum values (`plan_basic`, `plan_unlimited_saas`).
- **CreateSubAccountButton.tsx relative import**: Pre-existing broken path `../../../../../../../generated/prisma` (7-level relative path fails in TS checker). Restored to original; it buildss fine with Turbopack but TS strict mode flags it.

## Key Files

- `src/app/api/razorpay/webhook/route.ts` [NEW]
- `src/app/api/razorpay/verify-payment/route.ts` [NEW]
- `src/app/api/razorpay/create-customer/` [DELETED]
- `src/app/(main)/agency/[agencyId]/billing/page.tsx` [MODIFIED]
- `src/app/(main)/agency/[agencyId]/billing/_component/pricing-card.tsx` [MODIFIED]
- `src/lib/constants.ts` [MODIFIED]
- `src/lib/razorpay/razorpay-action.ts` [MODIFIED]
- `src/app/(main)/subaccount/.../FunnelEditorComponents/Checkout.tsx` [MODIFIED]
