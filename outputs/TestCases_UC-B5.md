### TC-001: Successful Daily Revenue Report Generation
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   "Daily Revenue Report" data is available for the current date.
*   Valid cached data for the "Daily Revenue Report" for the current date is available.
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Ensure the date selector is set to the current date.
3.  Click the "Generate Report" button.
Expected Result:
*   The system should check for valid cached data.
*   The system should retrieve data from the cache.
*   The "Daily Revenue Report" for the current date should be displayed on the screen within 5 seconds.

### TC-002: Daily Revenue Report - No Valid Cached Data
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   "Daily Revenue Report" data is available for the current date in the database.
*   No valid cached data exists for the "Daily Revenue Report" for the current date (e.g., cache expired or invalidated).
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Ensure the date selector is set to the current date.
3.  Click the "Generate Report" button.
Expected Result:
*   The system should check for valid cached data and find none.
*   The system should retrieve data from the database.
*   The "Daily Revenue Report" for the current date should be displayed on the screen within 5 seconds.

### TC-003: Daily Revenue Report - No Data Available for Selected Period
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   No "Daily Revenue Report" data exists for the selected date (e.g., a future date, or a past date with no recorded transactions).
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Select a date for which no data is expected (e.g., a future date).
3.  Click the "Generate Report" button.
Expected Result:
*   The system retrieves data from the database.
*   The system displays a clear message indicating "No data available for the selected period" or similar.
*   An empty report layout with the "No data" message should be shown, or the report area should remain blank with the message.

### TC-004: Daily Revenue Report - Generation with Large Data Volume (Boundary)
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   "Daily Revenue Report" data for the selected period contains an exceptionally large volume of transactions (e.g., peak season for an entire year, or maximum allowable report period).
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Select a date range known to contain a high volume of data.
3.  Click the "Generate Report" button.
Expected Result:
*   The system retrieves and processes the large dataset.
*   The "Daily Revenue Report" with all relevant data should be displayed on the screen within 5 seconds. (Performance under load test).

### TC-005: Daily Revenue Report - Generation Exceeds Time Limit (Negative/Performance)
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   "Daily Revenue Report" data is available for the current date.
*   (Test environment is configured to simulate network latency, database slowness, or an artificially slow report generation process).
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Ensure the date selector is set to the current date.
3.  Click the "Generate Report" button.
Expected Result:
*   The report generation and display process takes longer than 5 seconds.
*   (Depending on system design) The system might display a loading indicator for an extended period, or eventually time out with an error message, or simply display the report after the specified time. This test confirms the failure to meet the 5-second SLA.

### TC-006: Unauthorized Access to Admin-Only Report by Manager
Preconditions:
*   User is logged in with the role "Manager".
*   User is on the "Reports" panel.
*   "Full Audit Log" report exists and is specifically configured as an "Admin only" report.
Steps:
1.  Attempt to select or access the "Full Audit Log" report (e.g., if visible but disabled, attempt to click; if accessible via URL, navigate directly).
2.  If a "Generate Report" button is available for this report, click it.
Expected Result:
*   The system should deny access to the "Full Audit Log" report.
*   A clear "Access Denied" error message should be displayed to the user.
*   The report content should not be displayed or generated.

### TC-007: Admin Successfully Accesses Admin-Only Report
Preconditions:
*   User is logged in with the role "Admin".
*   User is on the "Reports" panel.
*   "Full Audit Log" report exists and is configured as an "Admin only" report.
Steps:
1.  From the report selection dropdown, select "Full Audit Log".
2.  Select a valid date range for the audit log.
3.  Click the "Generate Report" button.
Expected Result:
*   The system should grant access to the "Full Audit Log" report.
*   The "Full Audit Log" report should be displayed on the screen within 5 seconds.

