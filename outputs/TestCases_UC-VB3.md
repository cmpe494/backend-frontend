### TC-001: Update and Propagate Global Settings Successfully
Preconditions:
*   The Admin is logged into the Central Management Console.
*   Multiple connected units (e.g., Unit-X, Unit-Y, Unit-Z) are online and accessible.
*   The "Security Level" setting exists and has predefined options.
Steps:
1.  Navigate to the settings section in the Central Management Console.
2.  Locate the "Security Level" setting.
3.  Update the "Security Level" setting to "High".
4.  Click the "Save Changes" button.
Expected Result:
*   The system should display a confirmation message like "Update successful".
*   The new "Security Level" value ("High") should be saved centrally in the configuration database.
*   A synchronization job should be triggered immediately to propagate the "Security Level" setting to all connected units (Unit-X, Unit-Y, Unit-Z).
*   All connected units should successfully receive and apply the updated "Security Level" setting.

### TC-002: Update and Propagate Multiple Global Settings Simultaneously
Preconditions:
*   The Admin is logged into the Central Management Console.
*   Multiple connected units are online and accessible.
*   Multiple settings (e.g., "Security Level", "Log Retention Days", "System Message") exist.
Steps:
1.  Navigate to the settings section.
2.  Update the "Security Level" setting to "Medium".
3.  Update the "Log Retention Days" numeric setting to "30".
4.  Update the "System Message" text setting to "System Maintenance Tonight".
5.  Click the "Save Changes" button.
Expected Result:
*   The system should display a confirmation message like "Update successful".
*   All updated settings should be saved centrally.
*   A synchronization job should be triggered to propagate all changes to connected units.
*   All connected units should successfully receive and apply all updated settings.

### TC-003: Validation of Numeric Field - Invalid Data Type
Preconditions:
*   The Admin is logged into the Central Management Console.
*   The "Timeout Duration" field is a numeric input field.
Steps:
1.  Navigate to the settings section.
2.  Locate the "Timeout Duration" setting.
3.  Enter the text "ABC" into the "Timeout Duration" field.
4.  Attempt to save the changes or move focus from the field (depending on validation trigger).
Expected Result:
*   The system should reject the input "ABC".
*   An error message like "Invalid format" or "Please enter a valid number" should be displayed next to the "Timeout Duration" field.
*   The changes should not be saved, and propagation should not be triggered.

### TC-004: Validation of Numeric Field - Below Minimum Boundary
Preconditions:
*   The Admin is logged into the Central Management Console.
*   The "Timeout Duration" field is a numeric input field with a defined minimum value (e.g., 5 seconds).
Steps:
1.  Navigate to the settings section.
2.  Locate the "Timeout Duration" setting.
3.  Enter the number "2" into the "Timeout Duration" field.
4.  Attempt to save the changes.
Expected Result:
*   The system should reject the input "2".
*   An error message like "Value must be at least 5" or "Input out of range" should be displayed.
*   The changes should not be saved, and propagation should not be triggered.

### TC-005: Validation of Text Field - Exceeding Maximum Length
Preconditions:
*   The Admin is logged into the Central Management Console.
*   The "System Message" field is a text input field with a defined maximum length (e.g., 100 characters).
Steps:
1.  Navigate to the settings section.
2.  Locate the "System Message" setting.
3.  Enter a string of characters exceeding the maximum allowed length (e.g., 150 characters) into the "System Message" field.
4.  Attempt to save the changes.
Expected Result:
*   The system should prevent entry of characters beyond the maximum limit, or truncate the input, or display an error message like "Maximum length exceeded".
*   If an error is displayed, the changes should not be saved.

### TC-006: Handling Partial Synchronization Failure for Specific Units
Preconditions:
*   The Admin is logged into the Central Management Console.
*   Multiple connected units are present (e.g., Unit-A, Unit-B, Unit-C, Unit-D).
*   Changes to settings have been saved centrally.
*   "Unit-A" and "Unit-B" are simulated to be offline or have network issues, causing sync failure.
*   "Unit-C" and "Unit-D" are online and capable of successful synchronization.
Steps:
1.  The Admin updates a setting (e.g., "Network Port") to a new value.
2.  The Admin saves the changes.
3.  The system attempts to propagate the changes to all connected units.
Expected Result:
*   The system should successfully propagate the changes to "Unit-C" and "Unit-D".
*   The system should detect and report the synchronization failures for "Unit-A" and "Unit-B" to the Admin.
*   A clear notification or dashboard status should indicate "Partial success with failures" or similar.
*   The system should provide detailed error logs or descriptions for why "Unit-A" and "Unit-B" failed (e.g., "Unit-A: Offline", "Unit-B: Connection Timeout").
*   The console should present an option to manually retry synchronization specifically for "Unit-A" and "Unit-B".

### TC-007: Handling Synchronization Failure for All Units
Preconditions:
*   The Admin is logged into the Central Management Console.
*   Multiple connected units are present (e.g., Unit-A, Unit-B, Unit-C).
*   All connected units are simulated to be offline or inaccessible, causing total sync failure.
*   Changes to settings have been saved centrally.
Steps:
1.  The Admin updates a setting (e.g., "Admin Password Policy") to a new value.
2.  The Admin saves the changes.
3.  The system attempts to propagate the changes to all connected units.
Expected Result:
*   The system should detect and report synchronization failures for all units (Unit-A, Unit-B, Unit-C) to the Admin.
*   A clear notification or dashboard status should indicate "Synchronization Failed for All Units" or similar.
*   Detailed error logs should be provided for each affected unit.
*   The console should present an option to manually retry synchronization for all failed units.

### TC-008: Manual Retry of Failed Synchronization (Success)
Preconditions:
*   The Admin is logged into the Central Management Console.
*   Scenario TC-006 has occurred, and "Unit-A" and "Unit-B" failed synchronization.
*   "Unit-A" has since been brought online and is now accessible.
*   "Unit-B" is still offline.
Steps:
1.  From the synchronization failure report, select "Unit-A" for retry.
2.  Initiate the manual retry process for "Unit-A".
Expected Result:
*   The system should successfully synchronize the pending changes to "Unit-A".
*   The status for "Unit-A" should update to "Synchronized" or "Successful".
*   The failure report should reflect that "Unit-A" is now successful, while "Unit-B" remains as failed.

### TC-009: Manual Retry of Failed Synchronization (Failure)
Preconditions:
*   The Admin is logged into the Central Management Console.
*   Scenario TC-006 has occurred, and "Unit-A" and "Unit-B" failed synchronization.
*   "Unit-B" is still offline and inaccessible.
Steps:
1.  From the synchronization failure report, select "Unit-B" for retry.
2.  Initiate the manual retry process for "Unit-B".
Expected Result:
*   The system should attempt synchronization for "Unit-B" but fail again.
*   The status for "Unit-B" should remain "Failed" or update to "Retry Failed".
*   New detailed error logs for the retry attempt should be available, indicating the continued reason for failure (e.g., "Unit-B: Still Offline").
*   The option to manually retry synchronization for "Unit-B" should remain available.

### TC-010: Propagate Changes when No Units Are Connected
Preconditions:
*   The Admin is logged into the Central Management Console.
*   No units are currently connected to the Central Management Console.
Steps:
1.  The Admin updates a setting (e.g., "Default Language") to a new value.
2.  The Admin saves the changes.
Expected Result:
*   The system should successfully save the new value centrally.
*   The system should indicate that the update was successful centrally, but no propagation occurred (as there are no units).
*   No errors related to synchronization should be displayed, as no sync was expected.
*   The UI should clearly convey that the setting is saved but pending propagation to units once they connect.