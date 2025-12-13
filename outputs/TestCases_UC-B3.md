Here are the comprehensive test cases generated from the provided BDD Feature/Scenario:

---

### TC-001: Successfully Create New "Cashier" Account
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
*   All mandatory fields are known and ready for input.
Steps:
1.  Click the "Create New Account" button/option.
2.  Enter valid and unique details for a new "Cashier" staff account (e.g., Username: `cashier_john`, First Name: `John`, Last Name: `Doe`, Email: `john.doe@example.com`).
3.  Select "Cashier" as the user role.
4.  Click the "Save" button.
Expected Result:
*   The system verifies the Admin's authorization level.
*   The new "Cashier" account is successfully created and persisted in the database.
*   A temporary password for `cashier_john` is generated and either displayed or sent to the provided email/Admin.
*   A "User created successfully" confirmation message is displayed on the screen.
*   The newly created user account appears in the user list.

### TC-002: Successfully Create New "Supervisor" Account
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
Steps:
1.  Click the "Create New Account" button/option.
2.  Enter valid and unique details for a new "Supervisor" staff account (e.g., Username: `sup_jane`, First Name: `Jane`, Last Name: `Smith`, Email: `jane.smith@example.com`).
3.  Select "Supervisor" as the user role.
4.  Click the "Save" button.
Expected Result:
*   The system verifies the Admin's authorization level.
*   The new "Supervisor" account is successfully created and persisted in the database.
*   A temporary password for `sup_jane` is generated.
*   A "User created successfully" confirmation message is displayed.
*   The newly created user account appears in the user list.

### TC-003: Account Creation with Existing Username
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
*   A user account with Username `existinguser` already exists in the system.
Steps:
1.  Click the "Create New Account" button/option.
2.  Enter details for a new account, using `existinguser` as the Username.
3.  Fill in other valid details and select a role.
4.  Click the "Save" button.
Expected Result:
*   The system prevents the creation of the account.
*   An error message such as "Username 'existinguser' already exists. Please choose a different username." is displayed.
*   The account is not created in the database.

### TC-004: Account Creation with Invalid Email Format
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
Steps:
1.  Click the "Create New Account" button/option.
2.  Enter valid and unique details for a new account, but provide an invalid email format (e.g., `invalid-email`).
3.  Fill in other valid details and select a role.
4.  Click the "Save" button.
Expected Result:
*   The system prevents the creation of the account.
*   An error message such as "Invalid email format. Please enter a valid email address." is displayed next to the email field.
*   The account is not created in the database.

### TC-005: Account Creation with Missing Mandatory Field (e.g., Username)
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
Steps:
1.  Click the "Create New Account" button/option.
2.  Leave the "Username" field blank.
3.  Fill in other mandatory fields (if applicable) and select a role.
4.  Click the "Save" button.
Expected Result:
*   The system prevents the creation of the account.
*   An error message such as "Username is a mandatory field." or "Please fill in all required fields." is displayed.
*   The account is not created in the database.

### TC-006: Account Creation with Max Length Input for Fields (Boundary - Positive)
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
*   Maximum allowed lengths for username, first name, last name, and email fields are known (e.g., Username: 30 chars, Names: 50 chars, Email: 100 chars).
Steps:
1.  Click the "Create New Account" button/option.
2.  Enter valid and unique details where each text field (Username, First Name, Last Name, Email) is populated with the maximum allowed number of characters.
3.  Select a valid user role.
4.  Click the "Save" button.
Expected Result:
*   The system accepts all input fields at their maximum defined lengths.
*   The account is successfully created in the database with all details correctly stored.
*   A "User created successfully" confirmation message is displayed.

### TC-007: Account Creation with Exceeded Max Length Input (Boundary - Negative)
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
*   Maximum allowed length for the Username field is known (e.g., 30 chars).
Steps:
1.  Click the "Create New Account" button/option.
2.  Enter a username that exceeds the maximum allowed length (e.g., 31 characters if max is 30).
3.  Fill in other valid and unique details and select a role.
4.  Click the "Save" button.
Expected Result:
*   The system prevents the creation of the account.
*   An error message such as "Username too long. Maximum allowed characters: 30." is displayed.
*   The account is not created in the database.