### TC-008: Manager Successfully Accesses Manager-Permitted Report
Preconditions:
*   User is logged in with the role "Manager".
*   User is on the "Reports" panel.
*   "Daily Revenue Report" report exists and is permitted for "Manager" roles.
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Select a valid date range.
3.  Click the "Generate Report" button.
Expected Result:
*   The system should grant access to the "Daily Revenue Report".
*   The "Daily Revenue Report" should be displayed on the screen within 5 seconds.

### TC-009: Successful PDF Export and Download of a Report
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   A report (e.g., "Daily Revenue Report") has been successfully generated and is currently displayed on the screen.
Steps:
1.  Locate and click the "Download as PDF" button.
Expected Result:
*   The system should successfully generate a PDF file corresponding to the currently displayed report.
*   The browser should trigger a download of the generated PDF file to the user's local machine.
*   The downloaded PDF file should be readable and contain the same data as the displayed report.

### TC-010: PDF Export - No Report Displayed (Error Condition)
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   No report is currently displayed (e.g., user just navigated to the panel, cleared a previous report, or a report failed to generate).
Steps:
1.  Attempt to click the "Download as PDF" button. (Assume the button is enabled but no report is present, or a user tries to bypass a disabled state).
Expected Result:
*   The "Download as PDF" button should ideally be disabled when no report is displayed.
*   If clicked, the system should display an error message such as "No report is currently displayed for export" or "Please generate a report first."
*   No PDF file should be generated or downloaded.

### TC-011: PDF Export - Report with Large Data Volume (Boundary/Performance)
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   A report containing a very large volume of data (e.g., hundreds or thousands of rows/multiple pages) has been successfully generated and is displayed.
Steps:
1.  Locate and click the "Download as PDF" button.
Expected Result:
*   The system should successfully generate a complete PDF file for the large report without errors.
*   The download should trigger and complete within a reasonable timeframe (e.g., a specified SLA for large report exports).
*   The downloaded PDF should accurately represent all data from the displayed report, including pagination if applicable.

### TC-012: PDF Export - Error During Generation (Error Handling)
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   A report is successfully generated and displayed.
*   (Test environment is configured to simulate an internal server error or a failure in the PDF generation service/library).
Steps:
1.  Locate and click the "Download as PDF" button.
Expected Result:
*   The system should display an error message such as "Failed to generate PDF. Please try again later." or "An unexpected error occurred during PDF generation."
*   No PDF file should be generated or downloaded.

### TC-013: PDF Content Verification - Accuracy
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   A report has been successfully generated and is displayed.
*   The PDF export functionality is operational.
Steps:
1.  Click "Download as PDF".
2.  Once downloaded, open the PDF file using a standard PDF viewer.
3.  Compare the content, layout, formatting, headers, footers, and all data points in the PDF with the displayed report on the screen.
Expected Result:
*   The content, formatting, layout, and data in the downloaded PDF file should be an exact and accurate rendition of the report displayed on the screen.
*   All visual elements, such as charts, tables, and text, should be correctly rendered in the PDF.

### TC-014: Report Generation for Invalid Date Format (Error Condition)
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   "Daily Revenue Report" is available.
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Manually enter an invalid date format (if the UI allows, e.g., "30-Feb-2023" or "ABC") into the date selector.
3.  Click the "Generate Report" button.
Expected Result:
*   The system should prevent generation or display a validation error message indicating "Invalid date format" or "Please enter a valid date".
*   The report should not be generated.

### TC-015: Attempt to Generate Non-Existent Report Type (Error Condition)
Preconditions:
*   User is logged in as a Manager or Admin.
*   User is on the "Reports" panel.
*   (Assume a scenario where a non-existent report type could somehow be requested, e.g., via API or manipulated UI request).
Steps:
1.  (Simulate an attempt to request a report type that does not exist in the system, e.g., via a backend call or by modifying a client-side request).
Expected Result:
*   The system should return an error message indicating "Report type not found" or "Invalid report selection".
*   No report should be generated or displayed.