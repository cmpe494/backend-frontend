### TC-001: Generate Daily Revenue Report - Data from Cache
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   Valid cached data for "Daily Revenue Report" for the current date exists.
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Select the current date using the date picker.
3.  Click the "Generate Report" button.
Expected Result:
*   The system checks for and successfully retrieves data from the cache.
*   The "Daily Revenue Report" for the current date is displayed accurately within 5 seconds.
*   A loading indicator (if any) is shown during generation and disappears once the report is displayed.

### TC-002: Generate Daily Revenue Report - Data from Database (No Cache)
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   No valid cached data exists for "Daily Revenue Report" for the current date (e.g., cache is expired or never generated).
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Select the current date using the date picker.
3.  Click the "Generate Report" button.
Expected Result:
*   The system checks for cached data, finds none or invalid data, and successfully retrieves data from the database.
*   The "Daily Revenue Report" for the current date is displayed accurately within 5 seconds.

### TC-003: Generate Daily Revenue Report - For a Past Date
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   Data exists for a specific past date (e.g., yesterday).
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Select a specific past date (e.g., "Yesterday" or "01/15/2024") using the date picker.
3.  Click the "Generate Report" button.
Expected Result:
*   The system retrieves and displays the "Daily Revenue Report" for the selected past date.
*   The report is displayed accurately within 5 seconds.

### TC-004: Generate Report - No Data Available for Selected Criteria
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   For the selected report type and date (e.g., "Daily Revenue Report" for "01/01/2000"), no data exists in either cache or database.
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Select a date for which no data is expected (e.g., an extremely old or future date if allowed, or a known date with no transactions).
3.  Click the "Generate Report" button.
Expected Result:
*   The system completes the data retrieval process (from cache or DB).
*   A clear message indicating "No data available for the selected criteria" or "Report is empty" is displayed prominently within 5 seconds.
*   The report panel remains navigable, allowing the user to select other criteria.

### TC-005: Generate Report - Performance with Large Dataset
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   A report type (e.g., "Monthly Transaction Summary") has a very large volume of data for a specific date range.
Steps:
1.  From the report selection dropdown, select "Monthly Transaction Summary".
2.  Select a date range known to contain a high volume of data (e.g., last full year).
3.  Click the "Generate Report" button.
Expected Result:
*   The report accurately processes and displays the large dataset.
*   The entire report (or initial view) is displayed within the specified "5 seconds" performance threshold.
*   The UI remains responsive during and after report generation.

### TC-006: Unauthorized Access to Admin-Only Report by Manager
Preconditions:
*   User is logged in with the "Manager" role.
*   User is on the "Reports" panel.
*   "Full Audit Log" is an "Admin only" report.
Steps:
1.  As a "Manager", attempt to access the "Full Audit Log" report (e.g., by selecting it from a dropdown and clicking generate, or by attempting direct navigation if URLs are predictable).
Expected Result:
*   The system denies access to the report.
*   An "Access Denied" error message is prominently displayed.
*   The report content is not displayed.
*   (Boundary condition consideration): The "Full Audit Log" option should ideally be disabled or hidden for non-Admin roles.

### TC-007: Authorized Access to Admin-Only Report by Admin
Preconditions:
*   User is logged in with the "Admin" role.
*   User is on the "Reports" panel.
*   "Full Audit Log" is an "Admin only" report.
Steps:
1.  As an "Admin", select the "Full Audit Log" report from the available options.
2.  (If applicable) Select any necessary date ranges or filters.
3.  Click the "Generate Report" button.
Expected Result:
*   The system grants access to the report.
*   The "Full Audit Log" report is generated and displayed successfully within 5 seconds.

### TC-008: Export Displayed Report to PDF - Success
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   A report (e.g., "Daily Revenue Report" for current date) is currently displayed.
Steps:
1.  Click the "Download as PDF" button.
Expected Result:
*   The system generates a PDF file containing the content of the currently displayed report.
*   The browser triggers a download of the generated PDF file.
*   The downloaded file name is descriptive (e.g., "DailyRevenueReport_YYYYMMDD.pdf").
*   The PDF content accurately matches the displayed report.

### TC-009: Export to PDF - No Report Displayed
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   No report is currently displayed (e.g., the panel is empty or a generated report was cleared).
Steps:
1.  Attempt to click the "Download as PDF" button.
Expected Result:
*   The "Download as PDF" button is disabled or greyed out when no report is displayed.
*   If, due to a UI defect, the button is clickable, clicking it should result in an error message like "No report to export" and no PDF download initiated.

### TC-010: Export to PDF - Generation Failure
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   A report is currently displayed.
*   (Simulated Error Condition): The system encounters an error during PDF file generation (e.g., server resource exhaustion, invalid report data causing converter failure).
Steps:
1.  Click the "Download as PDF" button.
Expected Result:
*   An error message such as "Failed to generate PDF. Please try again later." is displayed.
*   No PDF file download is initiated.
*   The displayed report remains visible.

### TC-011: Generate Report - Invalid Future Date Selection
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
Steps:
1.  From the report selection dropdown, select "Daily Revenue Report".
2.  Attempt to select a future date (e.g., tomorrow's date) using the date picker.
3.  Click the "Generate Report" button.
Expected Result:
*   The date picker either prevents the selection of future dates (disables them).
*   OR, if a future date can be selected, clicking "Generate Report" displays an error message like "Cannot generate report for future dates."
*   No report is displayed for the future date.

### TC-012: Generate Another Report Type (e.g., Monthly Sales Summary)
Preconditions:
*   User is logged in with "Manager" or "Admin" role.
*   User is on the "Reports" panel.
*   Data exists for "Monthly Sales Summary" for a specific month.
Steps:
1.  From the report selection dropdown, select "Monthly Sales Summary".
2.  Select a valid month and year (e.g., "January 2024").
3.  Click the "Generate Report" button.
Expected Result:
*   The "Monthly Sales Summary" report for the selected month is displayed accurately within 5 seconds.
*   The report reflects the appropriate data and formatting for a monthly summary.