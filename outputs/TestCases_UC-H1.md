As a Senior QA Test Engineer, I have analyzed the provided BDD Feature and Scenarios. Below is a comprehensive set of test cases, covering positive, negative, boundary, and error conditions, adhering to the specified format and rules.

### TC-001: Display Global highscores successfully
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The Backend Score Service is running and accessible.
*   The Backend Score Service contains valid, sorted score data for the "Global" scope.

Steps:
1.  Configure the Highscore Display system to set the configuration scope to "Global".
2.  Observe the system requesting the score list from the Backend Score Service.

Expected Result:
1.  The system successfully receives a sorted list of scores for the "Global" scope from the Backend.
2.  The system displays the global highscores on the screen, optimized for large screens (e.g., Player A: 1000, Player B: 900, Player C: 800).
3.  The displayed scores automatically refresh every 30 seconds.

### TC-002: Display City highscores successfully
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The Backend Score Service is running and accessible.
*   The Backend Score Service contains valid, sorted score data for the "City" scope.

Steps:
1.  Configure the Highscore Display system to set the configuration scope to "City".
2.  Observe the system requesting the score list from the Backend Score Service.

Expected Result:
1.  The system successfully receives a sorted list of scores for the "City" scope from the Backend.
2.  The system displays the city-specific highscores on the screen, optimized for large screens (e.g., Player X: 500, Player Y: 450, Player Z: 400).
3.  The displayed scores automatically refresh every 30 seconds.

### TC-003: Display Zone highscores successfully
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The Backend Score Service is running and accessible.
*   The Backend Score Service contains valid, sorted score data for the "Zone" scope.

Steps:
1.  Configure the Highscore Display system to set the configuration scope to "Zone".
2.  Observe the system requesting the score list from the Backend Score Service.

Expected Result:
1.  The system successfully receives a sorted list of scores for the "Zone" scope from the Backend.
2.  The system displays the zone-specific highscores on the screen, optimized for large screens (e.g., Player P: 200, Player Q: 180, Player R: 160).
3.  The displayed scores automatically refresh every 30 seconds.

### TC-004: Display cached data when Backend is unreachable
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The system has previously fetched and stored valid score data in its "Local Cache".
*   The Backend Score Service is currently unreachable or down.

Steps:
1.  The system attempts to fetch the latest scores from the Backend Score Service.
2.  (Simulate Backend Score Service being unreachable, e.g., by shutting down the service or blocking network access to it).

Expected Result:
1.  The system detects that the Backend Score Service is unreachable.
2.  The system retrieves and displays the last valid data from its "Local Cache".
3.  An "Offline" indicator is prominently displayed on the screen to inform users of the backend status.
4.  The system continues attempting to re-establish connection and fetch new data from the Backend periodically in the background.

### TC-005: Display "No scores yet" when Backend returns an empty list
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The Backend Score Service is running and accessible.
*   The selected scope (e.g., a newly created zone or an old scope with no active players) currently has no score data recorded.

Steps:
1.  Configure the Highscore Display system to a scope for which the Backend is expected to return an empty list (e.g., "New Zone X").
2.  The system requests the score list from the Backend Score Service.
3.  The Backend returns an empty list for the selected scope.

Expected Result:
1.  The system displays a clear "No scores yet" placeholder message on the screen.
2.  The system continues checking for updates periodically (e.g., every 30 seconds) to determine if scores become available.

### TC-006: System loses its own network connection
Preconditions:
*   The Highscore Display system is powered on and currently displaying valid scores.
*   The Backend Score Service is running and accessible.

Steps:
1.  The system is displaying scores for a defined scope.
2.  (Simulate a loss of network connection for the Highscore Display System itself, e.g., disconnect its Ethernet cable or disable Wi-Fi).

Expected Result:
1.  The system should immediately detect the loss of its own network connection.
2.  The system should continue to display the *last successfully fetched scores*.
3.  An "Offline" or "Network Error" indicator specific to the display system's own connection status should be displayed.
4.  The system should actively attempt to re-establish its network connection.
5.  Once the network connection is restored, the system should automatically attempt to fetch the latest scores from the Backend.

### TC-007: Backend returns malformed or invalid score data
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The Backend Score Service is running and accessible.

Steps:
1.  (Configure the Backend Score Service to return malformed or invalid data for a specific scope, e.g., non-numeric scores, missing player names, scores in an unsorted order, or unexpected data types).
2.  Set the Highscore Display system to request scores for this configured scope.

Expected Result:
1.  The system should handle the malformed data gracefully without crashing or displaying raw error messages.
2.  Invalid entries should be skipped, potentially displaying a placeholder or an error for that specific entry.
3.  If the data is completely unusable, the system should display an appropriate error message (e.g., "Data Error", "Cannot Display Scores") or fall back to displaying cached data (if available and not corrupted).
4.  Relevant errors should be logged for diagnostic purposes.

### TC-008: Display a large number of scores (Boundary Condition)
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The Backend Score Service is running and accessible.
*   The selected scope (e.g., "Global") has a very large number of scores (e.g., 500 or 1000+ entries) stored in the Backend.

Steps:
1.  Configure the Highscore Display system to a scope with a large dataset.
2.  The system requests the score list from the Backend Score Service.

Expected Result:
1.  The system efficiently fetches and processes the large number of scores.
2.  The display remains responsive, without any noticeable performance degradation (e.g., freezing, slow loading, or delayed refreshes).
3.  All scores should be presented clearly, potentially using pagination, scrolling, or a condensed view optimized for large screens, as per design.
4.  Auto-refresh should continue to occur every 30 seconds, updating the large dataset without issues.

### TC-009: Auto-refresh mechanism verification
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The Backend Score Service is running and accessible.
*   Scores are currently being displayed for a defined scope.

Steps:
1.  Observe the initial score display and note the current time.
2.  (Approximately 20-25 seconds after the initial display/last refresh), update a score for one of the players in the Backend Score Service for the displayed scope.
3.  Wait for the auto-refresh interval (30 seconds) to elapse from the initial display/last refresh.

Expected Result:
1.  After approximately 30 seconds from the last data fetch, the display automatically refreshes.
2.  The updated score from the Backend is reflected on the screen.
3.  The refresh process is smooth, without screen flicker or noticeable interruption to the user experience.
4.  The timer for the next 30-second refresh interval should reset after the current refresh completes.

### TC-010: Handling of unconfigured or invalid scope input
Preconditions:
*   The Highscore Display system is powered on and connected to the network.
*   The Backend Score Service is running and accessible.

Steps:
1.  Attempt to set the configuration scope to an invalid or non-existent value (e.g., "Galaxy", "UnknownScopeID", an empty string, or a corrupted scope identifier).
2.  Observe the system's behavior when it attempts to fetch scores for this invalid scope.

Expected Result:
1.  The system should not crash or enter an unstable state.
2.  An appropriate error message should be displayed to the user (e.g., "Invalid Scope Configuration", "Scope Not Found").
3.  The system might default to a pre-defined fallback scope (e.g., "Global") or continue displaying the last valid scope's data.
4.  The system should log the attempt to use an invalid scope for debugging.