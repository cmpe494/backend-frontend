# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall present a Login Page to the user.
-   **[FR-002]** The system shall allow users to input a username on the Login Page.
-   **[FR-003]** The system shall allow users to input a password on the Login Page.
-   **[FR-004]** The system shall provide a "Login" button on the Login Page.
-   **[FR-005]** The system shall respond to the user's click on the "Login" button.
-   **[FR-006]** The system shall transmit entered credentials (username and password) to a Backend Authentication Service for verification upon login attempt.
-   **[FR-007]** Upon successful authentication, the system shall redirect the user to a dashboard appropriate for their assigned role.
-   **[FR-008]** The system shall maintain a logged-in state for authenticated users.
-   **[FR-009]** The system shall track the active duration of user sessions.
-   **[FR-010]** The system shall detect when an active user session is approaching its defined timeout limit.
-   **[FR-011]** The system shall display a warning message to the user when their session is approaching its timeout limit.
-   **[FR-012]** The warning message shall include an option (e.g., a button) to "Extend Session".
-   **[FR-013]** The system shall respond to the user's action to extend their session.
-   **[FR-014]** Upon a user's successful request to extend the session, the system shall reset the session timer for that session.
-   **[FR-015]** Upon successful session extension, the system shall allow the user to remain on the current screen/page.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The system shall prevent unauthorized access to system functionalities through robust login and session management.
-   **[NFR-002]** The system shall ensure secure handling and transmission of user credentials during the login process.
-   **[NFR-003]** The system shall maintain the active state of a user's session while they are working.
-   **[NFR-004]** The system shall provide a configurable session timeout limit.