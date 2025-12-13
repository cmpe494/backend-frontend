Here are comprehensive test cases derived from the provided BDD Feature/Scenario:

### TC-001: Successful Login - Cashier Role
Preconditions:
*   A user account `user_csh` exists with password `pass123` and role `Cashier`.
*   The account `user_csh` is active and not locked.
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  Enter "user_csh" in the username field.
3.  Enter "pass123" in the password field.
4.  Click the "Login" button.

Expected Result:
*   The system verifies the credentials successfully against the database.
*   The system authorizes the user with the `Cashier` role.
*   A valid JSON Web Token (JWT) "Session Token" is generated and returned (e.g., in a cookie or header).
*   The user is redirected to the "Cashier Panel" dashboard.
*   The session token is valid and can be used for subsequent authorized requests.

### TC-002: Successful Login - Admin Role
Preconditions:
*   A user account `user_adm` exists with password `pass123` and role `Admin`.
*   The account `user_adm` is active and not locked.
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  Enter "user_adm" in the username field.
3.  Enter "pass123" in the password field.
4.  Click the "Login" button.

Expected Result:
*   The system verifies the credentials successfully against the database.
*   The system authorizes the user with the `Admin` role.
*   A valid JSON Web Token (JWT) "Session Token" is generated and returned.
*   The user is redirected to the "Admin Dashboard".
*   The session token is valid and can be used for subsequent authorized requests.

### TC-003: Login with Incorrect Password
Preconditions:
*   A user account `user_csh` exists with password `pass123` and role `Cashier`.
*   The account `user_csh` is active and not locked.
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  Enter "user_csh" in the username field.
3.  Enter an incorrect password (e.g., "wrongpass") in the password field.
4.  Click the "Login" button.

Expected Result:
*   The system denies access due to incorrect credentials.
*   An error message like "Invalid username or password" is displayed.
*   No session token is generated.
*   The user remains on the login screen.
*   A failed login attempt is recorded for `user_csh`.

### TC-004: Login with Non-Existent Username
Preconditions:
*   The system is operational and the login screen is accessible.
*   No user account exists with the username "non_existent_user".

Steps:
1.  Navigate to the login screen.
2.  Enter "non_existent_user" in the username field.
3.  Enter any password (e.g., "password123") in the password field.
4.  Click the "Login" button.

Expected Result:
*   The system denies access.
*   An error message like "Invalid username or password" is displayed (to prevent username enumeration).
*   No session token is generated.
*   The user remains on the login screen.
*   No failed login attempt is recorded against any existing user.

### TC-005: Account Lockout - Consecutive Failed Attempts
Preconditions:
*   A user account `user_csh` exists with password `pass123` and role `Cashier`.
*   The account `user_csh` is active and not locked.
*   The system's brute-force protection policy is configured to lock an account after 5 failed attempts within 5 minutes.
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  For `user_csh`, repeatedly perform login attempts with an incorrect password (e.g., "wrongpass") for 4 times within 5 minutes.
3.  On the 5th attempt, enter an incorrect password (e.g., "another_wrongpass") for `user_csh`.
4.  Click the "Login" button.

Expected Result:
*   After the 5th failed attempt, the system should automatically lock the `user_csh` account.
*   A specific message "Account locked for security reasons" is displayed on the login screen.
*   No session token is generated.
*   A security event (account lockout) is logged in the system's audit trails for `user_csh`.
*   The user remains on the login screen.

### TC-006: Verify Login Attempt with Locked Account
Preconditions:
*   A user account `user_csh` exists and is currently locked due to previous failed login attempts (as per TC-005).
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  Enter "user_csh" in the username field.
3.  Enter the *correct* password "pass123" in the password field.
4.  Click the "Login" button.

Expected Result:
*   The system denies access despite correct credentials because the account is locked.
*   The message "Account locked for security reasons" is displayed.
*   No session token is generated.
*   The user remains on the login screen.
*   Another security event (attempted login to locked account) is logged for `user_csh`.

### TC-007: Account Lockout - Verification of Security Event Logging
Preconditions:
*   A user account `user_csh` exists with password `pass123` and role `Cashier`.
*   The account `user_csh` is active and not locked.
*   The system's brute-force protection policy is configured.
*   Access to system logs (e.g., Kibana, Splunk, database logs).

Steps:
1.  Perform steps 1-4 from TC-005 to trigger an account lockout for `user_csh`.
2.  Access the system's security logs/audit trails.
3.  Search for events related to `user_csh`.

Expected Result:
*   A log entry with a severity level (e.g., WARNING/ERROR/CRITICAL) indicating "Account Lockout" for `user_csh` is found.
*   The log entry includes details such as timestamp, user ID, IP address of the failed attempts, and the reason for lockout.

