# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The system shall establish and manage a connection to the Backend Server.
- **[FR-002]** The system shall display the welcome screen to the user upon startup or after specific interactions.
- **[FR-003]** The system shall be capable of reading valid RF Card data.
- **[FR-004]** The system shall be capable of reading valid QR Code data.
- **[FR-005]** The system shall extract ID data from scanned RF Cards or QR Codes.
- **[FR-006]** The system shall transmit extracted ID data to the Backend Authentication Service.
- **[FR-007]** The system shall receive authentication verification status from the Backend Authentication Service.
- **[FR-008]** The system shall receive user details and the current balance from the Backend upon successful authentication.
- **[FR-009]** The system shall redirect the user to the Main Menu upon successful authentication.
- **[FR-010]** The system shall detect failed attempts to scan unreadable or damaged RF Cards or QR Codes.
- **[FR-011]** The system shall display a "Read error, please try again" warning message when a scan fails.
- **[FR-012]** The system shall retain the user on the welcome screen following a scan error.
- **[FR-013]** The system shall process a "user not registered" response from the Backend Authentication Service.
- **[FR-014]** The system shall display a "User not registered" error message when the Backend indicates the user is not registered.
- **[FR-015]** The system shall prevent access to the Main Menu if the user is not registered.
- **[FR-016]** The system shall detect the loss of connection to the Backend Authentication Service during a login attempt.
- **[FR-017]** The system shall display an "Offline mode - Service unavailable" error message upon detecting a lost connection to the Backend Service.
- **[FR-018]** The system shall terminate the login attempt when the connection to the Backend Service is lost.

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** The Kiosk terminal shall be available for user interaction when active.
- **[NFR-002]** The system shall maintain a reliable connection to the Backend Server.