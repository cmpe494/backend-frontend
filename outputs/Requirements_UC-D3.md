# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The system shall provide a user interface for "Role Management".
- **[FR-002]** The system shall allow an administrator to select an existing user role from the "Role Management" screen.
- **[FR-003]** The system shall allow an administrator to add permissions to a selected user role.
- **[FR-004]** The system shall provide a mechanism for an administrator to save changes made to a user role's permissions.
- **[FR-005]** The system shall update the corresponding role definition in the backend when role permission changes are saved.
- **[FR-006]** The system shall display a "Permissions updated successfully" message upon successful saving of role permission changes.
- **[FR-007]** The system shall validate selected permissions for a role to prevent the saving of invalid or conflicting combinations.
- **[FR-008]** The system shall prevent the saving of a role's permissions if invalid or conflicting combinations are selected.
- **[FR-009]** The system shall display an "Invalid permission combination" error message when an administrator attempts to save conflicting permissions.

## 2. Non-Functional Requirements (NFR)
(No explicit Non-Functional Requirements were identified strictly from the provided Given/When/Then logic.)