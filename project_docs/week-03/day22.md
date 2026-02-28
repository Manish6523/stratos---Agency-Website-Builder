# Day 22: Funnel Editor Sidebar Activation & Bug Fixes

**Date:** 2026-02-28 (Saturday)
**Week:** 03 — Visual Page Builder

---

## Today's Goal

Activate the `FunnelEditorSidebar` component in the editor route, bringing it out of
commented-out placeholder state and into a functional, rendered UI panel. Additionally,
address a console error caused by nested `<button>` elements in the navigation bar
and apply Tailwind v4 syntax corrections.

---

## How I Achieved That Goal

### 1. FunnelEditorSidebar Activated (`editor/[funnelPageId]/page.tsx`)

- **Uncommented** the `FunnelEditorSidebar` import and render in the editor page.
- Removed stale commented-out import lines for `FunnelEditorNavigation` and `FunnelEditor`
  that were left as placeholder markers from Day 21.
- The sidebar now renders alongside `FunnelEditorNavigation` inside the `EditorProvider`
  context, receiving the `subaccountId` prop.

### 2. FunnelEditorSidebar Structure (`_components/funnel-editor-sidebar/index.tsx`)

The newly active sidebar is a **two-panel Sheet** built with Radix UI `Dialog` (via `shadcn/ui Sheet`):

- **Panel 1 – Icon Rail (w-16):** A narrow right-anchored `SheetContent` with `marginTop: 93px`
  and `zIndex: 80`. Renders `<TabList />` — 4 icon tabs (Settings, Components, Layers, Media).
- **Panel 2 – Content Panel (w-80):** A wider `SheetContent` with `zIndex: 40`, `marginRight: 64px`,
  containing `TabsContent` panels for each tab section.
- **Accessibility:** Both panels use `@radix-ui/react-visually-hidden` `<VisuallyHidden>` to provide
  a `SheetTitle` for screen readers while keeping the UI visually clean.
- **Preview Mode:** Both panels are conditionally hidden using `clsx` when
  `state.editor.previewMode` is `true`, consuming the `EditorProvider` context.
- **Tab Panels (currently scaffolded):**
  - `Settings` → Style inspector header (content component `SettingsTab` is commented, pending)
  - `Components` → Element palette header (content component `ComponentsTab` is commented, pending)
  - `Layers` → (No TabsContent yet, triggered from icon rail)
  - `Media` → Media bucket tab (content component `MediaBucketTab` is commented, pending)

### 3. TabList Component (`_components/funnel-editor-sidebar/tabs/index.tsx`)

Icon rail with 4 `TabsTrigger` items:
- `Settings` → `<SettingsIcon />`
- `Components` → `<Plus />`
- `Layers` → `<SquareStackIcon />`
- `Media` → `<Database />`

Each trigger is `w-10 h-10 p-3` with `data-[state=active]:bg-muted` active state styling.

### 4. FunnelEditorNavigation Bug Fix (`_components/funnel-editor-navigation.tsx`)

- **Nested Button Fix:** Added `asChild` prop to all three `<TooltipTrigger>` wrappers
  (Desktop, Tablet, Mobile device tabs). Previously, `TooltipTrigger` rendered its own
  `<button>` wrapping a `<TabsTrigger>` which also renders a `<button>`, causing an invalid
  HTML nesting error: `<button>` cannot be a descendant of `<button>`.
  With `asChild`, the `TooltipTrigger` now forwards its event/ref handling to the child
  `TabsTrigger` instead of rendering its own DOM node.
- **Tailwind v4 `!` Modifier Fix:** Changed `data-[state=active]:bg-muted` to
  `data-[state=active]:bg-muted!` on the Desktop `TabsTrigger` to apply the `!important`
  modifier using the Tailwind v4 trailing `!` syntax (as opposed to v3's `!` prefix).
- **Padding Alignment Fix:** Changed `p-0` to `pl-2` on the page name `<Input>` and
  the Path `<span>` for better visual alignment in the navigation header.

### 5. UI Component Syntax Fixes (`src/components/ui/`)

#### `table.tsx`
- Updated two Tailwind CSS child selector expressions from the v3 syntax
  `[&>[role=checkbox]]:translate-y-[2px]` → to the v4 syntax
  `*[[role=checkbox]]:translate-y-[2px]` in both `TableHead` and `TableCell`.
  This is the correct way to target direct children in Tailwind v4.

#### `sheet.tsx`
- Reformatted all function returns and JSX to use semicolons consistently
  (code style / linting cleanup — no logic changes).

---

## Problems Faced

### 1. Nested Button Console Error in Navigation
- **Problem:** `TooltipTrigger` (Radix UI) rendered a `<button>` wrapping `<TabsTrigger>`,
  which also rendered a `<button>`. This is invalid HTML and caused a browser console warning.
- **Solution:** Added `asChild` prop to `TooltipTrigger`. This uses Radix UI's "Slot"
  pattern — the trigger merges its behavior onto the child element instead of creating
  a new DOM node.

### 2. Tailwind v4 Breaking Syntax Changes
- `[&>selector]:class` syntax from v3 → `*[selector]:class` in v4 for child selectors.
- `!class` prefix for `!important` in v3 → `class!` suffix in v4.
- These were lurking bugs caused by upgrading to Tailwind v4 without updating all
  generated/shadcn component code.

---

## Key Files Changed

| File | Type | Description |
|------|------|-------------|
| `editor/[funnelPageId]/page.tsx` | Modified | Activated `FunnelEditorSidebar`, removed placeholder comments |
| `_components/funnel-editor-sidebar/index.tsx` | Existing (now active) | Dual-panel Sheet sidebar with previewMode hiding |
| `_components/funnel-editor-sidebar/tabs/index.tsx` | Existing (now active) | Icon rail with 4 TabsTriggers |
| `_components/funnel-editor-navigation.tsx` | Modified | `asChild` fix, `pl-2` padding, Tailwind v4 `!` suffix |
| `src/components/ui/table.tsx` | Modified | Tailwind v4 child selector syntax update |
| `src/components/ui/sheet.tsx` | Modified | Code style cleanup (semicolons) |

---

## Visual Editor Progress After Day 22

| Status | Component |
|--------|-----------|
| ✅ Done | `EditorProvider` state machine + `EditorAction` union (Day 21) |
| ✅ Done | `FunnelEditorNavigation` — device tabs, undo/redo, preview/publish (Day 21) |
| ✅ Done | `FunnelEditorSidebar` — dual-panel Sheet, icon rail, tab panels (Day 22) |
| ⏳ Pending | `FunnelEditor` canvas — recursive element rendering |
| ⏳ Pending | `SettingsTab` — style inspector panel |
| ⏳ Pending | `ComponentsTab` — element palette with drag-and-drop |
| ⏳ Pending | `MediaBucketTab` — media picker |
| ⏳ Pending | Drag-and-drop from sidebar to canvas |
| ⏳ Pending | Inline style editing & element selection |
