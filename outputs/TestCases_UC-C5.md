### TC-001: Automatic Switch to Offline Mode upon Global Internet Loss
Preconditions:
*   The KioskClient is powered on and currently connected to the global internet.
*   A Local Backend instance is active, reachable on the LAN, and configured with local data.
*   The KioskClient's "Offline Mode" detection threshold is set to an appropriate value (e.g., 10 seconds without internet).
Steps:
1.  Verify the KioskClient is operating in "Online Mode".
2.  Physically or programmatically disconnect the KioskClient's global internet connection (e.g., unplug WAN cable, disable WAN interface).
3.  Wait for a duration exceeding the KioskClient's internet loss detection threshold.
4.  Attempt to perform an action on the KioskClient that requires data (e.g., browse products, initiate a game).
Expected Result:
*   The KioskClient automatically detects the global internet loss.
*   The KioskClient transitions its operational state to "Offline Mode".
*   All subsequent data requests are automatically routed to the Local Backend IP address.
*   The KioskClient successfully retrieves data from the Local Backend and continues to serve the requested action seamlessly.

### TC-002: Seamless Service Continuity in Offline Mode
Preconditions:
*   The system is in "Offline Mode" due to global internet disconnection.
*   The KioskClient is actively connected and communicating with the Local Backend.
*   The Local Backend's database contains relevant and up-to-date local service data.
Steps:
1.  Perform a variety of user actions on the KioskClient that involve data retrieval and local processing (e.g., navigate through different product categories, complete a local transaction, submit a score to a local leaderboard, view local information screens).
2.  Monitor network traffic to confirm all data requests are directed to the Local Backend's IP address and port.
3.  Verify the integrity and accuracy of the data displayed or processed against the Local Backend's database.
Expected Result:
*   All user actions are processed successfully without any noticeable delay or degradation in performance.
*   Network logs confirm exclusive communication with the Local Backend for all data requests.
*   The KioskClient provides a seamless and uninterrupted service experience to the customer, using data provided by the Local Backend.

### TC-003: Graceful Handling of Brief Global Internet Fluctuations (Boundary Condition)
Preconditions:
*   The KioskClient is initially in "Online Mode".
*   The Local Backend is available and operational on the LAN.
*   The KioskClient's internet loss detection and recovery thresholds are configured.
Steps:
1.  Simulate a brief global internet disconnection (e.g., disconnect WAN for 2-5 seconds) and then immediately restore it.
2.  Observe the KioskClient's mode (Online/Offline) and network status indicators during and after the fluctuation.
3.  Immediately perform a data request (e.g., load a page) after the internet is restored.
4.  Repeat steps 1-3 multiple times.
Expected Result:
*   The KioskClient should not immediately switch to "Offline Mode" for very brief internet disconnections (i.e., less than the detection threshold).
*   It should attempt to re-establish the global internet connection if the outage is short.
*   If the KioskClient briefly transitions to "Offline Mode" during the fluctuation, it should swiftly and automatically switch back to "Online Mode" once the global internet connection is stable.
*   Service should remain largely uninterrupted, or recover very quickly without requiring manual intervention.

### TC-004: Displaying "Service Unavailable" Screen upon Local Backend Connection Loss
Preconditions:
*   The system is in "Offline Mode" (global internet disconnected).
*   The KioskClient is actively communicating with the Local Backend.
Steps:
1.  Simulate the connection to the Local Backend being lost (e.g., unplug the LAN cable connecting the KioskClient to the Local Backend, or shut down the Local Backend server).
2.  Immediately attempt to interact with the KioskClient (e.g., tap on the screen, press a physical button, initiate a new request).
Expected Result:
*   The KioskClient promptly detects the loss of connection to the Local Backend.
*   The KioskClient immediately displays a "Service Unavailable - Network Error" screen (or equivalent explicit message) to the user.
*   Any ongoing requests or transactions are gracefully terminated or show an error.
*   The KioskClient clearly indicates that it can no longer provide service.

