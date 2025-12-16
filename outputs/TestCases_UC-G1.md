### TC-001: Successfully Initialize Game with Valid Backend Parameters
Preconditions:
*   The GameClient software is installed, running, and in an "Idle" state.
*   The Backend Session Service is operational and accessible.
*   The Kiosk has triggered a "Start Session" command, which the GameClient has received.
Steps:
1.  The GameClient requests game parameters from the Backend Session Service.
2.  The Backend Session Service processes the request.
3.  The Backend Session Service returns valid game parameters (e.g., `difficulty: "Normal"`, `duration: 30 minutes`).
4.  The GameClient receives and processes the parameters.
5.  The GameClient generates a unique Session ID (e.g., `SID-XYZ-123`).
6.  The GameClient passes the parameters and Session ID to the Game Engine.
Expected Result:
*   The GameClient successfully processes the backend parameters.
*   A unique Session ID is generated and recorded.
*   The Game Engine initializes successfully with the provided parameters (difficulty, duration).
*   The Game Engine starts the gameplay.
*   The GameClient transitions from "Idle" to "In-Session" or "Playing" state.

### TC-002: Game Client Handles Backend Returning Invalid/Malformed Parameters
Preconditions:
*   The GameClient software is installed, running, and in an "Idle" state.
*   The Backend Session Service is operational and accessible, but configured to return invalid data for testing.
*   The Kiosk has triggered a "Start Session" command, which the GameClient has received.
Steps:
1.  The GameClient requests game parameters from the Backend Session Service.
2.  The Backend Session Service processes the request.
3.  The Backend Session Service returns malformed or invalid game parameters (e.g., `difficulty: "InvalidLevel"`, `duration: -10 minutes`, missing parameters, or non-JSON response).
4.  The GameClient attempts to parse and validate the received parameters.
Expected Result:
*   The GameClient detects the invalid/malformed parameters.
*   The GameClient logs a critical error regarding invalid backend parameters.
*   The GameClient attempts to fallback to a predefined "Default" or "Last Known" set of parameters from its local cache (if available).
*   If fallback is successful, the Game Engine starts in "Offline Mode" (as per UC-G1, İstisna Akış I1 logic).
*   If no valid fallback parameters are available, the GameClient displays an error message to the player ("Failed to start game: Invalid parameters") and remains in "Idle" state, without starting the Game Engine.

### TC-003: Game Client Handles Backend HTTP Error During Parameter Request
Preconditions:
*   The GameClient software is installed, running, and in an "Idle" state.
*   The Backend Session Service is configured to return an HTTP error (e.g., 500 Internal Server Error, 403 Forbidden) when requested for parameters.
*   The Kiosk has triggered a "Start Session" command, which the GameClient has received.
Steps:
1.  The GameClient requests game parameters from the Backend Session Service.
2.  The Backend Session Service responds with an HTTP error status code (e.g., 500).
3.  The GameClient receives the error response.
Expected Result:
*   The GameClient logs the HTTP error received from the backend.
*   The GameClient attempts to fallback to a predefined "Default" or "Last Known" set of parameters from its local cache.
*   If fallback is successful, the Game Engine starts in "Offline Mode".
*   If no valid fallback parameters are available, the GameClient displays an error message to the player ("Failed to start game: Backend error") and remains in "Idle" state, without starting the Game Engine.

### TC-004: Start Game Using Last Known Cached Parameters When Backend is Unreachable
Preconditions:
*   The GameClient software is installed, running, and in an "Idle" state.
*   The Backend Session Service is unreachable (e.g., network disconnected, service down).
*   The GameClient's local cache contains valid "Last Known" game parameters from a previous successful session.
*   The Kiosk has triggered a "Start Session" command, which the GameClient has received.
Steps:
1.  The GameClient requests game parameters from the Backend Session Service.
2.  The GameClient detects that the Backend Session Service is unreachable after a configured timeout.
3.  The GameClient attempts to load parameters from its local cache.
4.  The GameClient successfully retrieves "Last Known" parameters (e.g., `difficulty: "Hard"`, `duration: 45 minutes`).
5.  The GameClient generates a unique Session ID.
6.  The GameClient passes the cached parameters and Session ID to the Game Engine.
Expected Result:
*   The GameClient logs a warning indicating that the Backend Session Service is unreachable.
*   The GameClient successfully loads and uses the "Last Known" parameters from its local cache.
*   A unique Session ID is generated.
*   The Game Engine initializes and starts in "Offline Mode" with the "Last Known" parameters.
*   The GameClient transitions from "Idle" to "In-Session" (Offline Mode) state.

