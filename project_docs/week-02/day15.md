# Day 15: Razorpay Integration & Subscription System

## Today's Goal
Implement a robust payment and subscription infrastructure using Razorpay, enabling multi-currency support (specifically INR) and replacing/supplementing existing Stripe logic with a more localized solution for Indian agency markets.

## How I Achieved That Goal

### 1. **Razorpay Infrastructure Setup**
   - **Dependency Management**: Integrated the `razorpay` Node.js SDK for server-side operations and implemented a dynamic client-side script loader in `src/lib/razorpay/razorpay-client.ts`.
   - **Environment Configuration**: Established centralized client initialization in `src/lib/razorpay/index.ts` using secure environment variables (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
   - **Type System Expansion**: Added comprehensive Razorpay-specific types in `src/lib/types.ts`, including `ShippingAddress`, `RazorpayCustomer`, and `RazorpayPaymentMetadata`, ensuring type safety across the checkout and webhook flows.

### 2. **Backend Logic & Server Actions** (`src/lib/razorpay/razorpay-action.ts`)
   - **`subscriptionCreate`**: Developed a robust server action to handle the creation and update of agency subscriptions. It intelligently maps Razorpay "Order" or "Subscription" statuses to the internal database state, handling period end dates and plan IDs.
   - **Product & Pricing Queries**:
     - **`getPrices`**: Fetches available plans directly from Razorpay (equivalent to Stripe Prices).
     - **`getCharges`**: Retrieves recent payment history for audit trails and dashboard display.
     - **`getAddOnsProducts`**: Maps internal add-on configurations to Razorpay items for expanded service offerings.
   - **Multi-Tenancy Support**: Implemented `getConnectAccountProducts` to prepare for future agency-level payment routing (Route/Linked Accounts).

### 3. **API & Webhook Infrastructure**
   - Developed a suite of API routes in `src/app/api/razorpay/`:
     - **`create-customer`**: Logic for syncing system users with Razorpay customer profiles.
     - **`create-subscription`**: Endpoint for initializing subscription flows.
     - **`create-checkout-session`**: Prepares the data required for the frontend Razorpay checkout modal.

### 4. **Schema & Config Updates**
   - **Prisma Schema**: Refactored the `Plan` enum in `prisma/schema.prisma` to use semantic IDs (`plan_unlimited_saas`, `plan_basic`) that align with Razorpay's plan structure, ensuring easier management and readability.
   - **Pricing Configuration**: Updated `src/config/pricing.ts` to reflect INR values (₹19,900/month for Unlimited SaaS, ₹4,900/month for Basic) and mapped them to the new Plan IDs.

### 5. **Core Utilities & Logging**
   - **Enhanced `utils.ts`**:
     - Standardized the `cn` utility for Tailwind class merging.
     - Implemented a centralized `logger` function to provide consistent debugging and error tracking across server-side operations.

## Problems Faced
- **Stripe vs. Razorpay Paradigm Shift**: Mapping Stripe's "Checkout Sessions" to Razorpay's "Order/Subscription" model required careful handling of the frontend modal lifecycle and backend validation to ensure consistency in user status.
- **Decimal Serialization (Revisited)**: Ensured that price values fetched from Razorpay (typically in paise/cents) are correctly converted to major currency units for storage and display without losing precision.
- **Webhook Signature Validation**: Implementing secure signature verification for Razorpay events to prevent unauthorized database updates (logic implemented in API routes).

## Key Files Created/Modified
### Created:
- **`src/lib/razorpay/index.ts`**: Client initialization.
- **`src/lib/razorpay/razorpay-action.ts`**: Server actions for subscriptions.
- **`src/lib/razorpay/razorpay-client.ts`**: Client script loader.
- **`src/app/api/razorpay/`**: API route group for payments.

### Modified:
- **`prisma/schema.prisma`**: Plan enum refactoring.
- **`src/lib/types.ts`**: Payment type definitions.
- **`src/lib/utils.ts`**: Core utility and logger additions.
- **`package.json`**: New `razorpay` dependency.
- **`src/config/pricing.ts`**: Updated pricing and plan IDs.

## Next Steps
- Implement Razorpay Webhook handlers for real-time subscription status syncing.
- Build the frontend checkout modal integration in the Agency Billing page.
- Add support for one-time payments for specific add-ons or credits.
