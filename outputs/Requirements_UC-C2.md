# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The KioskClient shall detect user card and QR scans.
-   **[FR-002]** The KioskClient shall send a validation request to the Backend upon a user action requiring session start (e.g., card/QR scan).
-   **[FR-003]** The Backend shall verify the user's balance.
-   **[FR-004]** The Backend shall verify the user's permissions.
-   **[FR-005]** The Backend shall respond with "Access Granted" if the user's balance and permissions are valid.
-   **[FR-006]** The KioskClient shall activate the game session upon receiving an "Access Granted" response from the Backend.
-   **[FR-007]** The Backend shall respond with "Insufficient Balance" if the user's wallet has insufficient funds.
-   **[FR-008]** The KioskClient shall display a "Please Top-up" message upon receiving an "Insufficient Balance" response.
-   **[FR-009]** The KioskClient shall detect the loss of connection to the Backend.
-   **[FR-010]** The KioskClient shall switch to an "Offline Communication Strategy" (UC-C5) upon detecting a connection loss to the Backend.
-   **[FR-011]** The KioskClient shall log connection failures.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The KioskClient shall maintain an active low-latency connection to the Backend. (Connectivity/Availability)
-   **[NFR-002]** The Backend shall respond to real-time validation requests within 500 milliseconds. (Performance/Response Time)
-   **[NFR-003]** The KioskClient shall immediately switch to the "Offline Communication Strategy" upon detecting connection loss. (Performance/Responsiveness)
-   **[NFR-004]** The system shall provide immediate responses for user actions to ensure a fluid and responsive user experience. (Usability/Performance)