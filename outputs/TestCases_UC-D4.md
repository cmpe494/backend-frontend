### TC-001: Update Zone Capacity - Valid Input
Preconditions:
*   User is logged in as a Manager or Admin.
*   "VR Area" zone configuration exists and is accessible.
*   The "Capacity" parameter is editable.
Steps:
1.  Navigate to the "Zone" settings page.
2.  Select "VR Area" from the list of zones.
3.  Locate the "Capacity" parameter input field.
4.  Enter "15" into the "Capacity" field.
5.  Click the "Save" button.
Expected Result:
*   The system successfully validates the input.
*   A request is sent to the Backend Configuration Service to update the "VR Area" capacity.
*   A "Saved successfully" confirmation message is displayed.
*   The "Capacity" for "VR Area" is updated to "15" in the system and reflected on the UI.

### TC-002: Update Game Price - Valid Input
Preconditions:
*   User is logged in as a Manager or Admin.
*   "Street Fighter" game configuration exists and is accessible.
*   The "Price" parameter is editable.
Steps:
1.  Navigate to the "Game" settings page.
2.  Select "Street Fighter" from the list of games.
3.  Locate the "Price" parameter input field.
4.  Enter "20.00" into the "Price" field.
5.  Click the "Save" button.
Expected Result:
*   The system successfully validates the input.
*   A request is sent to the Backend Configuration Service to update the "Street Fighter" price.
*   A "Saved successfully" confirmation message is displayed.
*   The "Price" for "Street Fighter" is updated to "20.00" in the system and reflected on the UI.

### TC-003: Update Pricing Date Range - Valid Input
Preconditions:
*   User is logged in as a Manager or Admin.
*   "Weekend Promo" pricing configuration exists and is accessible.
*   The "Date Range" parameter is editable.
Steps:
1.  Navigate to the "Pricing" settings page.
2.  Select "Weekend Promo" from the list of pricing configurations.
3.  Locate the "Date Range" parameter input field (or date picker).
4.  Set the "Date Range" to "01-05 Oct" (assuming valid year for current context and '01 Oct' as start, '05 Oct' as end).
5.  Click the "Save" button.
Expected Result:
*   The system successfully validates the input.
*   A request is sent to the Backend Configuration Service to update the "Weekend Promo" date range.
*   A "Saved successfully" confirmation message is displayed.
*   The "Date Range" for "Weekend Promo" is updated to "01-05 Oct" in the system and reflected on the UI.

### TC-004: Update Zone Capacity - Invalid Non-Numeric Input
Preconditions:
*   User is logged in as a Manager or Admin.
*   "VR Area" zone configuration exists.
Steps:
1.  Navigate to the "Zone" settings page.
2.  Select "VR Area".
3.  Enter "abc" into the "Capacity" field.
4.  Click the "Save" button.
Expected Result:
*   The system should display a validation error message near the "Capacity" field (e.g., "Capacity must be a number" or "Invalid input for Capacity").
*   The update should *not* be sent to the Backend Configuration Service.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Capacity" value should remain unchanged.

### TC-005: Update Zone Capacity - Negative Value
Preconditions:
*   User is logged in as a Manager or Admin.
*   "VR Area" zone configuration exists.
Steps:
1.  Navigate to the "Zone" settings page.
2.  Select "VR Area".
3.  Enter "-5" into the "Capacity" field.
4.  Click the "Save" button.
Expected Result:
*   The system should display a validation error message near the "Capacity" field (e.g., "Capacity cannot be negative" or "Capacity must be a positive number").
*   The update should *not* be sent to the Backend Configuration Service.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Capacity" value should remain unchanged.

### TC-006: Update Zone Capacity - Boundary: Zero Value (if invalid)
Preconditions:
*   User is logged in as a Manager or Admin.
*   "VR Area" zone configuration exists.
*   Business rule: Capacity must be at least 1.
Steps:
1.  Navigate to the "Zone" settings page.
2.  Select "VR Area".
3.  Enter "0" into the "Capacity" field.
4.  Click the "Save" button.
Expected Result:
*   The system should display a validation error message near the "Capacity" field (e.g., "Capacity must be at least 1").
*   The update should *not* be sent to the Backend Configuration Service.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Capacity" value should remain unchanged.

