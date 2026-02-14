# Day 11: Ticket & Tag Management System

## Today's Goal
Build a comprehensive Ticket Management system with customer assignment, team member delegation, tag categorization, and a powerful Tag Creator component to enable detailed task tracking and organization within the Pipeline Kanban board.

## How I Achieved That Goal

### 1. **Ticket Management Backend** (`src/lib/queries.ts`)
   Added extensive server actions for ticket CRUD and related operations:

   #### Ticket Queries:
   - **`getTicketsWithTags(pipelineId: string)`**: Fetches all tickets for a pipeline with tags, assigned users, and customer data.
   - **`_getTicketsWithAllRelations(laneId: string)`**: Internal query to get tickets with full relations (Lane, Tags, Assigned, Customer) for a specific lane.
   - **`upsertTicket(ticket: Prisma.TicketUncheckedCreateInput, tags: Tag[])`**:
     - Creates or updates a ticket with tag associations.
     - Auto-calculates `order` if not provided (counts existing tickets in lane).
     - Uses Prisma's `connect` for new tickets and `set` for updates.
     - Returns full ticket with all relations.
   - **`updateTicketsOrder(tickets: Ticket[])`**: Batch updates ticket positions and lane assignments after drag-and-drop using database transactions.
   - **`deleteTicket(ticketId: string)`**: Permanently removes a ticket.

   #### Contact Management:
   - **`searchContacts(searchTerms: string)`**: Searches contacts by name with fuzzy matching (Prisma's `contains`).
   - **`upsertContact(contact: Prisma.ContactUncheckedCreateInput)`**: Creates or updates customer contact information.

   #### Team Member Access:
   - **`getSubAccountTeamMembers(subaccountId: string)`**: Fetches all users with SUBACCOUNT_USER role who have access permission to the specific subaccount. Used for ticket assignment dropdowns.

### 2. **Ticket Form Component** (`src/components/forms/ticket-form.tsx`)
   A comprehensive form for creating/editing tickets with multiple advanced features:

   #### **Form Fields**:
   - **Ticket Name** (required): Text input with min 1 character validation.
   - **Description** (optional): Textarea for detailed ticket information.
   - **Value** (required): Currency input with regex validation (`/^\d+(\.\d{1,2})?$/`) to ensure valid price format (e.g., "99.99").
   - **Tags**: Multi-select tag system using the `TagCreator` component.
   - **Assigned To**: Dropdown select showing team members with avatars.
   - **Customer**: Searchable autocomplete dropdown with debounced search.

   #### **Customer Search Logic**:
   - Uses Shadcn's `Command` component for autocomplete.
   - Implements debounced search with `useRef` for timer management:
     - User types in search field.
     - 1-second delay before triggering `searchContacts()` query.
     - Updates `contactList` state with search results.
     - Prevents excessive API calls during typing.
   - Displays selected customer name or "Select Customer..." placeholder.

   #### **Team Member Assignment**:
   - Fetches team members on mount using `useEffect`.
   - Displays avatar with name in dropdown options.
   - Falls back to initials with User2 icon if no avatar exists.
   - "Not Assigned" placeholder for unassigned tickets.

   #### **Tag Integration**:
   - Uses `TagCreator` component (see below).
   - Receives selected tags via `getSelectedTags` callback.
   - Pre-fills with `defaultData.ticket?.Tags` when editing.

   #### **Submission Logic**:
   - Validates all fields using `TicketFormSchema`.
   - Calls `upsertTicket()` with ticket data and tags array.
   - Conditionally includes `customerId` only if a customer is selected.
   - Logs activity: "Updated a ticket | {name}".
   - Calls `getNewTicket(response)` callback to update parent state (adds ticket to lane without full page refresh).
   - Shows toast notification and refreshes router.

### 3. **Tag System Backend** (`src/lib/queries.ts`)
   #### Tag Queries:
   - **`upsertTag(subaccountId: string, tag: Prisma.TagUncheckedCreateInput)`**:
     - Creates or updates a tag for a subaccount.
     - Auto-generates ID using `v4()` if not provided.
   - **`deleteTag(tagId: string)`**: Permanently removes a tag (may orphan tickets if not handled).
   - **`getTagsForSubaccount(subaccountId: string)`**: Fetches all tags for a subaccount.

### 4. **Tag Creator Component** (`src/components/global/tag-creator.tsx`)
   A sophisticated multi-select tag management interface:

   #### **Features**:
   - **Inline Tag Creation**: Users can create new tags on-the-fly within any form.
   - **Color Selection**: 5 predefined color options (BLUE, ORANGE, ROSE, GREEN, PURPLE) displayed as clickable color swatches.
   - **Tag Selection**: Command menu lists all existing tags for the subaccount.
   - **Multi-Select**: Users can select multiple tags, displayed as chips with X buttons for removal.
   - **Delete Tags**: Each tag in the list has a trash icon that triggers an AlertDialog for confirmation.

   #### **UI Flow**:
   1. **Selected Tags Display**: Chips at the top showing currently selected tags with remove buttons.
   2. **Color Picker Row**: 5 colored buttons for choosing tag color (uses `TagComponent` with empty title).
   3. **Search Input**: `CommandInput` for filtering existing tags or entering new tag name.
   4. **Plus Icon**: Click to create a new tag with the entered name and selected color.
   5. **Tag List**: All existing tags displayed as clickable items with delete buttons.

   #### **State Management**:
   - `selectedTags`: Array of tags currently selected (passed to parent via `getSelectedTags` callback).
   - `tags`: All available tags for the subaccount.
   - `value`: Current input value for new tag name.
   - `selectedColor`: Currently selected color for new tag.

   #### **Validation**:
   - Prevents creating tags without a name.
   - Prevents creating tags without a color selection.
   - Shows toast notifications for validation errors.

   #### **Activity Logging**:
   - Logs "Updated a tag | {name}" when creating tags.
   - Logs "Deleted a tag | {name}" when removing tags.

### 5. **Tag Component** (`src/components/global/tag-component.tsx`)
   A reusable visual tag chip with color theming:

   #### **Props**:
   - `title`: Tag text (empty for color picker mode).
   - `colorName`: One of BLUE, ORANGE, ROSE, GREEN, PURPLE.
   - `selectedColor`: Optional callback to handle color selection.

   #### **Styling**:
   - Uses `clsx` for conditional Tailwind classes.
   - Each color has background and text color variants (e.g., `bg-[#57acea]/10 text-[#57acea]` for BLUE).
   - Empty tags (color picker mode) show only a colored border.
   - Clickable with cursor pointer.

   #### **Color Palette**:
   - BLUE: `#57acea`
   - ORANGE: `#ffac7e`
   - ROSE: `rose-500`
   - GREEN: `emerald-400`
   - PURPLE: `purple-400`

### 6. **Type System Updates** (`src/lib/types.ts`)
   - **Activated Ticket Types**:
     - `TicketWithTags`: Tickets with tag relations from `getTicketsWithTags()`.
     - `TicketDetails`: Full ticket data from `_getTicketsWithAllRelations()`.
     - `TicketAndTags`: Type alias for ticket with all relations.
   - **Currency Validation**:
     - Exported `currencyNumberRegex` for reuse across forms.

### 7. **Integration with Pipeline Components**
   - **PipelineLane**: "Create Ticket" dropdown option opens modal with `TicketForm`.
   - **PipelineTicket**: Displays tags as colored chips, shows assigned user avatar, and customer email.
   - **PipelineView**: `allTickets` state updated when new tickets are created via `addNewTicket()` callback, enabling optimistic UI updates.

## Problems Faced
- **Debounced Search Memory Leaks**: Initial implementation without `useRef` for timer caused multiple simultaneous API calls. Fixed by storing timer in ref and clearing on unmount.
- **Tag State Synchronization**: When editing tickets, tags weren't pre-selected in TagCreator. Fixed by passing `defaultData.ticket?.Tags` to `defaultTags` prop and handling in `useEffect`.
- **TypeScript Type Safety**: Prisma's `connect` vs `set` for relations required careful handling. Used `set` for updates (replaces all tags) and `connect` for creates (adds tags).
- **Customer Search UX**: Empty state showed no feedback. Added `CommandEmpty` component with "No Customer found." message.

## Key Files Created
### Forms:
- **`src/components/forms/ticket-form.tsx`**: Comprehensive ticket creation/edit form with customer search, team assignment, and tag selection.

### Tag Components:
- **`src/components/global/tag-creator.tsx`**: Multi-select tag management with inline creation.
- **`src/components/global/tag-component.tsx`**: Reusable colored tag chip component.

### Modified:
- **`src/lib/queries.ts`**: Added 8 new functions:
  - Ticket: `getTicketsWithTags`, `_getTicketsWithAllRelations`, `upsertTicket`, `updateTicketsOrder`, `deleteTicket`
  - Tag: `upsertTag`, `deleteTag`, `getTagsForSubaccount`
  - Contact: `searchContacts`, `upsertContact`
  - Team: `getSubAccountTeamMembers`
- **`src/lib/types.ts`**:
  - Activated `TicketWithTags`, `TicketDetails`, `TicketAndTags`.
  - Exported `currencyNumberRegex`.

## Next Steps
- Implement funnel management for marketing campaigns (Day 12).
- Add bulk ticket operations (move all, delete all, change status).
- Implement ticket filtering by tags, assigned user, or customer.
- Add ticket history/activity timeline.
