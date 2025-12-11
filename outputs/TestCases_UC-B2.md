### TC-001: Admin successfully updates Game Price
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   System is in a stable state with default or existing configuration settings.
*   Business Rule for Game Price: Must be a positive numeric value, up to two decimal places, minimum 1.00.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Game Price" setting.
3.  Change the value of "Game Price" to "15.00".
4.  Click the "Save Changes" button.

Expected Result:
*   The system validates "15.00" against business rules (e.g., positive, valid format).
*   The updated "Game Price" (15.00) is successfully saved to the database, maintaining data integrity.
*   The new configuration (15.00) is distributed to all relevant components (e.g., game servers, billing modules).
*   A success message "Settings updated successfully" is displayed to the Admin.
*   The displayed "Game Price" in the configuration menu reflects "15.00".

### TC-002: Admin successfully updates Zone Capacity
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   System is in a stable state with default or existing configuration settings.
*   Business Rule for Zone Capacity: Must be a positive integer value, minimum 1.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Zone Capacity" setting.
3.  Change the value of "Zone Capacity" to "100".
4.  Click the "Save Changes" button.

Expected Result:
*   The system validates "100" against business rules (e.g., positive, integer).
*   The updated "Zone Capacity" (100) is successfully saved to the database, maintaining data integrity.
*   The new configuration (100) is distributed to all relevant components (e.g., zone management services).
*   A success message "Settings updated successfully" is displayed to the Admin.
*   The displayed "Zone Capacity" in the configuration menu reflects "100".

### TC-003: Admin updates Game Price to its minimum valid value
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Game Price: Minimum allowed value is 1.00.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Game Price" setting.
3.  Change the value of "Game Price" to "1.00".
4.  Click the "Save Changes" button.

Expected Result:
*   The system validates "1.00" against business rules.
*   The updated "Game Price" (1.00) is successfully saved to the database and distributed.
*   A success message "Settings updated successfully" is displayed.
*   The displayed "Game Price" in the configuration menu reflects "1.00".

### TC-004: Admin updates Zone Capacity to its minimum valid value
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Zone Capacity: Minimum allowed value is 1.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Zone Capacity" setting.
3.  Change the value of "Zone Capacity" to "1".
4.  Click the "Save Changes" button.

Expected Result:
*   The system validates "1" against business rules.
*   The updated "Zone Capacity" (1) is successfully saved to the database and distributed.
*   A success message "Settings updated successfully" is displayed.
*   The displayed "Zone Capacity" in the configuration menu reflects "1".

### TC-005: Admin attempts to set Zone Capacity to a negative value (Error Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Zone Capacity: Must be a positive integer.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Zone Capacity" setting.
3.  Attempt to change the value of "Zone Capacity" to "-5".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update due to a business rule violation.
*   An error message such as "Invalid numeric value" or "Business rule violation: Zone Capacity must be a positive integer" should be displayed.
*   The database should remain unchanged for the "Zone Capacity" setting.
*   The displayed "Zone Capacity" in the configuration menu should revert to its previous valid value or remain unchanged if the UI prevents saving.

### TC-006: Admin attempts to set Game Price to a negative value (Error Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Game Price: Must be a positive numeric value.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Game Price" setting.
3.  Attempt to change the value of "Game Price" to "-10.50".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update due to a business rule violation.
*   An error message such as "Invalid numeric value" or "Business rule violation: Game Price must be a positive number" should be displayed.
*   The database should remain unchanged for the "Game Price" setting.
*   The displayed "Game Price" in the configuration menu should revert to its previous valid value or remain unchanged if the UI prevents saving.

### TC-007: Admin attempts to set Game Price to zero (Boundary/Error Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Game Price: Minimum allowed value is 1.00 (cannot be zero).

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Game Price" setting.
3.  Attempt to change the value of "Game Price" to "0.00".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update due to a business rule violation.
*   An error message such as "Business rule violation: Game Price cannot be zero" or "Value below minimum allowed" should be displayed.
*   The database should remain unchanged for the "Game Price" setting.

### TC-008: Admin attempts to set Zone Capacity to zero (Boundary/Error Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Zone Capacity: Minimum allowed value is 1 (cannot be zero).

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Zone Capacity" setting.
3.  Attempt to change the value of "Zone Capacity" to "0".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update due to a business rule violation.
*   An error message such as "Business rule violation: Zone Capacity cannot be zero" or "Value below minimum allowed" should be displayed.
*   The database should remain unchanged for the "Zone Capacity" setting.

### TC-009: Admin attempts to set Game Price with non-numeric input (Error Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Game Price" setting.
3.  Attempt to change the value of "Game Price" to "abc".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update.
*   An error message such as "Invalid numeric value" or "Please enter a valid number" should be displayed.
*   The database should remain unchanged for the "Game Price" setting.

### TC-010: Admin attempts to set Zone Capacity with non-numeric input (Error Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Zone Capacity" setting.
3.  Attempt to change the value of "Zone Capacity" to "XYZ".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update.
*   An error message such as "Invalid numeric value" or "Please enter a valid integer" should be displayed.
*   The database should remain unchanged for the "Zone Capacity" setting.

### TC-011: Admin attempts to set Zone Capacity with a decimal value (Error Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Zone Capacity: Must be an integer.

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Zone Capacity" setting.
3.  Attempt to change the value of "Zone Capacity" to "10.5".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update due to a business rule violation.
*   An error message such as "Invalid integer value" or "Business rule violation: Zone Capacity must be a whole number" should be displayed.
*   The database should remain unchanged for the "Zone Capacity" setting.

### TC-012: Admin attempts to set Game Price exceeding maximum allowed value (Boundary Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Game Price: Maximum allowed value is 999.99 (assumption for this test case).

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Game Price" setting.
3.  Attempt to change the value of "Game Price" to "1000.00".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update due to a business rule violation.
*   An error message such as "Value exceeds maximum allowed" or "Business rule violation: Game Price cannot exceed 999.99" should be displayed.
*   The database should remain unchanged for the "Game Price" setting.

### TC-013: Admin attempts to set Zone Capacity exceeding maximum allowed value (Boundary Condition)
Preconditions:
*   Admin is logged in and has access permissions to the System Configuration menu.
*   Business Rule for Zone Capacity: Maximum allowed value is 500 (assumption for this test case).

Steps:
1.  Navigate to the System Configuration menu.
2.  Locate the "Zone Capacity" setting.
3.  Attempt to change the value of "Zone Capacity" to "501".
4.  Click the "Save Changes" button.

Expected Result:
*   The system should reject the update due to a business rule violation.
*   An error message such as "Value exceeds maximum allowed" or "Business rule violation: Zone Capacity cannot exceed 500" should be displayed.
*   The database should remain unchanged for the "Zone Capacity" setting.