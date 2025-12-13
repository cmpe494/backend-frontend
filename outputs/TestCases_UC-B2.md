### TC-001: Update Game Price to a Valid Value
Preconditions:
Admin is logged in with valid credentials.
Admin has the necessary permissions to access and modify System Configuration.
The System Configuration Menu is accessible.
The current Game Price is not "15.00".

Steps:
1. Navigate to the System Configuration menu.
2. Locate the "Game Price" setting field.
3. Enter "15.00" into the "Game Price" field.
4. Click the "Save Changes" button.

Expected Result:
The system should perform validation against business rules (e.g., price format, non-negative).
A "Settings updated successfully" message should be displayed.
The new Game Price of "15.00" should be successfully updated in the database, maintaining data integrity.
The updated configuration should be distributed to relevant system components.
The UI should reflect "15.00" as the current Game Price.

### TC-002: Verify Updated Game Price Persistence
Preconditions:
TC-001 has been executed successfully, and Game Price is set to "15.00".
Admin is logged in with valid credentials.

Steps:
1. Log out from the system.
2. Log back into the system as the Admin.
3. Navigate to the System Configuration menu.

Expected Result:
The "Game Price" setting field should display "15.00", confirming the value's persistence after log out/in.
Any operational areas that utilize the Game Price (e.g., game launch interface) should reflect the updated price of "15.00".

### TC-003: Update Zone Capacity to a Valid Value
Preconditions:
Admin is logged in with valid credentials.
Admin has the necessary permissions to access and modify System Configuration.
The System Configuration Menu is accessible.
The current Zone Capacity is not "100".

Steps:
1. Navigate to the System Configuration menu.
2. Locate the "Zone Capacity" setting field.
3. Enter "100" into the "Zone Capacity" field.
4. Click the "Save Changes" button.

Expected Result:
The system should perform validation against business rules (e.g., integer value, positive).
A "Settings updated successfully" message should be displayed.
The new Zone Capacity of "100" should be successfully updated in the database, maintaining data integrity.
The updated configuration should be distributed to relevant system components.
The UI should reflect "100" as the current Zone Capacity.

### TC-004: Verify Updated Zone Capacity Persistence
Preconditions:
TC-003 has been executed successfully, and Zone Capacity is set to "100".
Admin is logged in with valid credentials.

Steps:
1. Log out from the system.
2. Log back into the system as the Admin.
3. Navigate to the System Configuration menu.

Expected Result:
The "Zone Capacity" setting field should display "100", confirming the value's persistence after log out/in.
Any operational areas that utilize the Zone Capacity (e.g., zone management dashboard) should reflect the updated capacity of "100".

### TC-005: Update Multiple Configuration Settings Simultaneously
Preconditions:
Admin is logged in with valid credentials.
Admin has the necessary permissions to access and modify System Configuration.
The System Configuration Menu is accessible.
Current Game Price is not "16.50" and Current Zone Capacity is not "150".

Steps:
1. Navigate to the System Configuration menu.
2. Locate the "Game Price" setting field and enter "16.50".
3. Locate the "Zone Capacity" setting field and enter "150".
4. Click the "Save Changes" button.

Expected Result:
Both Game Price and Zone Capacity values should be validated against their respective business rules.
A "Settings updated successfully" message should be displayed.
Both new values ("16.50" for Game Price, "150" for Zone Capacity) should be successfully updated in the database, maintaining data integrity.
The updated configuration for both settings should be distributed to relevant system components.
The UI should reflect "16.50" for Game Price and "150" for Zone Capacity.

### TC-006: Attempt to Set Zone Capacity to a Negative Value
Preconditions:
Admin is logged in with valid credentials.
Admin has the necessary permissions to access and modify System Configuration.
The System Configuration Menu is accessible.

Steps:
1. Navigate to the System Configuration menu.
2. Locate the "Zone Capacity" setting field.
3. Enter "-5" into the "Zone Capacity" field.
4. Click the "Save Changes" button.

Expected Result:
The system should reject the update due to a business rule violation (capacity cannot be negative).
An error message like "Invalid numeric value" or "Business rule violation: Zone Capacity cannot be negative" should be displayed.
The database should remain unchanged for the "Zone Capacity" setting.
The previous, valid value for "Zone Capacity" should still be displayed or retained in the system.

### TC-007: Attempt to Set Zone Capacity to Zero (Boundary Condition)
Preconditions:
Admin is logged in with valid credentials.
Admin has the necessary permissions to access and modify System Configuration.
The System Configuration Menu is accessible.
Assume the business rule for Zone Capacity requires a value greater than 0.

Steps:
1. Navigate to the System Configuration menu.
2. Locate the "Zone Capacity" setting field.
3. Enter "0" into the "Zone Capacity" field.
4. Click the "Save Changes" button.

Expected Result:
The system should reject the update due to a business rule violation (capacity must be > 0).
An error message like "Business rule violation: Zone Capacity must be greater than zero" should be displayed.
The database should remain unchanged for the "Zone Capacity" setting.
The previous, valid value for "Zone Capacity" should still be displayed or retained in the system.

### TC-008: Attempt to Set Zone Capacity to a Non-Numeric String (Error Condition)
Preconditions:
Admin is logged in with valid credentials.
Admin has the necessary permissions to access and modify System Configuration.
The System Configuration Menu is accessible.

Steps:
1. Navigate to the System Configuration menu.
2. Locate the "Zone Capacity" setting field.
3. Enter "abc" into the "Zone Capacity" field.
4. Click the "Save Changes" button.

Expected Result:
The system should reject the update due to invalid data type.
An error message like "Invalid numeric value" or "Please enter a valid number for Zone Capacity" should be displayed.
The database should remain unchanged for the "Zone Capacity" setting.
The previous, valid value for "Zone Capacity" should still be displayed or retained in the system.

### TC-009: Attempt to Set Game Price to a Negative Value
Preconditions:
Admin is logged in with valid credentials.
Admin has the necessary permissions to access and modify System Configuration.
The System Configuration Menu is accessible.

Steps:
1. Navigate to the System Configuration menu.
2. Locate the "Game Price" setting field.
3. Enter "-10.00" into the "Game Price" field.
4. Click the "Save Changes" button.

Expected Result:
The system should reject the update due to a business rule violation (price cannot be negative).
An error message like "Invalid numeric value" or "Business rule violation: Game Price cannot be negative" should be displayed.
The database should remain unchanged for the "Game Price" setting.
The previous, valid value for "Game Price" should still be displayed or retained in the system.

### TC-010: Attempt to Set Game Price with Excessive Decimal Places (Error Condition)
Preconditions:
Admin is logged in with valid credentials.
Admin has the necessary permissions to access and modify System Configuration.
The System Configuration Menu is accessible.
Assume the business rule for Game Price allows a maximum of 2 decimal places.

Steps:
1. Navigate to the System Configuration menu.
2. Locate the "Game Price" setting field.
3. Enter "15.123" into the "Game Price" field.
4. Click the "Save Changes" button.

Expected Result:
The system should reject the update or automatically round the value based on specific business rules.
If rejected, an error message like "Invalid price format: Maximum 2 decimal places allowed" should be displayed. The database should remain unchanged.
If rounded, the system should save "15.12", display a success message, and the database should be updated to "15.12". (Assuming rejection based on strict validation for this TC).
The previous, valid value for "Game Price" should still be displayed or retained in the system if rejected.