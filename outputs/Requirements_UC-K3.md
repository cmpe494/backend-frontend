# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall initiate a request for zone capacity status to the Backend service.
-   **[FR-002]** The system shall process the zone capacity status response received from the Backend service.
-   **[FR-003]** The system shall, upon receiving an "Available" zone capacity status, allow the user to proceed to payment or game start.
-   **[FR-004]** The system shall, upon receiving a "Full" zone capacity status, display a warning message stating "Zone is currently full, please wait".
-   **[FR-005]** The system shall, upon receiving a "Full" zone capacity status, prevent the game from starting.
-   **[FR-006]** The system shall, in the event of a Backend Zone Service timeout, retrieve the last known zone capacity status from its local cache.
-   **[FR-007]** The system shall, in the event of a Backend Zone Service timeout, make user flow decisions based on the retrieved cached zone capacity status.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The system shall be resilient to network or service failures of the Backend Zone Service.
-   **[NFR-002]** The system shall ensure availability of zone capacity checks by employing a caching mechanism for fallback scenarios.