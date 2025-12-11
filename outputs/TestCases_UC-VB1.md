### TC-001: Successful Encryption and Storage of Valid Credit Card Data

**Preconditions:**
*   User is logged in and on the Payment Profile screen.
*   The system's encryption module is fully operational and correctly configured.
*   Database connection is active and has sufficient storage capacity.

**Steps:**
1.  Navigate to the "Add Payment Method" section within the Payment Profile screen.
2.  Enter valid and complete credit card details (e.g., Card Number: `1234-5678-9012-3456`, Expiry Date: `12/25`, CVV: `123`).
3.  Click the "Save" or "Confirm" button.

**Expected Result:**
*   A "Data saved successfully" confirmation message is displayed on the screen.
*   The system makes an API call to the backend to save the data.
*   The credit card data is encrypted using the defined security protocol (e.g., AES-256) before being written to the database.
*   The database contains the encrypted string for the credit card details.
*   The original plaintext credit card data is NOT stored in the database.

### TC-002: Successful Encryption and Storage of Valid ID Data (Boundary: Minimum Length)

**Preconditions:**
*   User is logged in and on a secure data entry screen (e.g., Identity Verification).
*   The system's encryption module is fully operational and correctly configured.
*   Database connection is active and has sufficient storage capacity.
*   Specific fields have defined minimum length requirements for sensitive IDs (e.g., passport numbers, national IDs).

**Steps:**
1.  Navigate to the Identity Verification section.
2.  Enter valid ID information that meets the minimum length requirements for each field (e.g., a 9-digit Passport Number, a 7-digit National ID if applicable).
3.  Click the "Save" or "Submit" button.

**Expected Result:**
*   A "Data saved successfully" confirmation message is displayed.
*   The ID data is encrypted according to the defined security protocol.
*   The database contains the encrypted string for the ID details.
*   The original plaintext ID data is NOT stored in the database.

### TC-003: Successful Encryption with Maximum Allowed Data Length for Sensitive Field

**Preconditions:**
*   User is logged in and on a secure data entry screen (e.g., a form allowing sensitive notes).
*   The system's encryption module is fully operational.
*   Database connection is active.
*   Input fields for sensitive data have a defined maximum character limit (e.g., 255 characters).

**Steps:**
1.  Navigate to a secure data entry screen that accepts a free-text sensitive field.
2.  Enter sensitive information exactly up to the maximum allowed character limit (e.g., 255 characters of alphanumeric and special characters).
3.  Click the "Save" button.

**Expected Result:**
*   A "Data saved successfully" confirmation message is displayed.
*   The full maximum length data is encrypted and stored in the database without truncation or error.
*   The system handles the large input gracefully without performance degradation.

### TC-004: System Aborts Save Operation on Encryption Module Failure

**Preconditions:**
*   User is logged in and on a secure data entry screen.
*   **The encryption module is simulated to fail** (e.g., configured to return an error, timeout, or throw an exception) when processing data.
*   Database connection is active.

**Steps:**
1.  Enter sensitive information (e.g., Credit Card number, ID) into the required fields.
2.  Click the "Save" button.
3.  Observe the system's response due to the simulated encryption failure.

**Expected Result:**
*   The system immediately aborts the save operation.
*   An error message "Security check failed, please try again" is displayed to the user.
*   No new or updated data corresponding to this save attempt is written to the database.
*   Existing data in the database remains unchanged.
*   No sensitive plaintext data is exposed in logs or on the screen.

### TC-005: Data Integrity Check After Encryption Failure (No Partial Write)

**Preconditions:**
*   User is logged in and on a secure data entry screen.
*   **The encryption module is configured to simulate failure** during the encryption process.
*   Database connection is active.
*   A method exists to inspect database contents (e.g., using a DB client).

**Steps:**
1.  (Optional) Verify the current state of sensitive data in the database before the test (e.g., specific user has no payment profile).
2.  Enter sensitive information (e.g., a new Credit Card number).
3.  Click the "Save" button, triggering the simulated encryption failure.
4.  After the error message is displayed, attempt to query the database for the entered sensitive data (both plaintext and encrypted forms).

**Expected Result:**
*   The system displays the "Security check failed, please try again" error.
*   A query for the entered sensitive data (Credit Card number) in the database yields no results (neither encrypted nor plaintext).
*   There are no partially encrypted records or corrupted data entries in the database related to the failed attempt.

### TC-006: User Explicitly Cancels Data Entry

**Preconditions:**
*   User is logged in and on the secure data entry screen (e.g., Payment Profile or Identity Verification).

**Steps:**
1.  Navigate to the secure data entry screen.
2.  Enter partial or complete sensitive information into one or more fields (e.g., part of a Credit Card number, a name).
3.  Click the "Cancel" button or an equivalent "Back" button designed for cancellation.

**Expected Result:**
*   All data entered into the input fields is immediately cleared.
*   The user is navigated back to the previous screen or the main profile section without saving.
*   No data, partial or complete, is persisted to the database or temporary storage.

### TC-007: User Navigates Away from Screen After Data Entry

**Preconditions:**
*   User is logged in and on the secure data entry screen.
*   The application has standard navigation elements (e.g., header links, sidebar menu).

**Steps:**
1.  Navigate to the secure data entry screen.
2.  Enter sensitive information into one or more fields.
3.  Click on a different navigation link in the application (e.g., "Dashboard", "Settings").
4.  (If a confirmation dialog appears) Confirm navigation away without saving.

**Expected Result:**
*   (If applicable) A warning dialog "You have unsaved changes. Do you want to leave?" is displayed.
*   Upon confirming leaving (or if no dialog is present), the user is successfully navigated to the new page.
*   The sensitive data entered on the previous screen is discarded and not persisted to any storage (database or temporary session).

### TC-008: User Closes Browser/Tab After Entering Data

**Preconditions:**
*   User is logged in and on the secure data entry screen.
*   The browser is capable of being closed by the user.

**Steps:**
1.  Navigate to the secure data entry screen.
2.  Enter sensitive information into the fields (e.g., Credit Card, ID).
3.  Without clicking Save or Cancel, close the browser tab or the entire browser application.
4.  Reopen the application and navigate to the same secure data entry screen.

**Expected Result:**
*   The sensitive data entered before closing the browser is not present in the input fields upon returning to the screen.
*   No data is automatically saved or recovered from the previous session.
*   No data is persisted to the database.