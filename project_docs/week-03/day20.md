# Day 20: Multi-Theme System & Theme Picker Redesign

**Date:** Wednesday, February 26, 2026

---

## Today's Goal

Implement a scalable multi-theme CSS architecture allowing users to switch between multiple visual themes, each with independent light/dark mode variants. Redesign the theme picker UI to show the selected theme with color palette previews and a separate dark/light mode toggle.

---

## How I Achieved That Goal

### 1. Multi-Theme CSS Architecture (`src/app/globals.css`)

- **Problem**: The original CSS had two themes (`Portfolio` and `Dark Matter`) both defined under `:root` and `.dark`, causing the second theme to always overwrite the first.
- **Solution**: Scoped each theme under its own CSS class on `<html>`:
  - `.theme-portfolio` (light) + `.theme-portfolio.dark` (dark)
  - `.theme-dark-matter` (light) + `.theme-dark-matter.dark` (dark)
- **Removed `:root` coupling**: Initially, Portfolio was set as `:root, .theme-portfolio`, but `:root` always matches `<html>`, overriding other themes via specificity. Fixed by removing `:root` from the selector.
- **Default theme class in layout**: Added `className="theme-portfolio"` on `<html>` in `layout.tsx` to ensure CSS variables exist before JS hydrates.
- **Inline script for flash prevention**: Added a `<script>` in `<head>` that reads `localStorage("theme-flavor")` and swaps the theme class before first paint, preventing a flash of wrong theme on reload.
- **Single `@theme inline` block**: Only one Tailwind theme mapping block and one `@layer base` block — no duplication needed.

### 2. Seven Themes Added

Each theme provides full light and dark mode variants with custom colors, fonts, shadows, and border-radius:

| Theme        | CSS Class             | Font                | Style                      |
| ------------ | --------------------- | ------------------- | -------------------------- |
| Portfolio    | `.theme-portfolio`    | Inter               | Warm gold tones            |
| 2077         | `.theme-2077`         | Chakra Petch        | Cyberpunk, sharp edges     |
| Claude       | `.theme-claude`       | Outfit              | Warm terracotta accents    |
| Dark Matter  | `.theme-dark-matter`  | Geist Mono          | Orange/teal monospace      |
| Kodama Grove | `.theme-kodama-grove` | Merriweather        | Earthy forest greens       |
| MX-Brutalist | `.theme-mx-brutalist` | Montserrat          | Bold borders, hard shadows |
| Notebook     | `.theme-notebook`     | Architects Daughter | Handwritten, soft grays    |

### 3. Theme Picker Redesign (`src/components/global/theme-picker.tsx`)

- **Renamed**: `theme-toggle.tsx` → `theme-picker.tsx` for clarity.
- **Two-part UI**:
  - **Theme dropdown**: Compact button with `Palette` icon + selected theme name + chevron. Dropdown lists all themes with checkmarks.
  - **Dark/Light toggle**: Separate `Sun`/`Moon` button for toggling appearance mode.
- **Removed old `ModeToggle`**: The standalone `ModeToggle` was removed from `info-bar.tsx` since dark/light switching is now built into the `ThemePicker`.
- **Used in both navigation and info-bar**: `ThemePicker` is now used in the site navigation (`src/components/site/navigation/index.tsx`) and the dashboard `InfoBar`.

### 4. Layout Updates

- **`src/app/layout.tsx`**: Added `className="theme-portfolio"` and inline script for theme restoration.
- **`src/components/global/info-bar.tsx`**: Replaced `ThemePicker` import path, removed `ModeToggle`, reordered UI elements (notifications before user button).
- **`src/components/site/navigation/index.tsx`**: Added `ThemePicker`, replaced raw `<Link>` login with `<Button>`, removed old `ModeToggle`, adjusted z-index.

---

## Problems Faced

1. **Theme overwriting**: Two `:root` blocks meant Dark Matter always overwrote Portfolio. Solved by scoping each theme under its own class.
2. **`:root` selector conflict**: Even with scoped themes, `:root` always matches `<html>` with the same specificity as a class selector. Any theme class appearing later would need to win by cascade order, but having `:root` as a fallback was brittle. Solved by removing `:root` from the Portfolio selector entirely.
3. **No dark mode before hydration**: Without a standalone `.dark` block or theme class on initial render, dark mode had no CSS variables. Solved with `className="theme-portfolio"` on `<html>` and an inline script.

---

## Key Files Modified

| File                                       | Change Summary                                                                          |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `src/app/globals.css`                      | Restructured into 7 scoped themes with `.theme-*` and `.theme-*.dark` selectors         |
| `src/components/global/theme-picker.tsx`   | New component (renamed from `theme-toggle.tsx`) with theme dropdown + dark/light button |
| `src/app/layout.tsx`                       | Added default `theme-portfolio` class and inline theme restoration script               |
| `src/components/global/info-bar.tsx`       | Updated imports, removed `ModeToggle`, reordered UI                                     |
| `src/components/site/navigation/index.tsx` | Added `ThemePicker`, removed `ModeToggle`, button-based login                           |
| `src/components/global/theme-toggle.tsx`   | Deleted (replaced by `theme-picker.tsx`)                                                |
