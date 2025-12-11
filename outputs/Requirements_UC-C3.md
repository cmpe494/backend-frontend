# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The Backend System shall publish configuration messages to the Message Queue upon an Administrator saving new settings.
- **[FR-002]** Clients (e.g., KioskClient, GameClient) shall consume configuration messages from the Message Queue.
- **[FR-003]** Clients shall apply received configuration settings (e.g., new game prices) locally.
- **[FR-004]** Clients shall send an "Update Successful" acknowledgement to the Backend System upon successful application of new settings.
- **[FR-005]** The Message Queue shall retain configuration messages for clients that are currently offline.
- **[FR-006]** The Message Queue shall deliver retained configuration messages to a client immediately upon that client reconnecting.
- **[FR-007]** Clients shall validate received configuration messages against local rules.
- **[FR-008]** Clients shall reject configuration updates that violate local rules.
- **[FR-009]** Clients shall log a "Configuration Validation Error" when an invalid configuration is rejected.
- **[FR-010]** Clients shall continue operating with previous valid settings upon rejecting an invalid configuration.

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** The system shall distribute configuration changes asynchronously.
- **[NFR-002]** The system shall ensure configuration consistency across all connected clients within the facility.
- **[NFR-003]** The Message Queue shall provide message persistence to guarantee eventual delivery to clients that are temporarily offline.
- **[NFR-004]** Clients shall maintain operational continuity and availability when receiving and rejecting invalid configuration updates.