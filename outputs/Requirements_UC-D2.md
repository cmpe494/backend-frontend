# System Requirements Specification

## 1. Functional Requirements (FR)

-   **[FR-001]** The system shall enable a logged-in user with viewing permissions to navigate to the Dashboard.
-   **[FR-002]** The system shall request operational metrics data from the Backend Data Service.
-   **[FR-003]** The system shall display Zone Occupancy metrics using a Heatmap visualization on the Dashboard.
-   **[FR-004]** The system shall display Daily Revenue metrics using a Line Chart visualization on the Dashboard.
-   **[FR-005]** The system shall display Active Alerts metrics using a List View visualization on the Dashboard.
-   **[FR-006]** The system shall automatically refresh the displayed operational metrics data every 30 seconds.
-   **[FR-007]** The system shall detect when the Backend Data Service fails to respond.
-   **[FR-008]** The system shall display a "Data unavailable" warning message when the Backend Data Service fails to respond.
-   **[FR-009]** The system shall display the last known cached operational metrics values on the Dashboard when the Backend Data Service fails to respond.

## 2. Non-Functional Requirements (NFR)

-   **[NFR-001]** The system shall ensure the timeliness and freshness of displayed operational metrics to support real-time facility performance monitoring.
-   **[NFR-002]** The system shall maintain high availability of Dashboard data display by utilizing cached data during Backend Data Service failures.