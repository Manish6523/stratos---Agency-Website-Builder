# My Routine

This file describes the process I follow to manage the project documentation.

## Elite Documentation Update Routine

**Trigger:** "Update project documentation" (or similar variations).

**Execution Logic:**

When triggered, I will autonomously process the current `git diff` (focusing on `./src` and configuration files) using the following "Elite" steps. I will ensuring **ALL** documentation files, including `gemini.md` and `routine.md`, are synchronized.

### 1. Source-First Analysis
*   **Scope**: Strictly analyze `src/`, `prisma/`, and root configuration files.
*   **Depth**: Map the changes from HEAD (current staged/unstaged changes) to the previous documented state to understand the evolution.

### 2. Logic Delta Detection
*   **Prisma & DB**: Look for changes in how data is fetched, schema modifications, or adapter updates.
*   **Auth Flow**: Analyze modifications to Clerk hooks, middleware (`src/proxy.ts`), or protected routes.
*   **Component Evolution**: Detect if the UI is moving from "Basic/Placeholder" to "Functional/Logic-driven".

### 3. Generate Professional Daily Log
Create or update `project_docs/day/dayXX.md` with the following structure:
*   **Header**: A specific title (e.g., `Day 03: Agency Layout & Prisma Integration`).
*   **Today's Goal**: What was the intended outcome of these changes?
*   **How I Achieved That Goal**: Technical breakdown of Features, Refactors, and Logic.
*   **Problems Faced**: Specific challenges (e.g., DNS latency, middleware circular deps) and how they were solved.
*   **Key Files**: List of major files changed.

### 4. Sync Master Files
*   **`project_docs/documentation.md`**: Update "File Responsibilities", "Technical Architecture", and "Folder Structure" to reflect the new state.
*   **`project_docs/day/dayTitle.md`**: Append/Update the entry: `Day XX: [Module] - [Key Logic Change]`.
*   **`project_docs/gemini.md`**: Update the session log with the current interaction, ensuring the history of decisions is preserved.
*   **`project_docs/routine.md`**: Review and update this file itself if the documented process needs refinement based on new workflows.

### 5. Clean-Up Report
*   Summarize the update to the user.
*   Notify of any "Documentation Debt" or files that need further manual explanation.

### 6. also give a git commit message in the end 
   day-4[feat]: 1 - Agency creation logic, role-based routing & system utilities
   2 - Implemented `upsertAgency` and `initUser` server actions for robust agency and user management. ....

---

## Manual Update Cycle

If not using the autonomous prompt, the general update cycle is as follows:

1.  **Gather Information**: Ask the user to describe recent changes.
2.  **Update Documentation**: Update the relevant documentation files (`day/dayXX.md`, `documentation.md`, `gemini.md`, etc.).
3.  **Confirmation**: Confirm the plan before execution and report the outcome.
