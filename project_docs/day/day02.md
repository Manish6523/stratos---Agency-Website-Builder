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