# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The System shall receive heartbeat signals from connected clients.
-   **[FR-002]** The System shall process received heartbeat signals.
-   **[FR-003]** The System shall mark a client's status as "Active" upon successful receipt of a heartbeat.
-   **[FR-004]** The System shall display a "Green Light" indicator on the Dashboard for clients marked as "Active".
-   **[FR-005]** The System shall detect the absence of expected heartbeat signals from connected clients.
-   **[FR-006]** The System shall update a client's status to "Connection Lost/Passive" when a configurable number of consecutive heartbeats are missed.
-   **[FR-007]** The System shall display a "Red" indicator on the Dashboard for clients marked as "Connection Lost/Passive".
-   **[FR-008]** The System shall track the duration a client remains in the "Connection Lost/Passive" status.
-   **[FR-009]** The System shall trigger a "Critical Alert" if a client remains in "Connection Lost/Passive" status for a configurable duration.
-   **[FR-010]** The System shall send email notifications to predefined recipients for "Critical Alerts".
-   **[FR-011]** The System shall send SMS notifications to predefined recipients for "Critical Alerts".

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The System shall allow configuration of the expected heartbeat interval for clients (e.g., 10 seconds).
-   **[NFR-002]** The System shall allow configuration of the threshold (number of consecutive missed heartbeats) for transitioning a client to "Connection Lost/Passive" status (e.g., 3).
-   **[NFR-003]** The System shall allow configuration of the duration for triggering a "Critical Alert" from a "Connection Lost/Passive" status (e.g., 5 minutes).
-   **[NFR-004]** The System shall provide configurable options for recipients of "Critical Alert" email notifications.
-   **[NFR-005]** The System shall provide configurable options for recipients of "Critical Alert" SMS notifications.