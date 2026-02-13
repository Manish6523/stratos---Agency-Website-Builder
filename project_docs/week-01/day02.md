# Day 2: Marketing Site & Multi-Tenancy Routing

## Today's Goal
Build the public-facing landing page to showcase the product and implement advanced routing logic to handle multi-tenancy (subdomains) and authentication contexts.

## How I Achieved That Goal
1.  **Public Marketing Site**:
    -   Designed and built the home page (`src/app/site/page.tsx`) featuring a hero section and dynamic pricing cards sourced from `src/lib/constants.ts`.
    -   Developed a responsive global navigation bar (`src/components/site/navigation/index.tsx`) that includes authentication status checks (showing a "Login" or "User Profile" button dynamically).

2.  **Theming Overhaul**:
    -   Refreshed the application's look with a modern `oklch`-based color palette for better vibrancy and contrast in `src/app/globals.css`.
    -   Switched the default font to `Oxanium` to give the brand a distinct identity.

3.  **Advanced Middleware & Routing**:
    -   Significantly enhanced the middleware (originally `src/app/proxy.ts`) to handle **subdomains**. This allows the app to serve different content based on the domain (e.g., `agency.stratos.com` vs. `stratos.com`).
    -   Refactored the `ClerkProvider` placement, moving it to specific layouts (`src/app/site/layout.tsx`) to optimize context usage for different parts of the app.

## Problems Faced
-   **Subdomain Logic Complexity**: Handling `localhost` subdomains differs from production domains. I had to add logic to parse the `host` header dynamically to ensure it works in both dev and prod environments.
-   **Z-Index Layering**: The navigation bar initially overlapped with page content or fell behind other elements. Adjusted `z-index` values in Tailwind to ensure the nav bar stays sticky and visible.

## Key Files Modified
-   **`src/app/site/page.tsx`**: New marketing landing page.
-   **`src/app/proxy.ts`**: Updated middleware for subdomain rewriting.
-   **`src/components/site/navigation/index.tsx`**: Responsive navigation component.
-   **`src/lib/constants.ts`**: configuration for pricing cards.