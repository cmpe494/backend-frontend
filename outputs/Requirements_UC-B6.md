# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The system shall receive "Start Session" requests from KioskClients.
- **[FR-002]** The system shall validate the "Card ID" provided in a "Start Session" request.
- **[FR-003]** The system shall validate the "Game ID" provided in a "Start Session" request.
- **[FR-004]** The system shall retrieve the user's wallet balance associated with the provided "Card ID".
- **[FR-005]** The system shall determine the "Game Cost" associated with the provided "Game ID".
- **[FR-006]** The system shall compare the user's wallet balance against the "Game Cost".
- **[FR-007]** The system shall deduct the "Game Cost" from the user's wallet balance if the balance is greater than or equal to the "Game Cost".
- **[FR-008]** The system shall create a financial log entry for each successful cost deduction.
- **[FR-009]** The system shall send a "Session Authorized" response upon successful session authorization.
- **[FR-010]** The system shall send an "Insufficient Funds" error response when the user's wallet balance is less than the "Game Cost".
- **[FR-011]** The system shall ensure the user's wallet balance remains unchanged when a session is rejected due to insufficient funds.
- **[FR-012]** The system shall log a timeout error if the processing of a session request exceeds the defined response threshold.

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** The system shall send a response to a session request within 1 second of receiving the request.