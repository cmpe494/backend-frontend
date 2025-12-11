Here are comprehensive test cases based on the provided BDD Feature and Scenarios:

### TC-001: Successfully Add a New Permission to an Existing Role
Preconditions:
*   Admin is logged in and on the "Role Management" screen.
*   The "Cashier" role exists in the system.
*   The "Cashier" role currently *does not* have the "View Reports" permission assigned.

Steps:
1.  Locate and select the "Cashier" role from the list of available roles.
2.  In the permissions section, find and select (e.g., check a checkbox for) the "View Reports" permission.
3.  Click the "Save Changes" button.

Expected Result:
*   A success message "Permissions updated successfully" is displayed to the Admin.
*   The system backend is updated, and the "Cashier" role now officially includes the "View Reports" permission.
*   The UI reflects the change (e.g., "View Reports" remains selected for "Cashier" if the role is re-selected).

### TC-002: Successfully Remove an Existing Permission from a Role
Preconditions:
*   Admin is logged in and on the "Role Management" screen.
*   The "Manager" role exists in the system.
*   The "Manager" role currently *does* have the "Edit Documents" permission assigned.

Steps:
1.  Locate and select the "Manager" role from the list of available roles.
2.  In the permissions section, find and de-select (e.g., uncheck a checkbox for) the "Edit Documents" permission.
3.  Click the "Save Changes" button.

Expected Result:
*   A success message "Permissions updated successfully" is displayed to the Admin.
*   The system backend is updated, and the "Manager" role no longer includes the "Edit Documents" permission.
*   The UI reflects the change (e.g., "Edit Documents" remains de-selected for "Manager" if the role is re-selected).

### TC-003: Successfully Modify Multiple Permissions for a Role (Add and Remove)
Preconditions:
*   Admin is logged in and on the "Role Management" screen.
*   The "Editor" role exists in the system.
*   The "Editor" role currently *does not* have "Create Pages" permission.
*   The "Editor" role currently *does* have "Delete Pages" permission.

Steps:
1.  Locate and select the "Editor" role from the list of available roles.
2.  In the permissions section, select "Create Pages" permission.
3.  In the permissions section, de-select "Delete Pages" permission.
4.  Click the "Save Changes" button.

Expected Result:
*   A success message "Permissions updated successfully" is displayed to the Admin.
*   The system backend is updated, and the "Editor" role now includes "Create Pages" and no longer includes "Delete Pages".
*   The UI reflects the change.

### TC-004: Attempt to Add an Already Existing Permission (Boundary Condition)
Preconditions:
*   Admin is logged in and on the "Role Management" screen.
*   The "Viewer" role exists in the system.
*   The "Viewer" role *already has* the "View Reports" permission assigned.

Steps:
1.  Locate and select the "Viewer" role.
2.  Attempt to select "View Reports" permission (which is already selected).
3.  Click the "Save Changes" button.

Expected Result:
*   The UI might prevent re-selection, or the "View Reports" permission remains selected without any visible change.
*   A success message "Permissions updated successfully" or "No changes detected, permissions already up to date" is displayed.
*   No actual modification is made to the backend as the permission already existed.

### TC-005: Saving Changes When No Modifications Were Made (Edge Case)
Preconditions:
*   Admin is logged in and on the "Role Management" screen.
*   The "Auditor" role exists in the system.

Steps:
1.  Locate and select the "Auditor" role.
2.  Make no changes to the permissions assigned to the "Auditor" role.
3.  Click the "Save Changes" button.

Expected Result:
*   The "Save Changes" button should ideally be disabled until a modification is made.
*   If the button is enabled and clicked, a message like "No changes to save" or "Permissions updated successfully" (indicating no actual change was committed) should be displayed.
*   No update operation is sent to the backend.

### TC-006: Prevent Saving with Explicitly Conflicting Permissions (Negative Test)
Preconditions:
*   Admin is logged in and on the "Role Management" screen.
*   Conflicting permissions such as "View Only" and "Edit All" are defined in the system.

Steps:
1.  Locate and select a role (e.g., "Reviewer").
2.  In the permissions section, select "View Only".
3.  Then, in the permissions section, attempt to select "Edit All".
4.  Click the "Save Changes" button.

Expected Result:
*   Upon attempting to select "Edit All" after "View Only", the system might proactively disable or grey out "Edit All" or display an immediate warning.
*   If both are selectable, upon clicking "Save Changes", the system should prevent the save operation.
*   An error message "Invalid permission combination" is displayed.
*   The role's permissions are not updated in the backend.

### TC-007: UI Prevents Selection of Conflicting Permissions (Proactive Error Prevention)
Preconditions:
*   Admin is logged in and on the "Role Management" screen.
*   Conflicting permissions such as "View Only" and "Edit All" are defined in the system and their conflict rules are implemented in the UI.

Steps:
1.  Locate and select a role (e.g., "Data Entry").
2.  In the permissions section, select "View Only".
3.  Attempt to select "Edit All".

Expected Result:
*   The "Edit All" permission checkbox/option is immediately greyed out, disabled, or an informative message appears explaining the conflict, preventing its selection while "View Only" is active.
*   The Admin is unable to select both conflicting permissions simultaneously.

### TC-008: Attempt to Save Without Selecting a Role (Error Condition)
Preconditions:
*   Admin is logged in and on the "Role Management" screen.

Steps:
1.  Do not select any role from the list.
2.  Attempt to click the "Save Changes" button (if it's enabled).

Expected Result:
*   The "Save Changes" button should be disabled until a role is selected.
*   If the button is enabled and clicked, a validation message "Please select a role to manage permissions" or similar is displayed.
*   No update operation is sent to the backend.

### TC-009: Backend Update Failure During Permission Save (Error Condition)
Preconditions:
*   Admin is logged in and on the "Role Management" screen.
*   The "Developer" role exists.
*   Simulate a backend error (e.g., database connection issue, invalid API response) during the permission update operation.

Steps:
1.  Locate and select the "Developer" role.
2.  Add a new permission, e.g., "Access Logs".
3.  Click the "Save Changes" button.

Expected Result:
*   An error message like "Failed to update permissions. Please try again later." or "A system error occurred." is displayed to the Admin.
*   The role's permissions are not updated in the backend.
*   The UI should ideally revert to its state before the save attempt or clearly indicate the failure.