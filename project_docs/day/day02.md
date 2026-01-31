# Day 2 Log

## Summary of Changes

-   **Site Structure**: Created the main public-facing site structure with a new home page (`src/app/site/page.tsx`) and a corresponding layout.
-   **Navigation**: A global navigation component was built, featuring the logo, links, login button, Clerk's `UserButton` (which appears after authentication), and a theme-switching toggle.
-   **Content**: The new home page was populated with a hero section for "Stratos" and a pricing card section. The data for the pricing cards is sourced from `src/lib/constants.ts`.

## Key Files Established

-   **`src/app/site/layout.tsx`**: The layout for the main marketing site, which includes the global `<Navigation />` component.
-   **`src/app/site/page.tsx`**: The new home page for the project. It features a large hero section and a section that dynamically renders pricing cards from the `pricingCards` constant.
-   **`src/components/site/navigation/index.tsx`**: The site's main navigation bar.
-   **`src/components/global/mode-toggle.tsx`**: A client component that allows users to switch between light, dark, and system themes.
-   **`src/lib/constants.ts`**: This file exports the `pricingCards` array, which holds the data for the different pricing tiers shown on the home page.

---

## Day 2 Update

### Summary of Changes

-   **Theming Overhaul**: A new, vibrant custom theme was implemented in `src/app/globals.css` using `oklch` for a more modern color palette. The default font has been set to `Oxanium`. The previous theme's variables have been commented out but retained for reference.
-   **Authentication Refactoring**: The `ClerkProvider` was moved from the root layout (`src/app/layout.tsx`) to the site-specific layout (`src/app/site/layout.tsx`). This modularizes the authentication context to be specific to the public-facing site.
-   **Advanced Routing and Multi-tenancy**: The middleware in `src/app/proxy.ts` has been significantly enhanced. It now includes logic to handle custom subdomains for multi-tenancy, rewriting requests to the appropriate context. It also contains improved redirect handling for sign-in/sign-up pages and protects new application routes like `/subaccount`.

### Files Modified

-   **`src/app/globals.css`**: Replaced the existing theme with a new custom `oklch`-based theme and new fonts.
-   **`src/app/layout.tsx`**: Removed the `ClerkProvider` and updated the primary font to align with the new theme.
-   **`src/app/proxy.ts`**: Updated Clerk middleware to support multi-tenancy via subdomains and refined authentication/redirect logic.
-   **`src/app/site/layout.tsx`**: Added the `ClerkProvider` to specifically wrap the marketing/public site, now with Clerk's dark theme enabled by default.
