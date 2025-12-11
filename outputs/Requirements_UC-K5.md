# System Requirements Specification

## 1. Functional Requirements (FR)

-   **[FR-001]** The system shall maintain the state of an ongoing game session.
-   **[FR-002]** The GameClient shall trigger a "Game Over" event.
-   **[FR-003]** The GameClient shall transmit score data to the Backend upon a "Game Over" event.
-   **[FR-004]** The Backend shall receive score data from the GameClient.
-   **[FR-005]** The Backend shall verify received score data.
-   **[FR-006]** The Backend shall process received score data.
-   **[FR-007]** The Backend shall return the processed score.
-   **[FR-008]** The Kiosk shall display the final score to the user.
-   **[FR-009]** The Kiosk shall redirect to the Main Screen after displaying the final score.
-   **[FR-010]** The system shall save score data locally when the connection to the Backend Score Service is lost.
-   **[FR-011]** The system shall queue locally saved score data for synchronization.
-   **[FR-012]** The system shall synchronize queued score data with the Backend when the connection to the Backend Score Service is restored.
-   **[FR-013]** The Kiosk shall display locally available score data to the user when the connection to the Backend Score Service is lost.

## 2. Non-Functional Requirements (NFR)

-   **[NFR-001]** The Kiosk shall display the final score to the user with immediate responsiveness after the game ends.
-   **[NFR-002]** The Kiosk shall implement a configurable delay before redirecting to the Main Screen.
-   **[NFR-003]** The system shall ensure reliability of score data capture by persisting data locally during network outages for subsequent synchronization.