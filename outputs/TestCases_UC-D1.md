As a Senior QA Test Engineer, I have analyzed the provided BDD Feature and Scenarios. Below are comprehensive test cases covering positive, negative, boundary, and error conditions, adhering to the specified format and rules.

### TC-001: Successful Login - Cashier Role
Preconditions:
The system is accessible.
A Cashier user account ("cashier1", "Pass123!") exists and is active.
Steps:
1. Navigate to the Login Page.
2. Enter "cashier1" into the "Username" field.
3. Enter "Pass123!" into the "Password" field.
4. Click the "Login" button.
Expected Result:
The Backend Authentication Service successfully verifies the credentials.
The user is redirected to the "Cashier Dashboard".
The user's session is initialized and active.

### TC-002: Successful Login - Admin Role
Preconditions:
The system is accessible.
An Admin user account ("admin1", "Secr3t!") exists and is active.
Steps:
1. Navigate to the Login Page.
2. Enter "admin1" into the "Username" field.
3. Enter "Secr3t!" into the "Password" field.
4. Click the "Login" button.
Expected Result:
The Backend Authentication Service successfully verifies the credentials.
The user is redirected to the "Admin Dashboard".
The user's session is initialized and active.

### TC-003: Successful Login - Manager Role (Extrapolated)
Preconditions:
The system is accessible.
A Manager user account ("manager1", "Manag3r!") exists and is active.
Steps:
1. Navigate to the Login Page.
2. Enter "manager1" into the "Username" field.
3. Enter "Manag3r!" into the "Password" field.
4. Click the "Login" button.
Expected Result:
The Backend Authentication Service successfully verifies the credentials.
The user is redirected to the "Manager Dashboard".
The user's session is initialized and active.

### TC-004: Login with Invalid Username
Preconditions:
The system is accessible.
Steps:
1. Navigate to the Login Page.
2. Enter a non-existent username (e.g., "invalidUser") into the "Username" field.
3. Enter a valid password (e.g., "Pass123!") into the "Password" field.
4. Click the "Login" button.
Expected Result:
The system displays an error message indicating invalid credentials (e.g., "Invalid username or password.").
The user remains on the Login Page.
No session is created.

### TC-005: Login with Invalid Password
Preconditions:
The system is accessible.
A valid user account (e.g., "cashier1") exists.
Steps:
1. Navigate to the Login Page.
2. Enter a valid username (e.g., "cashier1") into the "Username" field.
3. Enter an incorrect password (e.g., "WrongP@ss") into the "Password" field.
4. Click the "Login" button.
Expected Result:
The system displays an error message indicating invalid credentials (e.g., "Invalid username or password.").
The user remains on the Login Page.
No session is created.

### TC-006: Login with Invalid Username and Password
Preconditions:
The system is accessible.
Steps:
1. Navigate to the Login Page.
2. Enter an non-existent username (e.g., "fakeUser") into the "Username" field.
3. Enter an incorrect password (e.g., "WrongP@ss") into the "Password" field.
4. Click the "Login" button.
Expected Result:
The system displays an error message indicating invalid credentials (e.g., "Invalid username or password.").
The user remains on the Login Page.
No session is created.

### TC-007: Login with Empty Username
Preconditions:
The system is accessible.
Steps:
1. Navigate to the Login Page.
2. Leave the "Username" field empty.
3. Enter a valid password (e.g., "Pass123!") into the "Password" field.
4. Click the "Login" button.
Expected Result:
The system displays a client-side validation error message for the username field (e.g., "Username is required.").
The user remains on the Login Page.
No network request for authentication should be sent if client-side validation is implemented.

### TC-008: Login with Empty Password
Preconditions:
The system is accessible.
Steps:
1. Navigate to the Login Page.
2. Enter a valid username (e.g., "cashier1") into the "Username" field.
3. Leave the "Password" field empty.
4. Click the "Login" button.
Expected Result:
The system displays a client-side validation error message for the password field (e.g., "Password is required.").
The user remains on the Login Page.
No network request for authentication should be sent if client-side validation is implemented.

### TC-009: Login with Both Username and Password Empty
Preconditions:
The system is accessible.
Steps:
1. Navigate to the Login Page.
2. Leave both "Username" and "Password" fields empty.
3. Click the "Login" button.
Expected Result:
The system displays client-side validation error messages for both fields (e.g., "Username is required.", "Password is required.").
The user remains on the Login Page.
No network request for authentication should be sent.

### TC-010: Login with Case-Sensitive Username (Expected Behavior: Case-Insensitive)
Preconditions:
The system is accessible.
A user "cashier1" exists. (Assuming usernames are typically case-insensitive for login, if not, adjust test name/expected result)
Steps:
1. Navigate to the Login Page.
2. Enter "Cashier1" (with a capital 'C') into the "Username" field.
3. Enter the correct password "Pass123!" into the "Password" field.
4. Click the "Login" button.
Expected Result:
The system should treat "Cashier1" and "cashier1" as the same.
The Backend Authentication Service successfully verifies the credentials.
The user is redirected to the "Cashier Dashboard".

