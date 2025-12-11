# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall authenticate users upon login.
-   **[FR-002]** The system shall authorize user access to Dashboard functionality based on assigned viewing permissions.
-   **[FR-003]** The system shall provide a mechanism for authorized users to navigate to the Dashboard.
-   **[FR-004]** The system shall request operational metrics from the Backend Data Service.
-   **[FR-005]** The system shall display "Zone Occupancy" metrics on the Dashboard using a Heatmap visualization.
-   **[FR-006]** The system shall display "Daily Revenue" metrics on the Dashboard using a Line Chart visualization.
-   **[FR-007]** The system shall display "Active Alerts" metrics on the Dashboard using a List View visualization.
-   **[FR-008]** The system shall display a "Data unavailable" warning when the Backend Data Service fails to respond.
-   **[FR-009]** The system shall display the last known cached operational metric values on the Dashboard when real-time data from the Backend Data Service is unavailable.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The system shall auto-refresh all displayed Dashboard data at an interval of 30 seconds.
-   **[NFR-002]** The system shall ensure the Dashboard remains populated with data (i.e., not a blank screen) when the Backend Data Service is unresponsive.