### TC-005: Preventing User Interaction After Local Backend Connection Loss (Negative)
Preconditions:
*   The system is in "Offline Mode".
*   The "Service Unavailable - Network Error" screen is currently displayed due on the KioskClient due to the loss of connection to the Local Backend.
Steps:
1.  Attempt to interact with all available user interface elements on the KioskClient (e.g., touch screen, physical buttons, navigation controls).
2.  Attempt to bypass or close the "Service Unavailable" message.
Expected Result:
*   The KioskClient does not respond to any user inputs while the "Service Unavailable - Network Error" screen is active.
*   The screen remains static, preventing any further user interaction or navigation.
*   No new user requests are accepted or processed.

### TC-006: Recovery from Local Backend Connection Loss in Offline Mode
Preconditions:
*   The system is in "Offline Mode".
*   The "Service Unavailable - Network Error" screen is displayed on the KioskClient due to a lost connection to the Local Backend.
Steps:
1.  Restore the connection to the Local Backend (e.g., reconnect the LAN cable, restart the Local Backend server).
2.  Monitor the KioskClient's display and behavior for automatic recovery.
3.  Once the error screen disappears, attempt to perform a data-dependent action (e.g., browse products).
Expected Result:
*   The KioskClient automatically detects the re-establishment of the connection to the Local Backend.
*   The "Service Unavailable - Network Error" screen is dismissed.
*   The KioskClient seamlessly resumes normal "Offline Mode" operation, accepting user requests and routing them to the Local Backend.
*   The data-dependent action is successfully completed using data from the Local Backend.

### TC-007: Denying Access to Global Leaderboard in Offline Mode
Preconditions:
*   The system is in "Offline Mode" (global internet disconnected, Local Backend connected).
*   The KioskClient's user interface includes an option to access a "Global Leaderboard".
*   The "Global Leaderboard" is explicitly configured as an online-only feature.
Steps:
1.  Navigate through the KioskClient's interface to locate the "Global Leaderboard" option.
2.  Select or attempt to activate the "Global Leaderboard" feature.
Expected Result:
*   The system denies the request to access the "Global Leaderboard".
*   A clear and user-friendly message, such as "Feature not available offline" or "Global Leaderboard requires an internet connection", is displayed to the user.
*   The KioskClient does not attempt to establish a global internet connection for this feature.

### TC-008: Consistent Handling of Other Unsupported Features in Offline Mode (Negative/Generalization)
Preconditions:
*   The system is in "Offline Mode".
*   The KioskClient has other features (besides Global Leaderboard) that are explicitly defined as requiring a global internet connection (e.g., "Online Promotions," "Cloud Sync," "Remote Diagnostics").
Steps:
1.  Systematically attempt to access each known online-only feature on the KioskClient.
Expected Result:
*   For every online-only feature attempted, the system consistently denies the request.
*   A "Feature not available offline" message (or an equivalent specific message) is displayed for each denied request.
*   No attempts are made to connect to the global internet for these features, maintaining the "Offline Mode" integrity.

### TC-009: Differentiating Between Local and Global Features in Offline Mode (Positive)
Preconditions:
*   The system is in "Offline Mode".
*   The KioskClient offers both online-only features (e.g., Global Leaderboard) and offline-available features (e.g., Local Scoreboard, Local Product Catalog).
Steps:
1.  Attempt to access an online-only feature (e.g., Global Leaderboard).
2.  Immediately after, attempt to access an offline-available feature (e.g., view the Local Scoreboard or browse the Product Catalog).
Expected Result:
*   The request for the online-only feature is denied with a "Feature not available offline" message.
*   The request for the offline-available feature is successfully processed.
*   The KioskClient correctly uses data from the Local Backend for the offline-available feature, demonstrating its ability to distinguish and manage features based on network availability.