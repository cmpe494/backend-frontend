# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall allow an administrator to access a "User Management" screen.
-   **[FR-002]** The system shall allow an administrator to input valid details for a new staff account.
-   **[FR-003]** The system shall provide a mechanism (e.g., a "Save" button) to submit new staff account details.
-   **[FR-004]** The system shall verify the authorization level of the acting user for account creation operations.
-   **[FR-005]** The system shall create a new staff account in the database upon successful submission and authorization.
-   **[FR-006]** The system shall generate a temporary password for newly created user accounts.
-   **[FR-007]** The system shall display a "User created successfully" confirmation message upon successful account creation.
-   **[FR-008]** The system shall manage and enforce user roles and associated privileges.
-   **[FR-009]** The system shall deny requests for account creation if the acting user lacks the necessary privileges for the intended account role.
-   **[FR-010]** The system shall display an "Insufficient privileges" error message when an unauthorized account creation attempt occurs.
-   **[FR-011]** The system shall allow an administrator to select an existing user account.
-   **[FR-012]** The system shall provide a mechanism (e.g., a "Reset Password" button) to initiate a password reset for a selected user account.
-   **[FR-013]** The system shall generate a new temporary password when a password reset is initiated for an existing user account.
-   **[FR-014]** The system shall immediately invalidate the old password of a user account upon a successful password reset.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The system shall enforce access control based on authenticated user roles and their associated privileges for all account management operations.
-   **[NFR-002]** The system shall ensure that generated temporary passwords are secure and meet predefined complexity requirements.
-   **[NFR-003]** The system shall provide clear, concise, and timely feedback to the user regarding the success or failure of account management operations.
-   **[NFR-004]** The system shall ensure immediate invalidation of old passwords upon reset to maintain account security and prevent unauthorized access.