### TC-008: Login Attempt by Deactivated User
Preconditions:
*   A user account `user_adm` exists with password `pass123` and role `Admin`.
*   The account `user_adm` has been deliberately set to "Passive" (deactivated) status by another Admin user.
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  Enter "user_adm" in the username field.
3.  Enter the *correct* password "pass123" in the password field.
4.  Click the "Login" button.

Expected Result:
*   The system denies access even though credentials are correct.
*   A warning message "Account is deactivated" is displayed.
*   No session token is generated.
*   The user remains on the login screen.
*   A security event (login attempt by deactivated user) is logged for `user_adm`.

### TC-009: Login with Empty Username and/or Password
Preconditions:
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  Leave both the username and password fields empty.
3.  Click the "Login" button.

Expected Result:
*   Client-side validation (if implemented) should prevent submission or display "Username is required", "Password is required" messages.
*   If submitted, server-side validation should deny access.
*   An error message (e.g., "Please enter your username and password" or "Invalid credentials") is displayed.
*   No session token is generated.
*   The user remains on the login screen.

### TC-010: Session Token Expiration and Re-login
Preconditions:
*   A user account `user_csh` exists and is active.
*   The system has a configured session token expiration time (e.g., 30 minutes).
*   User `user_csh` is successfully logged in and redirected to the Cashier Panel (refer to TC-001).

Steps:
1.  Log in as `user_csh` successfully.
2.  Wait for a duration longer than the configured session token expiration time (e.g., 35 minutes) without any activity.
3.  Attempt to navigate to a protected page within the Cashier Panel (e.g., "View Transactions").

Expected Result:
*   Upon attempting to access a protected page, the system should detect an expired session token.
*   The user is automatically redirected to the login screen.
*   An informative message like "Your session has expired. Please log in again." might be displayed.
*   The user can successfully re-login with valid credentials.

### TC-011: SQL Injection Attempt in Username
Preconditions:
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  Enter a known SQL injection string (e.g., `' OR '1'='1`) in the username field.
3.  Enter any password (e.g., "password") in the password field.
4.  Click the "Login" button.

Expected Result:
*   The system should correctly escape or reject the input.
*   Access should be denied.
*   An error message "Invalid username or password" should be displayed, or a general error if input validation fails early.
*   No sensitive data should be exposed.
*   The system should not experience a database error or unexpected behavior (e.g., successful login without valid credentials).
*   A security event for suspicious input might be logged.

### TC-012: Password Case Sensitivity (Assuming Passwords are Case-Sensitive)
Preconditions:
*   A user account `user_adm` exists with password `pass123`.
*   The system's password policy dictates case-sensitive passwords.
*   The account `user_adm` is active and not locked.

Steps:
1.  Navigate to the login screen.
2.  Enter "user_adm" in the username field.
3.  Enter a password with incorrect casing (e.g., "Pass123" or "pass123 ") in the password field.
4.  Click the "Login" button.

Expected Result:
*   The system should deny access due to incorrect password casing.
*   An error message "Invalid username or password" is displayed.
*   No session token is generated.
*   The user remains on the login screen.
*   A failed login attempt is recorded for `user_adm`.

### TC-013: Brute-Force Protection - Failed Attempts Reset by Time
Preconditions:
*   A user account `user_csh` exists with password `pass123` and role `Cashier`.
*   The system's brute-force protection policy is configured to reset failed attempts after 5 minutes if no subsequent attempt occurs.
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  For `user_csh`, perform 4 login attempts with an incorrect password (e.g., "wrongpass") within 1 minute.
3.  Wait for 6 minutes (exceeding the 5-minute threshold).
4.  Attempt to log in for the 5th time with an *incorrect* password (e.g., "another_wrongpass").
5.  Click the "Login" button.

Expected Result:
*   The system should treat the 5th attempt as the first failed attempt after the reset period.
*   The account `user_csh` should *not* be locked.
*   An error message like "Invalid username or password" is displayed.
*   No session token is generated.
*   The user remains on the login screen.
*   A failed login attempt is recorded, and the counter for `user_csh` restarts from 1.

### TC-014: Brute-Force Protection - Failed Attempts Reset by Successful Login
Preconditions:
*   A user account `user_csh` exists with password `pass123` and role `Cashier`.
*   The system's brute-force protection policy resets failed attempts upon a successful login.
*   The system is operational and the login screen is accessible.

Steps:
1.  Navigate to the login screen.
2.  For `user_csh`, perform 3 login attempts with an incorrect password (e.g., "wrongpass").
3.  Immediately after, attempt to log in with the *correct* username "user_csh" and password "pass123".
4.  Click the "Login" button.

Expected Result:
*   The system successfully logs in `user_csh`.
*   The user is redirected to the "Cashier Panel".
*   The counter for failed login attempts for `user_csh` is reset to 0.
*   Subsequent *failed* attempts (if any) would start counting from 1 again.