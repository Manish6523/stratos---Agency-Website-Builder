# Day 19: Funnel Page Form Refactor & DnD Fixes

**Date:** Tuesday, February 25, 2026

---

## Today's Goal

Refactor the Funnel Page Form to remove the shadcn/ui form abstraction (`Form`, `FormField`, `FormItem`, etc.) and use native input tags with `react-hook-form` directly. Fix `router.refresh()` not reflecting state updates in the parent component. Fix drag-and-drop container collapsing during drag operations. Polish funnel step UI components.

---

## How I Achieved That Goal

### 1. Funnel Page Form Refactor (`src/components/forms/funnel-page-form.tsx`)

- **Removed shadcn/ui form components**: Stripped out `Form`, `FormControl`, `FormField`, `FormItem`, `FormLabel`, and `FormMessage` imports and usage.
- **Switched to `react-hook-form` `register`**: Instead of using `controller`-based `FormField`, the form now uses `register('name')` and `register('pathName')` for direct input binding.
- **Native labels**: Replaced `FormLabel` with the simpler `Label` component from `../ui/label`.
- **Manual error display**: Replaced `FormMessage` with conditional rendering of `errors.fieldName?.message` in styled `<p>` tags.
- **Path name lowercasing**: Previously handled via `field.value?.toLowerCase()` on the controller. Now uses an `onInput` handler that mutates `e.target.value` directly.
- **Button updates**: Removed `w-22 self-end` from the save button, switched delete button to `variant="destructive"`, added text labels ("delete", "Duplicate") alongside icons, and styled the duplicate button with custom border/color via inline styles.

### 2. Router Refresh State Sync Fix (`funnel-step.tsx`)

- **Root Cause**: `FunnelSteps` component was initializing `pagesState` and `clickedPage` from props via `useState`, but never re-synced when `router.refresh()` sent new props from the server.
- **Fix**: Added a `useEffect` hook that listens to the `pages` prop. When it changes (after a server refresh), it calls `setPagesState(pages)` and updates `clickedPage` to the latest version of the same page from the new data.

### 3. Drag-and-Drop Placeholder Fix (`funnel-step.tsx`)

- **Root Cause**: The `Droppable` component from `react-beautiful-dnd` was missing `{provided.placeholder}` inside its render function. Without it, the container shrinks when an item is dragged out, causing a jarring scroll effect.
- **Fix**: Added `{provided.placeholder}` after the mapped page list inside the `Droppable` render function.

### 4. UI Refinements

- **`funnel-step-card.tsx`**: Replaced `ArrowDown` with `ArrowUpDown` icon for better drag affordance. Updated card layout with `overflow-hidden` and adjusted icon container padding.
- **`funnel-step.tsx`**: Added `isDropDisabled`, `isCombineEnabled`, and `ignoreContainerClipping` props to `Droppable`. Reformatted JSX props for consistency.
- **`page.tsx` (funnels/[funnelId])**: Added `ArrowLeft` icon to the "Back" link. Updated `TabsList` to use full-width justified layout with `cursor-pointer` on triggers.
- **`funnel-page-placeholder.tsx`**: Fixed React SVG attribute casing (`clip-path` → `clipPath`, `fill-opacity` → `fillOpacity`).

---

## Problems Faced

1. **`router.refresh()` appeared broken**: After saving a funnel page, the steps list didn't update. The actual issue was that `useState(pages)` only captures the initial value—subsequent prop changes from server re-renders were ignored. Solved with a `useEffect` sync.
2. **DnD container collapse**: When dragging a card, the remaining cards would compress and a scrollbar appeared. Missing `provided.placeholder` was the root cause.

---

## Key Files Modified

| File | Change Summary |
|------|---------------|
| `src/components/forms/funnel-page-form.tsx` | Removed shadcn form abstraction, native register + Label |
| `src/app/.../funnels/[funnelId]/_components/funnel-step.tsx` | useEffect state sync, DnD placeholder, prop additions |
| `src/app/.../funnels/[funnelId]/_components/funnel-step-card.tsx` | Icon swap, layout tweaks |
| `src/app/.../funnels/[funnelId]/page.tsx` | Back link icon, tab layout polish |
| `src/components/icons/funnel-page-placeholder.tsx` | React SVG attribute casing fixes |
