# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The KioskClient shall detect the loss of the global internet connection.
-   **[FR-002]** The system shall automatically switch to "Offline Mode" upon detecting the loss of the global internet connection.
-   **[FR-003]** When in "Offline Mode", the system shall route all data requests to the configured Local Backend IP.
-   **[FR-004]** When accessed by a KioskClient in "Offline Mode", the Local Backend shall provide data from its local database.
-   **[FR-005]** When in "Offline Mode", the KioskClient shall detect the loss of connection to the Local Backend.
-   **[FR-006]** When connection to the Local Backend is lost while in "Offline Mode", the KioskClient shall display a "Service Unavailable - Network Error" screen.
-   **[FR-007]** When connection to the Local Backend is lost while in "Offline Mode", the KioskClient shall cease accepting user requests.
-   **[FR-008]** When in "Offline Mode", the system shall deny user requests for services that are not supported offline (e.g., "Global Leaderboard").
-   **[FR-009]** When denying an unsupported service request in "Offline Mode", the system shall display a "Feature not available offline" message.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** **Service Continuity:** The system shall ensure seamless service continuity for customers during periods of global internet disconnection by operating in "Offline Mode".