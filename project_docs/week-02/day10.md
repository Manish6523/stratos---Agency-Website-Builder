# Day 10: Pipeline & Kanban Board System

## Today's Goal
Implement a comprehensive Pipeline Management system with drag-and-drop Kanban boards, enabling users to visualize and manage their sales pipelines with lanes and tickets, similar to tools like Trello, Monday.com, or HubSpot's deal pipeline.

## How I Achieved That Goal

### 1. **Core Dependencies - Drag & Drop Functionality**
   - **Added `react-beautiful-dnd`**: Industry-standard library for beautiful, accessible drag-and-drop functionality.
   - **Added `@types/react-beautiful-dnd`**: TypeScript type definitions for type-safe development.
   - These packages enable smooth horizontal lane dragging and vertical ticket reordering with proper animations.

### 2. **Pipeline Management Backend** (`src/lib/queries.ts`)
   Added comprehensive server actions for pipeline CRUD operations:

   #### Pipeline Queries:
   - **`getPipelineDetails(pipelineId: string)`**: Fetches a single pipeline by ID.
   - **`getPipelines(subaccountId: string)`**: Retrieves all pipelines for a subaccount with nested lanes and tickets.
   - **`upsertPipeline(pipeline: Prisma.PipelineUncheckedCreateWithoutLaneInput)`**: Creates or updates a pipeline.
   - **`deletePipeline(pipelineId: string)`**: Permanently removes a pipeline and all associated data.

   #### Lane Queries:
   - **`getLanesWithTicketAndTags(pipelineId: string)`**: Fetches all lanes for a pipeline with nested tickets, tags, assigned users, and customer data, ordered by the `order` field.
   - **`upsertLane(lane: Prisma.LaneUncheckedCreateInput)`**: Creates or updates a lane. Auto-calculates `order` if not provided.
   - **`updateLanesOrder(lanes: Lane[])`**: Batch updates lane positions after drag-and-drop using a database transaction for atomicity.
   - **`deleteLane(laneId: string)`**: Removes a lane (cascades to delete tickets if configured).

### 3. **Pipeline Routing & Pages**
   #### **`src/app/(main)/subaccount/[subaccountId]/pipelines/page.tsx`**:
   - **Smart Router Logic**: Automatically redirects users to the first available pipeline for the subaccount.
   - If no pipelines exist, displays a "Pipelines" placeholder page.
   - Server component that queries the database for `pipeline.findFirst()`.

   #### **`src/app/(main)/subaccount/[subaccountId]/pipelines/[pipelineId]/page.tsx`**:
   - Main pipeline detail page that fetches:
     - Pipeline details
     - All lanes with tickets, tags, assigned users, and customers
   - Renders the `PipelineView` component with full data.
   - Includes loading state and layout integration.

   #### **`src/app/(main)/subaccount/[subaccountId]/pipelines/layout.tsx`**:
   - Provides consistent layout for all pipeline routes.
   - Includes `BlurPage` wrapper for visual consistency.

   #### **`src/app/(main)/subaccount/[subaccountId]/pipelines/loading.tsx`**:
   - Displays loading spinner during server-side data fetching.

### 4. **Pipeline View Component** (`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineView.tsx`)
   - **Core Kanban Board Logic**:
     - Wraps entire board in `<DragDropContext>` from react-beautiful-dnd.
     - Horizontal `<Droppable>` for lanes with `direction="horizontal"`.
     - State management for lanes and tickets using React hooks.
   - **Drag-and-Drop Handler** (`onDragEnd`):
     - **Lane Reordering**: When dragging lanes horizontally, calculates new order indices and calls `updateLanesOrder()`.
     - **Ticket Reordering**: Handles two scenarios:
       1. **Same Lane**: Reorders tickets within the same lane.
       2. **Cross-Lane**: Moves tickets between lanes, updates `laneId`, and recalculates order for both lanes.
     - Uses `toSpliced()` for immutable array manipulation.
   - **Add Lane Button**: Opens modal with `LaneForm` for creating new lanes.
   - **Empty State**: Displays a large `Flag` icon when no lanes exist.

### 5. **Pipeline Lane Component** (`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineLane.tsx`)
   - **Draggable Lane**:
     - Each lane is a `<Draggable>` component with custom drag offset to prevent visual glitches.
     - Sticky header with lane name and color indicator (random hex color generated per lane).
   - **Financial Tracking**:
     - Calculates total value of all tickets in the lane using `useMemo`.
     - Displays formatted currency amount (USD) in a badge.
   - **Dropdown Menu**:
     - **Delete**: Opens AlertDialog for confirmation before calling `deleteLane()`.
     - **Edit**: Opens modal with `LaneForm` pre-filled with current lane data.
     - **Create Ticket**: Opens modal with `TicketForm` for adding tickets to this lane.
   - **Ticket Container**:
     - Nested `<Droppable>` with `type="ticket"` for vertical ticket dragging.
     - Maps through tickets and renders `PipelineTicket` components.
     - Scrollable container with fixed max height.

