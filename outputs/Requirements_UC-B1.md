# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The system shall provide user input fields for username and password on the login screen.
- **[FR-002]** The system shall provide a "Login" button on the login screen.
- **[FR-003]** The system shall initiate the login process upon user activation of the "Login" button.
- **[FR-004]** The system shall verify provided user credentials (username and password) against the stored authentication data.
- **[FR-005]** The system shall authorize the user based on their associated role upon successful credential verification.
- **[FR-006]** The system shall generate a JSON Web Token (JWT) upon successful user authentication.
- **[FR-007]** The system shall redirect the authenticated user to their role-specific dashboard (e.g., Cashier Panel, Admin Dashboard).
- **[FR-008]** The system shall track the number of consecutive failed login attempts for each user account.
- **[FR-009]** The system shall track the timestamp of each failed login attempt.
- **[FR-010]** The system shall automatically lock a user account if a configurable number of consecutive failed login attempts occurs within a configurable timeframe.
- **[FR-011]** The system shall display a "Account locked for security reasons" message to a user whose account is locked due to failed login attempts.
- **[FR-012]** The system shall record security events related to account lockouts in a log.
- **[FR-013]** The system shall manage user account statuses, including "Active" and "Passive" states.
- **[FR-014]** The system shall deny login access to users whose accounts are set to a "Passive" status, even if correct credentials are provided.
- **[FR-015]** The system shall display an "Account is deactivated" message to a user attempting to log in with a "Passive" account.

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** The system shall ensure secure user authentication and session management for all operational staff members.
- **[NFR-002]** The system shall implement brute-force protection mechanisms for login attempts, effectively preventing unauthorized access through repeated password guessing.
- **[NFR-003]** The generated Session Token (JWT) shall be cryptographically secure and adhere to industry best practices for token validity, integrity, and expiration.
- **[NFR-004]** The system shall allow configuration of the maximum number of failed login attempts and the lockout duration for brute-force protection.
- **[NFR-005]** The system shall maintain an immutable audit trail for all security-sensitive events, including login attempts (successes and failures) and account lockouts.