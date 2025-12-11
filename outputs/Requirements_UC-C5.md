# System Requirements Specification

## 1. Functional Requirements (FR)

-   **[FR-001]** The KioskClient shall detect the loss of global internet connectivity.
-   **[FR-002]** The KioskClient shall automatically transition to "Offline Mode" upon detecting global internet connectivity loss.
-   **[FR-003]** The KioskClient shall route all data requests to the "Local Backend IP" when operating in "Offline Mode".
-   **[FR-004]** The Local Backend shall provide data from its local database when accessed by a KioskClient operating in "Offline Mode".
-   **[FR-005]** The KioskClient shall detect the loss of connection to the Local Backend while operating in "Offline Mode".
-   **[FR-006]** The KioskClient shall display a "Service Unavailable - Network Error" screen upon detecting the loss of connection to the Local Backend.
-   **[FR-007]** The KioskClient shall cease accepting user requests upon detecting the loss of connection to the Local Backend.
-   **[FR-008]** The system shall identify user requests for services not supported in "Offline Mode".
-   **[FR-009]** The system shall deny user requests for services not supported in "Offline Mode".
-   **[FR-010]** The system shall display a "Feature not available offline" message when a request for an unsupported offline feature is denied.

## 2. Non-Functional Requirements (NFR)

-   **[NFR-001]** The system shall ensure the continuity of service during the transition to and operation in "Offline Mode".