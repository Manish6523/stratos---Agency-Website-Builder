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