### TC-007: Update Zone Capacity - Boundary: Max + 1 Value
Preconditions:
*   User is logged in as a Manager or Admin.
*   "VR Area" zone configuration exists.
*   Known maximum capacity for zones (e.g., 100).
Steps:
1.  Navigate to the "Zone" settings page.
2.  Select "VR Area".
3.  Enter "101" (assuming max is 100) into the "Capacity" field.
4.  Click the "Save" button.
Expected Result:
*   The system should display a validation error message near the "Capacity" field (e.g., "Capacity cannot exceed 100").
*   The update should *not* be sent to the Backend Configuration Service.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Capacity" value should remain unchanged.

### TC-008: Update Game Price - Invalid Non-Numeric Input
Preconditions:
*   User is logged in as a Manager or Admin.
*   "Street Fighter" game configuration exists.
Steps:
1.  Navigate to the "Game" settings page.
2.  Select "Street Fighter".
3.  Enter "twenty" into the "Price" field.
4.  Click the "Save" button.
Expected Result:
*   The system should display a validation error message near the "Price" field (e.g., "Price must be a valid currency amount" or "Invalid input for Price").
*   The update should *not* be sent to the Backend Configuration Service.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Price" value should remain unchanged.

### TC-009: Update Game Price - Negative Value
Preconditions:
*   User is logged in as a Manager or Admin.
*   "Street Fighter" game configuration exists.
Steps:
1.  Navigate to the "Game" settings page.
2.  Select "Street Fighter".
3.  Enter "-10.00" into the "Price" field.
4.  Click the "Save" button.
Expected Result:
*   The system should display a validation error message near the "Price" field (e.g., "Price cannot be negative" or "Price must be greater than or equal to zero").
*   The update should *not* be sent to the Backend Configuration Service.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Price" value should remain unchanged.

### TC-010: Update Game Price - Boundary: Too Many Decimal Places
Preconditions:
*   User is logged in as a Manager or Admin.
*   "Street Fighter" game configuration exists.
*   Business rule: Price allows up to 2 decimal places.
Steps:
1.  Navigate to the "Game" settings page.
2.  Select "Street Fighter".
3.  Enter "15.123" into the "Price" field.
4.  Click the "Save" button.
Expected Result:
*   The system should display a validation error message near the "Price" field (e.g., "Price can only have up to 2 decimal places").
*   The update should *not* be sent to the Backend Configuration Service.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Price" value should remain unchanged.

### TC-011: Create New Pricing Campaign - End Date Before Start Date
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Create New Pricing Campaign" page (or similar UI for creating a new pricing entry).
Steps:
1.  Set the "Start Date" to a future date (e.g., using a date picker, select "2023-10-10").
2.  Set the "End Date" to a date before the "Start Date" (e.g., select "2023-10-05").
3.  Fill in other mandatory fields for the campaign (if any).
4.  Click the "Save" or "Create Campaign" button.
Expected Result:
*   The system should display an "Invalid Date Range" error message (e.g., near the date fields or as a general form error).
*   The campaign should *not* be saved.
*   The system should prevent the user from proceeding or clearly highlight the error.

### TC-012: Update Pricing Date Range - Invalid Format
Preconditions:
*   User is logged in as a Manager or Admin.
*   "Weekend Promo" pricing configuration exists.
*   Expected date format is DD-MMM (e.g., "01-Oct").
Steps:
1.  Navigate to the "Pricing" settings page.
2.  Select "Weekend Promo".
3.  Enter "Oct 1 to Oct 5" (assuming this is an invalid format like text input instead of date picker or standard format "01-Oct - 05-Oct") into the "Date Range" field.
4.  Click the "Save" button.
Expected Result:
*   The system should display a validation error message near the "Date Range" field (e.g., "Invalid date format. Expected DD-MMM" or "Please use the date picker").
*   The update should *not* be sent to the Backend Configuration Service.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Date Range" value should remain unchanged.

