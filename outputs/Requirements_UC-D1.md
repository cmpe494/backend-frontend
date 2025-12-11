# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall display a Login Page to the user.
-   **[FR-002]** The system shall allow the user to enter a username on the Login Page.
-   **[FR-003]** The system shall allow the user to enter a password on the Login Page.
-   **[FR-004]** The system shall provide a "Login" button on the Login Page.
-   **[FR-005]** The system shall process a user's click on the "Login" button.
-   **[FR-006]** The system shall submit the entered credentials for verification by the Backend Authentication Service.
-   **[FR-007]** The system shall redirect the authenticated user to their role-specific dashboard (e.g., Cashier Dashboard, Admin Dashboard).
-   **[FR-008]** The system shall continuously monitor the active duration of a user's session.
-   **[FR-009]** The system shall determine when an active user session is approaching a predefined timeout limit.
-   **[FR-010]** The system shall display a "Session ending soon" warning to the user when the session is approaching its timeout limit.
-   **[FR-011]** The system shall provide an "Extend Session" control within the "Session ending soon" warning.
-   **[FR-012]** The system shall process user interaction with the "Extend Session" control.
-   **[FR-013]** The system shall reset the session timeout timer upon a successful session extension request.
-   **[FR-014]** The system shall allow the user to remain on their current screen after a successful session extension.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** **Security:** The system shall ensure secure handling and transmission of user credentials during the login process to prevent unauthorized access.
-   **[NFR-002]** **Security:** The system shall prevent unauthorized access to system functionalities and data by enforcing robust authentication and authorization mechanisms.
-   **[NFR-003]** **Session Management:** The system shall define and enforce a configurable session timeout limit to manage user sessions effectively.
-   **[NFR-004]** **Usability:** The system shall provide clear and timely warnings regarding impending session timeouts, offering users the ability to extend their active session.
-   **[NFR-005]** **Integration:** The system shall integrate with a Backend Authentication Service for verifying user credentials.