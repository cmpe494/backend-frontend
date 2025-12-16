# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall provide a user interface for login.
-   **[FR-002]** The system shall accept a username and password as input for authentication.
-   **[FR-003]** The system shall process a "Login" action upon user request.
-   **[FR-004]** The system shall verify provided user credentials against the stored user database.
-   **[FR-005]** The system shall authorize the user by associating them with their assigned role (e.g., Cashier, Manager, Admin).
-   **[FR-006]** The system shall generate a valid Session Token (JWT) upon successful user authentication.
-   **[FR-007]** The system shall redirect the authenticated user to a dashboard appropriate for their assigned role (e.g., Cashier Panel, Admin Dashboard).
-   **[FR-008]** The system shall track the number of failed login attempts for each user.
-   **[FR-009]** The system shall track failed login attempts within a specified time window (e.g., 5 minutes).
-   **[FR-010]** The system shall automatically lock a user account after a predefined number of consecutive failed login attempts within the tracking window (e.g., 5th attempt).
-   **[FR-011]** The system shall display a specific message indicating that an account has been locked for security reasons.
-   **[FR-012]** The system shall log security events related to account lockouts.
-   **[FR-013]** The system shall store and manage user account statuses, including "Passive" (deactivated).
-   **[FR-014]** The system shall deny login access to users whose account status is "Passive" or deactivated, even if credentials are correct.
-   **[FR-015]** The system shall display a specific warning message when a deactivated user attempts to log in.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** **Security:** The system shall implement mechanisms to protect against brute-force login attempts (e.g., account lockout).
-   **[NFR-002]** **Security:** The system shall generate secure session tokens (JWT) to protect user sessions.
-   **[NFR-003]** **Auditability:** The system shall maintain logs for security-relevant events, such as account lockouts, for auditing purposes.