### 6. **Pipeline Ticket Component** (`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineTicket.tsx`)
   - **Draggable Ticket Card**:
     - Each ticket is a `<Draggable>` component.
     - Displays ticket name, description (if any), assigned user avatar, customer info, and ticket value.
   - **Visual Elements**:
     - Customer email display with truncation.
     - Assigned user avatar with fallback initials.
     - Currency-formatted ticket value.
     - Tags rendered with colored badges.
   - **Actions**:
     - **Edit**: Opens modal with pre-filled `TicketForm`.
     - **Delete**: Opens AlertDialog for confirmation before calling `deleteTicket()`.
   - **Hover Effects**: Subtle shadow and scale transformations for better UX.

### 7. **Form Components**
   #### **`src/components/forms/CreatePipelineForm.tsx`**:
   - **Simple Form**: Only requires a pipeline name (zod schema with `.min(1)` validation).
   - **React Hook Form**: Uses `useForm` with `zodResolver` for validation.
   - **Submission Logic**:
     - Calls `upsertPipeline()` with `subAccountId`.
     - Logs activity notification: "Updates a pipeline | {name}".
     - Shows toast notification on success/failure.
     - Calls `router.refresh()` to reflect changes.
     - Closes modal via `setClose()` from ModalProvider.
   - **Edit Mode**: Pre-fills form with `defaultData?.name` if editing an existing pipeline.

   #### **`src/components/forms/lane-form.tsx`**:
   - **Lane Name Input**: Single text field with validation.
   - **Submission Logic**:
     - Calls `upsertLane()` with `pipelineId` and `order` (preserves existing order if editing).
     - Fetches pipeline details to get `subAccountId` for activity logging.
     - Logs activity: "Updated a lane | {name}".
     - Shows toast and refreshes router.
   - **Auto-Order Calculation**: If creating a new lane, backend auto-calculates order based on existing lanes count.

### 8. **Pipeline InfoBar & Settings**
   #### **`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineInfoBar.tsx`**:
   - Custom info bar for pipeline context (details not shown in diff, likely similar to main InfoBar).

   #### **`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineSettings.tsx`**:
   - Settings panel for pipeline configuration (details not shown in diff).

### 9. **Type System Updates** (`src/lib/types.ts`)
   - **Activated Pipeline Types**:
     - `PipelineDetailsWithLanesCardsTagsTickets`: Full pipeline with nested relations.
     - `LaneDetail`: Lane with nested tickets and tags.
     - `TicketAndTags`: Ticket with all relations (tags, assigned user, customer, lane).

## Problems Faced
- **Drag Offset Calculation**: react-beautiful-dnd's default drag preview positioning caused lanes to jump. Fixed by applying a custom offset transform in the `PipelineLane` component when `snapshot.isDragging` is true.
- **Transaction Race Conditions**: When dragging tickets rapidly between lanes, multiple `updateTicketsOrder()` calls could conflict. Mitigated by using `db.$transaction()` for atomic updates.
- **TypeScript Complexity**: Prisma's deeply nested types required careful typing of the `LaneDetail` and `TicketAndTags` interfaces to ensure type safety throughout the drag-and-drop flow.

## Key Files Created
### Pipeline Routes:
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/page.tsx`**: Smart router page.
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/[pipelineId]/page.tsx`**: Pipeline detail page.
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/layout.tsx`**: Pipeline layout.
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/loading.tsx`**: Loading state.

### Pipeline Components:
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineView.tsx`**: Main Kanban board.
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineLane.tsx`**: Individual lane component.
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineTicket.tsx`**: Ticket card component.
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineInfoBar.tsx`**: Pipeline-specific info bar.
- **`src/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineSettings.tsx`**: Pipeline settings panel.

### Forms:
- **`src/components/forms/CreatePipelineForm.tsx`**: Pipeline creation/edit form.
- **`src/components/forms/lane-form.tsx`**: Lane creation/edit form.

### Modified:
- **`src/lib/queries.ts`**: Added 7 new pipeline and lane query functions.
- **`src/lib/types.ts`**: Activated pipeline-related types.
- **`bun.lock` & `package.json`**: Added react-beautiful-dnd dependencies.

## Next Steps
- Implement ticket creation and editing functionality (Day 11).
- Add tag system for ticket categorization.
- Build funnel management for marketing campaigns.
- Add filters and search to pipeline views.