### TC-008: Unauthorized Account Creation by "Manager" Role (Attempts to create "Admin")
Preconditions:
*   A user with the "Manager" role is logged in.
*   The Manager is on the "User Management" screen (or attempts to navigate to it if restricted).
Steps:
1.  As the Manager, attempt to access the "Create New Account" functionality.
2.  If accessible, attempt to enter details for a new user and select "Admin" as the user role.
3.  Click the "Save" button.
Expected Result:
*   The system should deny the request to create an "Admin" account.
*   An "Insufficient privileges" error message is displayed.
*   The account is not created.

### TC-009: Unauthorized "Manager" Role Attempts to Create "Cashier" Account
Preconditions:
*   A user with the "Manager" role is logged in.
*   The Manager is on the "User Management" screen.
Steps:
1.  As the Manager, attempt to access the "Create New Account" functionality.
2.  If accessible, attempt to enter details for a new user and select "Cashier" as the user role.
3.  Click the "Save" button.
Expected Result:
*   Based on the feature statement "As an Admin I want to create and manage staff accounts", the system should deny the request.
*   An "Insufficient privileges" error message is displayed.
*   The account is not created.

### TC-010: Unauthorized Account Creation by "Staff" Role
Preconditions:
*   A user with a basic "Staff" role is logged in.
*   The Staff user attempts to access any "User Management" functionality.
Steps:
1.  As the Staff user, attempt to navigate to the "User Management" screen or access any account creation options.
Expected Result:
*   The system should deny access to the "User Management" screen or related functions.
*   An "Access Denied" or "Insufficient privileges" error message is displayed, or the option is not visible.

### TC-011: Successfully Reset Password for an Active User
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
*   An active user account (e.g., `user_A`) with a known current password exists.
Steps:
1.  Locate and select `user_A` from the user list.
2.  Click the "Reset Password" button/option.
3.  Confirm the password reset if a confirmation dialog appears.
Expected Result:
*   The system should generate a new temporary password for `user_A`.
*   The old password for `user_A` is immediately invalidated.
*   A confirmation message like "Password for user_A reset successfully. New temporary password: [temp_password]" or "A new temporary password has been generated and sent to the user's registered email." is displayed.

### TC-012: Verify Old Password Invalidation After Reset
Preconditions:
*   TC-011 has been successfully executed for `user_A`.
*   The old password for `user_A` is known.
Steps:
1.  Log out as Admin.
2.  Attempt to log in as `user_A` using their *old* password.
Expected Result:
*   The login attempt fails.
*   An "Invalid username or password" or "Incorrect credentials" error message is displayed.

### TC-013: Reset Password for a Locked/Inactive User (Edge Case)
Preconditions:
*   Admin is logged in.
*   Admin is on the "User Management" screen.
*   A user account (e.g., `locked_user`) exists and is currently in a 'locked' or 'inactive' state.
Steps:
1.  Locate and select `locked_user` from the user list.
2.  Click the "Reset Password" button/option.
3.  Confirm the password reset if prompted.
Expected Result:
*   The system generates a new temporary password for `locked_user`.
*   The old password for `locked_user` is invalidated.
*   If system policy dictates, the `locked_user` account state is changed from 'locked' to 'active' or 'unlocked' upon password reset.
*   A confirmation message indicating successful password reset is displayed.

### TC-014: Non-Admin Role Attempts to Reset Password
Preconditions:
*   A user with the "Manager" role (or any role other than Admin) is logged in.
*   The Manager is on the "User Management" screen (if they have access to view user profiles).
Steps:
1.  As the Manager, locate and select an existing user account.
2.  Attempt to click the "Reset Password" button/option (if visible).
Expected Result:
*   The "Reset Password" option should not be visible or should be disabled for non-Admin roles.
*   If a direct attempt is made (e.g., via API call or exploiting UI), the system should deny the request.
*   An "Insufficient privileges" or "Access Denied" error message is displayed.