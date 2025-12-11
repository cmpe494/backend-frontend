# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The System shall enable the KioskClient component to send validation requests to the Backend component upon user actions (e.g., card/QR scan or session start request).
-   **[FR-002]** The Backend component of the System shall verify user balance and permissions for received validation requests.
-   **[FR-003]** The Backend component of the System shall respond with "Access Granted" when user balance and permissions are successfully verified.
-   **[FR-004]** The KioskClient component of the System shall activate a game session upon receiving an "Access Granted" response.
-   **[FR-005]** The Backend component of the System shall respond with "Insufficient Balance" when the user's wallet has insufficient funds for a requested session.
-   **[FR-006]** The KioskClient component of the System shall display a "Please Top-up" message upon receiving an "Insufficient Balance" response.
-   **[FR-007]** The KioskClient component of the System shall detect the loss of connection to the Backend component.
-   **[FR-008]** The KioskClient component of the System shall switch to the "Offline Communication Strategy" (UC-C5) upon detecting a lost connection to the Backend component.
-   **[FR-009]** The KioskClient component of the System shall log connection failures.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The System shall facilitate and maintain an active low-latency connection between the KioskClient and the Backend components for real-time processing.
-   **[NFR-002]** The Backend component of the System shall respond to validation requests within 500 milliseconds.
-   **[NFR-003]** The KioskClient component of the System shall switch to the "Offline Communication Strategy" immediately upon detection of connection loss.