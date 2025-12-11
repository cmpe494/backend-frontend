# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall generate a log entry when a specified event occurs (e.g., "User Login").
-   **[FR-002]** The system shall include a timestamp in each generated log entry.
-   **[FR-003]** The system shall transmit generated log entries to the Central Log Server.
-   **[FR-004]** The Central Log Server shall store received log entries in its database.
-   **[FR-005]** The system shall store log entries in a local buffer upon detection of a failed transmission to the Central Log Server.
-   **[FR-006]** The system shall periodically retry transmitting locally buffered log entries until successful delivery to the Central Log Server.
-   **[FR-007]** The system shall generate a "Transmission Delayed" warning locally upon a failed log transmission.
-   **[FR-008]** The Central Log Server shall support requests for logs filtered by a specific device.
-   **[FR-009]** The Central Log Server shall retrieve requested log entries from its database based on specified criteria.
-   **[FR-010]** The Central Log Server shall transmit retrieved log entries to the Admin's dashboard for viewing.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** (Resilience) The log transmission mechanism shall be resilient to temporary connection failures to the Central Log Server.
-   **[NFR-002]** (Reliability) The log transmission mechanism shall ensure the eventual successful delivery of log entries to the Central Log Server.