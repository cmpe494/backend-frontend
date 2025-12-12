# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall receive heartbeat signals from clients.
-   **[FR-002]** The system shall maintain the operational status of each connected client.
-   **[FR-003]** The system shall mark a client's status as "Active" upon successful reception of a heartbeat signal from that client.
-   **[FR-004]** The Dashboard shall display a "Green Light" indicator for clients marked as "Active".
-   **[FR-005]** The system shall detect when a client fails to send a heartbeat signal within its expected interval.
-   **[FR-006]** The system shall update a client's status to "Connection Lost/Passive" when a specified number of consecutive heartbeats from that client are missed.
-   **[FR-007]** The Dashboard shall update the indicator to "Red" for clients whose status is "Connection Lost/Passive".
-   **[FR-008]** The system shall trigger a "Critical Alert" for clients whose status remains "Connection Lost/Passive" beyond a specified duration.
-   **[FR-009]** The system shall send an email notification to the technical support team upon triggering a "Critical Alert".
-   **[FR-010]** The system shall send an SMS notification to the technical support team upon triggering a "Critical Alert".

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The system shall be capable of processing heartbeat signals received from clients at a frequency of approximately "10 seconds".
-   **[NFR-002]** The system shall consider a client's connection "lost" after missing "3" consecutive heartbeats from that client.
-   **[NFR-003]** The system shall trigger a "Critical Alert" if a client's status remains "Connection Lost/Passive" for more than "5 minutes".