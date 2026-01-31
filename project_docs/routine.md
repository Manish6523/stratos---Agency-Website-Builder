# My Routine

This file describes the process I follow to manage the project documentation.

## Update Cycle (Triggered by user prompt)

1.  **Gather Information**:
    *   Ask the user to describe the recent changes they have made for the day's log.
    *   Alternatively, analyze the project files to identify modifications if requested.
2.  **Update Documentation**:
    *   **`project_docs/day/dayXX.md`**: Create a new daily log file with a summary of changes and a list of modified files.
    *   **`documentation.md`**:
        *   Analyze the files that were changed.
        *   Update the documentation for each modified file to reflect its new logic and purpose.
        *   If new files are created, add new sections for them.
    *   **`instructions.md`**: If new standing orders are given, add them to the list.
    *   **`ignore.md`**: If the user requests to ignore new files/directories, add them to this file.
3.  **Confirmation and Questions**:
    *   Before executing file writes or commands, confirm the plan with the user.
    *   After execution, report the outcome and ask for the next steps.

---

## Autonomous Documentation Update Prompt

To trigger the autonomous documentation update process, use the following prompt:

> **Update project documentation.**

### What I Will Do:

When you give me that prompt, I will automatically perform the following steps without any further questions, unless I'm truly stuck:

1.  **Detect Changes**: I'll use `git diff` to see every file you have added or modified since our last update.
2.  **Analyze Content**: I will read each of those changed files to understand their purpose and logic.
3.  **Create Daily Log**: I'll create a new, detailed log file (e.g., `project_docs/day/day03.md`) that summarizes your work for the day.
4.  **Update Main Documentation**: I'll add or update descriptions for the relevant files in `project_docs/documentation.md`.
5.  **Confirm Completion**: I'll let you know once the documentation is fully updated.
