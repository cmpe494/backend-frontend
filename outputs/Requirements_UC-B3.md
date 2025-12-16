# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall provide a graphical user interface (GUI) for "User Management".
-   **[FR-002]** The system shall allow an Admin role user to access the "User Management" screen.
-   **[FR-003]** The system shall allow an Admin to input details for a new staff account, including specifying the user's role.
-   **[FR-004]** The system shall validate the entered details for new staff account creation.
-   **[FR-005]** The system shall provide a "Save" action within the "User Management" interface to finalize new account creation.
-   **[FR-006]** The system shall verify the authorization level of the acting user for account creation operations.
-   **[FR-007]** The system shall create and persist new staff account records in its database upon successful creation.
-   **[FR-008]** The system shall automatically generate a temporary password for all newly created user accounts.
-   **[FR-009]** The system shall display a "User created successfully" confirmation message upon successful account creation.
-   **[FR-010]** The system shall allow users with sufficient privileges to initiate account creation for various roles.
-   **[FR-011]** The system shall deny account creation requests if the acting user lacks the necessary authorization for the target account role.
-   **[FR-012]** The system shall display an "Insufficient privileges" error message when an unauthorized account creation attempt is made.
-   **[FR-013]** The system shall allow an Admin to select an existing user account from the "User Management" screen.
-   **[FR-014]** The system shall provide a "Reset Password" action for selected user accounts.
-   **[FR-015]** The system shall automatically generate a new temporary password upon a user password reset request.
-   **[FR-016]** The system shall invalidate a user's current password upon a successful password reset.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The system shall enforce role-based access control to prevent unauthorized account management operations.
-   **[NFR-002]** The system shall invalidate old passwords with immediate effect upon a password reset.
-   **[NFR-003]** The system shall provide clear and concise feedback messages to users regarding the success or failure of account management operations.