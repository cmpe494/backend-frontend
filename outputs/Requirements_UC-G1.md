# System Requirements Specification

## 1. Functional Requirements (FR)

-   **[FR-001]** The system shall allow the Kiosk to trigger a "Start Session" command.
-   **[FR-002]** The GameClient shall be capable of an "Idle" state.
-   **[FR-003]** The GameClient shall receive the "Start Session" command.
-   **[FR-004]** The GameClient shall initialize a new game session upon receiving a start command.
-   **[FR-005]** The GameClient shall request game parameters from the Backend Session Service.
-   **[FR-006]** The Backend Session Service shall return valid game parameters, including difficulty and duration, upon request.
-   **[FR-007]** The GameClient shall generate a unique Session ID for each new game session.
-   **[FR-008]** The Game Engine shall initialize gameplay.
-   **[FR-009]** The Game Engine shall start gameplay.
-   **[FR-010]** The GameClient shall detect the unreachability of the Backend Session Service.
-   **[FR-011]** When the Backend Session Service is unreachable, the GameClient shall load game parameters from a local cache.
-   **[FR-012]** The GameClient shall support loading "Default" parameters from the local cache.
-   **[FR-013]** The GameClient shall support loading "Last Known" parameters from the local cache.
-   **[FR-014]** When the Backend Session Service is unreachable, the Game Engine shall start gameplay in "Offline Mode".

## 2. Non-Functional Requirements (NFR)

-   **[NFR-001]** The system shall maintain its ability to initiate a game session even when the Backend Session Service is unreachable (Resilience/Availability).