### TC-011: Login with Case-Sensitive Password (Expected Behavior: Case-Sensitive)
Preconditions:
The system is accessible.
A user "cashier1" with password "Pass123!" exists. (Passwords are always case-sensitive).
Steps:
1. Navigate to the Login Page.
2. Enter "cashier1" into the "Username" field.
3. Enter "pass123!" (all lowercase) into the "Password" field.
4. Click the "Login" button.
Expected Result:
The system displays an error message indicating invalid credentials (e.g., "Invalid username or password.").
The user remains on the Login Page.
No session is created.

### TC-012: Login with Locked/Disabled User Account
Preconditions:
The system is accessible.
A user account (e.g., "lockedUser") exists but has been manually locked or disabled by an administrator.
Steps:
1. Navigate to the Login Page.
2. Enter "lockedUser" into the "Username" field.
3. Enter the correct password associated with "lockedUser" into the "Password" field.
4. Click the "Login" button.
Expected Result:
The system displays an error message indicating the account is locked/disabled (e.g., "Your account is locked. Please contact support." or "Account disabled.").
The user remains on the Login Page.
No session is created.

### TC-013: Account Lockout after Multiple Failed Attempts
Preconditions:
The system is accessible.
A valid user account (e.g., "cashier1") exists.
The system has an account lockout policy (e.g., 3 failed attempts in 5 minutes).
Steps:
1. Navigate to the Login Page.
2. Attempt to log in with "cashier1" and an invalid password 3 consecutive times within the lockout threshold.
3. On the 4th attempt, enter "cashier1" and the correct password "Pass123!".
Expected Result:
After the 3rd failed attempt, the system should trigger the lockout policy.
On the 4th attempt with correct credentials, the system should display an error message indicating the account is locked due to too many failed attempts (e.g., "Too many failed login attempts. Your account is temporarily locked.").
The user remains on the Login Page.

### TC-014: Login with Maximum Length Valid Credentials
Preconditions:
The system is accessible.
A valid user account exists with username and password set to the maximum allowed length (e.g., username: 50 chars, password: 128 chars).
Steps:
1. Navigate to the Login Page.
2. Enter the max-length valid username into the "Username" field.
3. Enter the max-length valid password into the "Password" field.
4. Click the "Login" button.
Expected Result:
The Backend Authentication Service successfully verifies the credentials.
The user is redirected to their respective dashboard.
The user's session is initialized and active.

### TC-015: Login with Special Characters in Valid Password
Preconditions:
The system is accessible.
A valid user account exists with a password containing allowed special characters (e.g., "!@#$%^&*()_+{}[]:;<>?,./\~").
Steps:
1. Navigate to the Login Page.
2. Enter the valid username into the "Username" field.
3. Enter the valid password containing special characters into the "Password" field.
4. Click the "Login" button.
Expected Result:
The Backend Authentication Service successfully verifies the credentials.
The user is redirected to their respective dashboard.
The user's session is initialized and active, demonstrating proper handling of special characters.

### TC-016: Login with Network Connectivity Issues
Preconditions:
The system is accessible.
User is on the Login Page.
Steps:
1. Disable network connectivity (e.g., turn off Wi-Fi/ethernet, use a network proxy to simulate failure).
2. Enter valid username (e.g., "cashier1") and password (e.g., "Pass123!").
3. Click the "Login" button.
4. Re-enable network connectivity.
Expected Result:
The system should display an error message related to network issues (e.g., "Cannot connect to server. Please check your internet connection." or "Network error.").
The user remains on the Login Page.
No session is created. Once connectivity is restored, the user should be able to retry.

### TC-017: Login with Backend Authentication Service Unavailable/Error
Preconditions:
The system's frontend is accessible.
The Backend Authentication Service is intentionally stopped or configured to return an error (e.g., 500 Internal Server Error).
Steps:
1. Navigate to the Login Page.
2. Enter valid username (e.g., "cashier1") and password (e.g., "Pass123!").
3. Click the "Login" button.
Expected Result:
The system displays a generic error message (e.g., "An unexpected error occurred. Please try again later." or "Login service unavailable.").
The user remains on the Login Page.
No session is created.

---

### TC-018: Session Timeout Warning Display and Successful Extension
Preconditions:
The user is successfully logged in (e.g., "cashier1") and on a dashboard/working screen.
The session timeout is configured (e.g., 5 minutes total, warning at 2 minutes left).
Steps:
1. Remain inactive until the session is approaching the timeout limit (e.g., 2 minutes remaining).
2. Observe the system for a warning message.
3. Click the "Extend Session" button within the warning prompt.
Expected Result:
The system displays the "Session ending soon" warning message with an option to "Extend Session".
Upon clicking "Extend Session", the warning disappears.
The session timer is reset to its full duration.
The user remains on the current screen without interruption or redirection.

