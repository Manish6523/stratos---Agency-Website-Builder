# Project Documentation

**Last Updated:** Saturday, January 31, 2026

This document provides a detailed overview of the files within the Stratos project. Its purpose is to serve as a central knowledge base for understanding the codebase.

---

## Configuration Files

This project includes several key configuration files that define the development environment, dependencies, and build process.

- **`.gitignore`**: Specifies intentionally untracked files to be ignored by Git.
- **`bun.lock`**: The lockfile for the Bun package manager, ensuring consistent dependency installation.
- **`components.json`**: Configuration for `shadcn/ui` components.
- **`eslint.config.mjs`**: Configuration for ESLint, the linter for identifying and reporting on patterns in JavaScript.
- **`next.config.ts`**: Configuration for the Next.js framework.
- **`package.json`**: Lists project dependencies and scripts.
- **`postcss.config.mjs`**: Configuration for PostCSS, a tool for transforming CSS with plugins.
- **`README.md`**: General information about the project.
- **`tsconfig.json`**: Configuration for the TypeScript compiler.

---

## Project Source Code

### `src/app/` (App Router)

The core application logic and UI, structured using the Next.js App Router.

#### `src/app/globals.css`
- **Description:** Defines the base styles for the application. It imports Tailwind CSS and defines an extensive set of CSS variables for both light and dark themes, used by `shadcn/ui`.

#### `src/app/layout.tsx`
- **Description:** The root layout for the entire application. It wraps all pages with the `ClerkProvider` for authentication context and the `ThemeProvider` to manage light/dark modes. It also applies the global `DM_Sans` font.

#### `src/app/page.tsx`
- **Description:** *No description yet. To add one, please provide details about this file.*

#### `src/app/proxy.ts`
- **Description:** Implements Clerk middleware. It defines public routes (`/site`, `/api/uploadthing`) and protects all other routes by redirecting unauthenticated users to the sign-in page.

#### `src/app/site/layout.tsx`
- **Description:** The main layout for the public-facing site. It renders the global `Navigation` component above the page content.

#### `src/app/site/page.tsx`
- **Description:** The primary home page for the marketing site. It includes a hero section with the 'Stratos' branding and a section that dynamically maps over the `pricingCards` constant to display subscription options.

#### `src/app/(main)/agency/(auth)/layout.tsx`
- **Description:** A simple layout component that centers its children on the page. It's used to provide a consistent, centered view for the authentication forms (sign-in and sign-up).

#### `src/app/(main)/agency/(auth)/sign-in/[[...sign-in]]/page.tsx`
- **Description:** This page renders the Clerk sign-in component (`<SignIn />`). The `[[...sign-in]]` folder structure is a catch-all route required by Clerk to handle its authentication flow correctly.

#### `src/app/(main)/agency/(auth)/sign-up/[[...sign-up]]/page.tsx`
- **Description:** This page renders the Clerk sign-up component (`<SignUp />`). The `[[...sign-up]]` folder structure is a catch-all route required by Clerk to handle its authentication flow correctly.


### `src/components/`

Reusable UI components used throughout the application.

#### `src/components/global/mode-toggle.tsx`
- **Description:** A client component that uses the `next-themes` library to provide a dropdown menu (Sun/Moon icon) for switching between light, dark, and system color schemes.

#### `src/components/site/navigation/index.tsx`
- **Description:** The main navigation bar for the public site. It includes the Stratos logo, a list of navigation links, a login button, the Clerk `UserButton` (for authenticated users), and the `ModeToggle` component.

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

### `src/providers/`

#### `src/providers/theme-provider.tsx`
- **Description:** A client-side component that wraps the `next-themes` library, enabling theme switching (light, dark, system) for the application.