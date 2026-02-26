# Day 21: Visual Page Editor — Foundation & State Architecture

**Date:** Friday, February 27, 2026
**Week:** Week 03
**Focus Area:** Funnel Editor Infrastructure, State Management, UI Polish

---

## Today's Goal

Begin building the visual page editor (drag-and-drop funnel/landing page builder). The goal was to scaffold the core editor state architecture, wire the editor route with a proper data-fetched provider, and clean up the funnel management UI components.

---

## How I Achieved That Goal

### 1. Editor State Machine — `editor-provider.tsx` (NEW)

Created a new provider at `src/providers/editor/editor-provider.tsx` that implements the full state management layer for the visual editor. This is the brain of the page builder.

**Key Design Decisions:**

- **`useReducer` + Context API** pattern chosen over Zustand/Redux for lightweight, co-located state.
- **`EditorState`** split into two slices:
  - `editor` — current canvas snapshot (elements tree, selected element, device, preview/live modes)
  - `history` — full backward/forward history stack with `currentIndex` pointer

**Core Types Defined:**

```typescript
// Element node in the canvas tree
export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns; // imported from constants.ts
  content:
    | EditorElement[]
    | { href?: string; innerText?: string; src?: string };
};

// Editor canvas state
export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes; // 'Desktop' | 'Mobile' | 'Tablet'
  previewMode: boolean;
  funnelPageId: string;
};

// History tracking for undo/redo
export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};
```

**Reducer Actions Handled:**

| Action                   | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `ADD_ELEMENT`            | Deep-tree insert into `content[]` of target container         |
| `UPDATE_ELEMENT`         | Deep-tree update; clears `selectedElement` if updated         |
| `DELETE_ELEMENT`         | Deep-tree removal via filter                                  |
| `CHANGE_CLICKED_ELEMENT` | Sets `selectedElement`; saves snapshot to history             |
| `CHANGE_DEVICE`          | Switches viewport (`Desktop/Mobile/Tablet`)                   |
| `TOGGLE_PREVIEW_MODE`    | Toggles preview mode flag                                     |
| `TOGGLE_LIVE_MODE`       | Toggles live publish mode (optional payload for explicit set) |
| `UNDO`                   | Navigates `currentIndex--` in history stack                   |
| `REDO`                   | Navigates `currentIndex++` in history stack                   |
| `LOAD_DATA`              | Resets state and loads saved page content                     |
| `SET_FUNNELPAGE_ID`      | Sets the active funnel page ID in state                       |

**Initial State:**

- Canvas starts with a single `__body` root element (matching database JSON convention)
- History initialized with the initial state as the first entry

**Context & Hook:**

```typescript
// EditorContext exposes: state, dispatch, subaccountId, funnelId, pageDetails
export const EditorContext = createContext<{...}>({ ... })

// Type-safe hook with error guarding
export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) throw new Error('useEditor Hook must be used within the editor Provider')
  return context
}
```

---

### 2. Editor Action Types — `editor-actions.ts` (NEW)

Created `src/providers/editor/editor-actions.ts` with a discriminated union type `EditorAction` covering all 10 reducer action variants. This provides TypeScript autocomplete and type-narrowing throughout the editor.

---

### 3. Editor Type System — `src/lib/constants.ts`

Added two new exports to the constants file:

**`EditorBtns` type** — union of all droppable element types:

```typescript
export type EditorBtns =
  | "text"
  | "container"
  | "section"
  | "contactForm"
  | "paymentForm"
  | "link"
  | "2Col"
  | "video"
  | "__body"
  | "image"
  | null
  | "3Col";
```

**`defaultStyles`** — default CSS properties applied to all new elements:

```typescript
export const defaultStyles: React.CSSProperties = {
  backgroundPosition: "center",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  opacity: "100%",
};
```

---

### 4. Editor Route — `editor/[funnelPageId]/page.tsx`

Completely rebuilt the funnel page editor route from a placeholder `<div>page</div>` to a fully functional async server component:

- **Data fetching:** `db.funnelPage.findFirst()` by `funnelPageId`
- **Guard clause:** Redirects back to funnel dashboard if page not found
- **Full-screen canvas wrapper:** `fixed top-0 bottom-0 left-0 right-0 z-20 bg-background overflow-hidden`
- **EditorProvider integration:** Passes `subaccountId`, `funnelId`, `pageDetails` as context seed
- **Commented stubs** for `FunnelEditorNavigation`, `FunnelEditor`, and `FunnelEditorSidebar` — ready to be activated as sub-components are built

---

### 5. Funnel Step Card UI Polish — `funnel-step-card.tsx`

- Removed `overflow-hidden` from card root (was clipping portal content)
- Redesigned icon area: `rounded-lg` container with `flex items-center justify-center`
- Changed drag indicator icon from `ArrowUpDown` → `ArrowDown` (size 18, positioned absolute at bottom)
- Code style: converted to consistent semicolons throughout

---

### 6. Funnel Step Container Fix — `funnel-step.tsx`

- Fixed Tailwind class typo: `transofrm` → `transform` in hover overlay
- Changed `!text-muted-foreground` → `text-muted-foreground!` (Tailwind v4 important suffix syntax)
- Removed redundant `relative` from Link, moved to wrapper `div`

---

### 7. Type Formatting Cleanup — `src/lib/types.ts`

- Reformatted multi-import blocks to multi-line style for readability
- Fixed `PromiseReturnType` formatting (consistent semicolons)
- No logic changes, pure formatting improvement

---

## Problems Faced

1. **Portal-based drag-and-drop card overflow:** The `overflow-hidden` on the card root clipped the dragging portal. Removing it fixed the visual artifact during drag.
2. **Tailwind v4 important modifier syntax:** The old `!text-*` prefix syntax needed to be migrated to the new `text-*!` suffix syntax for Tailwind v4 compatibility.
3. **TypeScript type clarity:** `EditorBtns` union needed `null` as a valid type (for the unselected/default state of an element's type), required careful placement in the union.

---

## Key Files Modified

| File                                                              | Change Type | Description                                            |
| ----------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `src/providers/editor/editor-provider.tsx`                        | **NEW**     | Full editor state machine, reducer, context, hook      |
| `src/providers/editor/editor-actions.ts`                          | **NEW**     | Discriminated union of all 10 editor action types      |
| `src/lib/constants.ts`                                            | Modified    | Added `EditorBtns` type + `defaultStyles` constant     |
| `src/app/.../editor/[funnelPageId]/page.tsx`                      | Modified    | Rebuilt from placeholder to full DB-driven editor page |
| `src/app/.../funnels/[funnelId]/_components/funnel-step-card.tsx` | Modified    | UI polish, icon change, portal overflow fix            |
| `src/app/.../funnels/[funnelId]/_components/funnel-step.tsx`      | Modified    | Typo fix, Tailwind v4 syntax, relative positioning fix |
| `src/lib/types.ts`                                                | Modified    | Import formatting cleanup                              |

---

## Current Editor Architecture

```
EditorProvider (Context)
├── EditorState
│   ├── editor
│   │   ├── elements[]        ← Canvas tree (recursive EditorElement[])
│   │   ├── selectedElement   ← Currently selected element
│   │   ├── device            ← Desktop / Mobile / Tablet
│   │   ├── previewMode       ← Preview toggle
│   │   ├── liveMode          ← Live mode toggle
│   │   └── funnelPageId      ← Active page ID
│   └── history
│       ├── history[]         ← Full state snapshots
│       └── currentIndex      ← Pointer for undo/redo
└── EditorContext
    ├── state                 ← Full EditorState
    ├── dispatch              ← Action dispatcher
    ├── subaccountId          ← Context from route
    ├── funnelId              ← Context from route
    └── pageDetails           ← FunnelPage DB record
```

---

## Next Steps (Day 22+)

- Build `FunnelEditor` canvas component (renders `EditorElement` tree recursively)
- Build `FunnelEditorNavigation` (top bar: device selector, undo/redo, preview, publish)
- Build `FunnelEditorSidebar` (right panel: element palette + style inspector)
- Implement drag-and-drop from sidebar onto canvas (using `@hello-pangea/dnd` or similar)
- Implement element selection, inline style editing, and deletion
