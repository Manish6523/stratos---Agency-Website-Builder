# Project Documentation

**Last Updated:** Sunday, February 1, 2026

This document provides a detailed overview of the files within the Stratos project. Its purpose is to serve as a central knowledge base for understanding the codebase.

---

---

## Database Schema (Prisma)

This section details the database schema defined using Prisma ORM.

- **`prisma/schema.prisma`**: Defines the application's database schema using Prisma Schema Language. It includes various models such as `User`, `Agency`, `SubAccount`, `Pipeline`, `Funnel`, and their relationships, as well as enums for roles, icons, and status. The database provider is set to MySQL.

---

## Project Source Code

### `src/app/` (App Router)

The core application logic and UI, structured using the Next.js App Router.

#### `src/app/globals.css`
- **Description:** Defines the base styles for the application. It imports Tailwind CSS and defines an extensive set of CSS variables for both light and dark themes, used by `shadcn/ui`.

#### `src/app/layout.tsx`
- **Description:** The root layout for the entire application. It wraps all pages with the `ClerkProvider` for authentication context and the `ThemeProvider` to manage light/dark modes. It also applies the global `DM_Sans` font.

#### `src/app/(main)/layout.tsx`
- **Description:** This layout wraps the main application routes, providing a consistent structure and integrating `ClerkProvider` for authentication with the `dark` theme.

#### `src/app/page.tsx`
- **Description:** This file serves as the initial landing page or root page of the application, often used for routing to the main site or other entry points.

#### `src/app/proxy.ts`
- **Description:** Implements Clerk middleware. It defines public routes (`/site`, `/api/uploadthing`) and protects all other routes by redirecting unauthenticated users to the sign-in page.

#### `src/app/site/layout.tsx`
- **Description:** The main layout for the public-facing site. It integrates `ClerkProvider` for authentication and renders the global `Navigation` component above the page content.

#### `src/app/site/page.tsx`
- **Description:** The primary home page for the marketing site. It features a hero section with the 'Stratos' branding, a pricing cards section displaying subscription options from `pricingCards`, and utilizes `next-themes` for theme switching.

#### `src/app/[domain]/page.tsx`
- **Description:** This dynamic page handles requests for custom domains, serving as an entry point for domain-specific content or sub-accounts.

#### `src/app/(main)/agency/(auth)/layout.tsx`
- **Description:** A simple layout component that centers its children on the page. It's used to provide a consistent, centered view for the authentication forms (sign-in and sign-up).

#### `src/app/(main)/agency/(auth)/sign-in/[[...sign-in]]/page.tsx`
- **Description:** This page renders the Clerk sign-in component (`<SignIn />`). The `[[...sign-in]]` folder structure is a catch-all route required by Clerk to handle its authentication flow correctly.

#### `src/app/(main)/agency/(auth)/sign-up/[[...sign-up]]/page.tsx`
- **Description:** This page renders the Clerk sign-up component (`<SignUp />`). The `[[...sign-up]]` folder structure is a catch-all route required by Clerk to handle its authentication flow correctly.

#### `src/app/(main)/agency/page.tsx`
- **Description:** This file defines the main page component for the agency dashboard. It serves as an entry point for agency-specific functionalities.


### `src/components/`

Reusable UI components used throughout the application.

#### `src/components/global/mode-toggle.tsx`
- **Description:** A client component that uses the `next-themes` library to provide a dropdown menu (Sun/Moon icon) for switching between light, dark, and system color schemes.

#### `src/components/site/navigation/index.tsx`
- **Description:** The main navigation bar for the public site. It features the Stratos logo, navigation links, a login button, the Clerk `UserButton` for user authentication, and the `ModeToggle` component for theme switching.

#### `src/components/ui/` (shadcn/ui)
- **Description:** Contains UI components from `shadcn/ui`. As per `ignore.md`, I will not be reading or documenting the individual files within this directory.

### `src/hooks/`

#### `src/hooks/use-mobile.ts`
- **Description:** *No description yet. To add one, please provide details about this file.*

### `src/lib/`

#### `src/lib/constants.ts`
- **Description:** This file exports the `pricingCards` array, which holds the data for the different pricing tiers shown on the home page.

#### `src/lib/utils.ts`
- **Description:** Contains the `cn` utility function from `tailwind-merge` and `clsx`, which is used to conditionally merge Tailwind CSS classes.

#### `src/lib/db.ts`
- **Description:** Initializes and exports a singleton instance of the Prisma Client for database interactions, ensuring efficient connection management throughout the application.

### `src/providers/`

#### `src/providers/theme-provider.tsx`
- **Description:** A client-side component that wraps the `next-themes` library, enabling theme switching (light, dark, system) for the application.