### TC-005: Start Game Using Default Cached Parameters When Backend is Unreachable and No Last Known
Preconditions:
*   The GameClient software is installed, running, and in an "Idle" state.
*   The Backend Session Service is unreachable.
*   The GameClient's local cache contains only "Default" game parameters, and no "Last Known" parameters are available (e.g., first start after cache clear, or never connected to backend).
*   The Kiosk has triggered a "Start Session" command, which the GameClient has received.
Steps:
1.  The GameClient requests game parameters from the Backend Session Service.
2.  The GameClient detects that the Backend Session Service is unreachable.
3.  The GameClient attempts to load parameters from its local cache.
4.  The GameClient retrieves "Default" parameters (e.g., `difficulty: "Easy"`, `duration: 20 minutes`).
5.  The GameClient generates a unique Session ID.
6.  The GameClient passes the default parameters and Session ID to the Game Engine.
Expected Result:
*   The GameClient logs a warning indicating that the Backend Session Service is unreachable.
*   The GameClient logs a message indicating it's using "Default" parameters.
*   The GameClient successfully loads and uses the "Default" parameters from its local cache.
*   A unique Session ID is generated.
*   The Game Engine initializes and starts in "Offline Mode" with the "Default" parameters.
*   The GameClient transitions from "Idle" to "In-Session" (Offline Mode) state.

### TC-006: Game Client Fails to Start When Backend Unreachable and Cache is Empty/Corrupt
Preconditions:
*   The GameClient software is installed, running, and in an "Idle" state.
*   The Backend Session Service is unreachable.
*   The GameClient's local cache is empty, non-existent, or corrupt, making it impossible to load "Default" or "Last Known" parameters.
*   The Kiosk has triggered a "Start Session" command, which the GameClient has received.
Steps:
1.  The GameClient requests game parameters from the Backend Session Service.
2.  The GameClient detects that the Backend Session Service is unreachable.
3.  The GameClient attempts to load parameters from its local cache.
4.  The GameClient fails to load any valid parameters from the local cache.
Expected Result:
*   The GameClient logs a critical error indicating both backend unreachability and cache failure.
*   The GameClient displays an error message to the player (e.g., "Failed to start game: No parameters available, please contact support.")
*   The GameClient remains in "Idle" state.
*   The Game Engine is NOT initialized or started.

### TC-007: Boundary Condition - Backend Returns Minimal Valid Parameters
Preconditions:
*   The GameClient software is installed, running, and in an "Idle" state.
*   The Backend Session Service is operational and accessible, configured to return parameters at their minimal valid boundary (e.g., `difficulty: "Easy"`, `duration: 5 minutes`, assuming these are the lowest allowed values).
*   The Kiosk has triggered a "Start Session" command, which the GameClient has received.
Steps:
1.  The GameClient requests game parameters from the Backend Session Service.
2.  The Backend Session Service returns the minimal valid game parameters.
3.  The GameClient receives and processes the parameters.
Expected Result:
*   The GameClient successfully processes the minimal valid backend parameters.
*   A unique Session ID is generated.
*   The Game Engine initializes successfully with the minimal valid parameters.
*   The Game Engine starts the gameplay as expected.

### TC-008: Boundary Condition - Backend Returns Maximal Valid Parameters
Preconditions:
*   The GameClient software is installed, running, and in an "Idle" state.
*   The Backend Session Service is operational and accessible, configured to return parameters at their maximal valid boundary (e.g., `difficulty: "Hard"`, `duration: 60 minutes`, assuming these are the highest allowed values).
*   The Kiosk has triggered a "Start Session" command, which the GameClient has received.
Steps:
1.  The GameClient requests game parameters from the Backend Session Service.
2.  The Backend Session Service returns the maximal valid game parameters.
3.  The GameClient receives and processes the parameters.
Expected Result:
*   The GameClient successfully processes the maximal valid backend parameters.
*   A unique Session ID is generated.
*   The Game Engine initializes successfully with the maximal valid parameters.
*   The Game Engine starts the gameplay as expected.