### TC-013: Attempt to Update a Non-Existent Item
Preconditions:
*   User is logged in as a Manager or Admin.
Steps:
1.  Navigate to the "Game" settings page.
2.  Attempt to select or search for a non-existent game, e.g., type "Non-Existent Game 123" into the item selection field.
3.  If the UI allows it (e.g., search box autofill), fill in values for parameters and click "Save".
Expected Result:
*   The system should prevent selection of a non-existent item (e.g., "No results found", "Item not found" error if trying to search/select).
*   If, due to a bug, parameters are editable for a non-existent item, clicking "Save" should result in a server-side validation error like "Item 'Non-Existent Game 123' not found".
*   No update should be sent to the Backend Configuration Service.
*   No "Saved successfully" confirmation message should be displayed.

### TC-014: Attempt to Update Non-Applicable Parameter for an Item Type
Preconditions:
*   User is logged in as a Manager or Admin.
*   "VR Area" zone configuration exists.
Steps:
1.  Navigate to the "Zone" settings page.
2.  Select "VR Area".
3.  Attempt to locate or access a parameter that does not apply to zones (e.g., a "Pricing Model" field which is only relevant for games or pricing campaigns).
4.  If, due to a bug, such a field is present and editable, enter a value and click "Save".
Expected Result:
*   The UI should ideally only display parameters relevant to the selected item type (Zone).
*   If a non-applicable parameter is somehow edited, clicking "Save" should result in a validation error message (e.g., "Parameter 'Pricing Model' is not applicable for Zone configurations").
*   No update should be sent to the Backend Configuration Service.
*   No "Saved successfully" confirmation message should be displayed.

### TC-015: Attempt to Save Without Making Any Changes
Preconditions:
*   User is logged in as a Manager or Admin.
*   "VR Area" zone configuration exists.
Steps:
1.  Navigate to the "Zone" settings page.
2.  Select "VR Area".
3.  Do not modify any parameters (i.e., the displayed values are the same as the current saved values).
4.  Click the "Save" button.
Expected Result:
*   The system should ideally recognize that no changes have been made.
*   A message like "No changes detected" or "No updates to save" might be displayed, or the "Save" button could be disabled until a change is made.
*   No update request should be sent to the Backend Configuration Service (to avoid unnecessary load).
*   No "Saved successfully" confirmation message should be displayed, or a specific "No changes saved" message.

### TC-016: Attempt to Update Settings by a Non-Authorized User (Role-based access control)
Preconditions:
*   User is logged in with a non-Manager/non-Admin role (e.g., "Regular Staff" or a view-only role).
Steps:
1.  User attempts to navigate to any configuration settings page (Zone, Game, Pricing) using direct URL or menu.
2.  If access is unexpectedly granted, the user attempts to modify a parameter (e.g., "VR Area" Capacity) and click "Save".
Expected Result:
*   The user should be denied access to the configuration settings pages (e.g., redirected to dashboard, "Access Denied" message, or page not found).
*   Alternatively, if pages are accessible for viewing purposes, all configuration parameters and the "Save" button should be read-only/disabled.
*   If, due to a bug, a non-authorized user manages to click "Save", a "Permission Denied" or "Unauthorized Action" error should be displayed, and no changes should be persisted.

### TC-017: Backend Configuration Service Unavailable During Update
Preconditions:
*   User is logged in as a Manager or Admin.
*   "VR Area" zone configuration exists.
*   (Simulate) The Backend Configuration Service is down or unresponsive (e.g., through network proxy or test environment configuration).
Steps:
1.  Navigate to the "Zone" settings page.
2.  Select "VR Area".
3.  Update the "Capacity" parameter to "20".
4.  Click the "Save" button.
Expected Result:
*   The system should display an error message indicating a service issue (e.g., "Failed to save configuration. Please try again later." or "Backend service unreachable.").
*   The update should *not* be persisted.
*   The "Saved successfully" confirmation message should *not* be displayed.
*   The original "Capacity" value should remain unchanged.
*   The system should log the error for system administrators.