### TC-019: Multiple Session Extensions
Preconditions:
The user is successfully logged in.
The session timeout is configured (e.g., 5 minutes total, warning at 2 minutes left).
Steps:
1. Remain inactive until the session is approaching the timeout limit (e.g., 2 minutes remaining).
2. Observe the "Session ending soon" warning and click "Extend Session".
3. Wait for the session to again approach the timeout limit (e.g., 2 minutes remaining after the reset).
4. Observe the warning again and click "Extend Session".
Expected Result:
The session timer is reset after each successful "Extend Session" action.
The user remains on the current screen after each extension.
There should be no limit to the number of times a session can be extended as long as the user actively extends it.

### TC-020: Session Expiration After Ignoring Warning
Preconditions:
The user is successfully logged in.
The session timeout is configured (e.g., 5 minutes total, warning at 2 minutes left).
Steps:
1. Remain inactive until the session is approaching the timeout limit (e.g., 2 minutes remaining).
2. Observe the "Session ending soon" warning.
3. Do *not* click "Extend Session" and remain inactive until the session fully expires.
Expected Result:
The "Session ending soon" warning is displayed.
After the session timeout limit is reached (e.g., 2 minutes after the warning appeared), the session is terminated.
The user is automatically logged out and redirected to the Login Page.
A message indicating session expiration might be displayed (e.g., "Your session has expired due to inactivity.").

### TC-021: Attempt to Extend Session After Expiration
Preconditions:
The user is successfully logged in.
The session timeout is configured (e.g., 5 minutes total, warning at 2 minutes left).
Steps:
1. Remain inactive until the session is approaching the timeout limit (e.g., 2 minutes remaining).
2. Observe the "Session ending soon" warning.
3. Wait for the warning to disappear and the session to expire, leading to redirection to the Login Page.
4. Attempt to click an "Extend Session" button (if it persists on the expired page, which it shouldn't, or if the user quickly navigates back).
Expected Result:
The "Extend Session" button should not be available or functional once the session has expired and the user is redirected.
If a user manages to click it (e.g., via browser back button immediately after expiry), it should fail.
The user should remain on the Login Page, unable to extend an expired session.

### TC-022: User Logs Out While Session Warning is Displayed
Preconditions:
The user is successfully logged in.
The session timeout is configured (e.g., 5 minutes total, warning at 2 minutes left).
Steps:
1. Remain inactive until the session is approaching the timeout limit (e.g., 2 minutes remaining).
2. Observe the "Session ending soon" warning.
3. Click the "Logout" button/link on the current screen.
Expected Result:
The system should prioritize the explicit logout action.
The "Session ending soon" warning should be dismissed.
The user is successfully logged out and redirected to the Login Page.
The session is immediately terminated without waiting for timeout.

### TC-023: Session Extension with Network Connectivity Issues
Preconditions:
The user is successfully logged in.
The session is approaching the timeout limit (e.g., 2 minutes left), and the warning is displayed.
Steps:
1. Disable network connectivity.
2. Click the "Extend Session" button.
3. Re-enable network connectivity.
Expected Result:
The system displays an error message related to network issues (e.g., "Cannot connect to server to extend session. Please check your internet connection." or "Network error.").
The session timer is *not* reset.
The warning remains visible or reappears.
The user should be prompted to retry or be gracefully logged out if the session fully expires.

### TC-024: Session Extension with Backend Service Unavailable/Error
Preconditions:
The user is successfully logged in.
The session is approaching the timeout limit (e.g., 2 minutes left), and the warning is displayed.
The backend service responsible for session management is intentionally stopped or configured to return an error (e.g., 500 Internal Server Error) when an extension request is made.
Steps:
1. Click the "Extend Session" button.
Expected Result:
The system displays a generic error message (e.g., "An unexpected error occurred while extending session. Please try again." or "Session service unavailable.").
The session timer is *not* reset.
The warning remains visible or reappears.
The user should be prompted to retry or be gracefully logged out if the session fully expires.

### TC-025: Warning Displayed Exactly at Timeout Threshold
Preconditions:
The user is successfully logged in.
The session timeout is configured (e.g., 5 minutes total, warning at 2 minutes left).
Steps:
1. Start user activity and then immediately stop.
2. Observe the system precisely as the 2-minute mark (or configured warning threshold) before session expiration is reached.
Expected Result:
The "Session ending soon" warning message should appear precisely when the session has 2 minutes remaining.
The message content and "Extend Session" button should be fully functional.

### TC-026: Graceful Handling of Session Expiration on Subsequent User Action
Preconditions:
The user is successfully logged in.
The session timeout is configured (e.g., 5 minutes total).
The user has remained completely inactive, and the session has just expired (e.g., a few seconds past the timeout).
Steps:
1. While on the expired session page (before auto-redirect), attempt to click any interactive element (e.g., a button, a link) on the page.
Expected Result:
The system should detect the expired session upon the user's interaction attempt.
The user should be immediately redirected to the Login Page.
A message indicating session expiration might be displayed (e.g., "Your session has expired. Please log in again."). The user should not be able to perform the attempted action.