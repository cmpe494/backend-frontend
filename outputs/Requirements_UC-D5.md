# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The system shall provide a "Reports" screen for users with financial access.
- **[FR-002]** The system shall allow users to select a report type from available options (e.g., "Daily Sales").
- **[FR-003]** The system shall allow users to set a date range for report generation.
- **[FR-004]** The system shall provide a "Generate" action to initiate report creation based on selected criteria.
- **[FR-005]** The system shall retrieve report records from the Backend based on the applied report type and date range criteria.
- **[FR-006]** The system shall display the generated report in a table format.
- **[FR-007]** The system shall display a "No records found" message when the applied filters yield no results.
- **[FR-008]** The system shall suggest adjusting filters when no records are found for the specified criteria.
- **[FR-009]** The system shall detect when a requested report's data set (e.g., for "Last 5 Years") is too large to process efficiently.
- **[FR-010]** The system shall display a "Data range too large, please narrow your search" warning message when the data set is detected as too large.
- **[FR-011]** The system shall prevent the execution of a database query for report requests when the data set is detected as too large.

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** The system shall maintain performance and stability by preventing database queries for report requests that exceed predefined data volume thresholds. (Performance, Stability)
- **[NFR-002]** The system shall provide clear and actionable user feedback regarding report generation outcomes, including cases of no matching records or excessively large data requests, to enhance usability. (Usability)