### TC-001: Seamless switch to offline mode and read cached data
Preconditions:
*   Application is installed, running, and user is logged in.
*   Essential application data (e.g., user profile, feed content, articles) has been successfully cached locally while online.
*   Device currently has an active internet connection.

Steps:
1.  Verify the application is operating in "Online Mode" (e.g., check for a status indicator, real-time updates).
2.  Disconnect the device from the internet (e.g., turn off Wi-Fi, enable Airplane Mode, unplug Ethernet cable).
3.  Observe the application's behavior immediately after the disconnection.
4.  Attempt to navigate to a section or access content that was previously cached (e.g., open a saved article, view a profile page, scroll through a loaded feed).

Expected Result:
*   The application automatically detects the loss of internet connection.
*   The application status indicator switches to "Offline Mode" (e.g., an "Offline" badge, a notification banner, or relevant UI changes are displayed).
*   The cached content loads and displays successfully without any internet connectivity error messages.
*   The application remains responsive and functional for accessing local data.

### TC-002: Queue write operations in offline mode
Preconditions:
*   Application is installed, running, and user is logged in.
*   Essential application data is cached locally.
*   Device currently has an active internet connection.
*   Application has features allowing user-generated content or state changes (e.g., drafting a comment, liking an item, saving a preference).

Steps:
1.  Ensure the application is in "Online Mode".
2.  Disconnect the device from the internet.
3.  Verify the application has switched to "Offline Mode" (as per TC-001).
4.  Perform a write operation that would typically require server interaction (e.g., type and attempt to 'post' a comment, click 'like' on an item, update a local setting that needs synchronization).
5.  Observe the application's response to the write operation.

Expected Result:
*   The write operation is accepted by the application locally.
*   A notification or visual indicator confirms that the operation has been queued for synchronization (e.g., "Saved offline", "Will sync when online", a 'pending' icon).
*   The application does not display an "internet required" error for this specific write operation.
*   The state change is reflected locally within the application (e.g., the comment appears as drafted, the item is marked as liked locally) until a successful synchronization occurs.

### TC-003: Graceful handling with no cached data in offline mode (Negative/Boundary)
Preconditions:
*   Application is installed, running, and user is logged in.
*   **No essential application data is cached locally (or cache has been intentionally cleared/is empty).**
*   Device currently has an active internet connection.

Steps:
1.  Ensure local application cache is empty or cleared.
2.  Disconnect the device from the internet.
3.  Observe the application's behavior.
4.  Attempt to navigate to any content section or perform an action that typically displays content.

Expected Result:
*   The application switches to "Offline Mode".
*   When attempting to access content, the application displays an appropriate and user-friendly message indicating no offline data is available (e.g., "No content available offline. Please connect to the internet to load data.", "Cache is empty").
*   The application does not crash, freeze, or become unresponsive.
*   Online-only features remain blocked as per normal offline behavior.

### TC-004: Block 'Download New Content' while offline (Negative)
Preconditions:
*   Application is installed, running, and user is logged in.
*   The device has no active internet connection, and the application is confirmed to be in "Offline Mode".
*   The application provides an option to "Download New Content" (e.g., for premium content, new updates, or new media files).

Steps:
1.  Navigate to the section within the application where the "Download New Content" option is available.
2.  Attempt to initiate the "Download New Content" action (e.g., click a 'Download' button next to an item).
3.  Observe the system's response to the download request.

Expected Result:
*   The "Download New Content" request is immediately blocked.
*   A clear and specific warning message "Internet connection required" (or the exact text from the BDD scenario) is prominently displayed to the user.
*   The application does not attempt to initiate the download, and no download progress is shown.
*   No other operations are unexpectedly impacted by this blocked request.

### TC-005: Attempting other online-only actions while offline (Negative/Boundary)
Preconditions:
*   Application is installed, running, and user is logged in.
*   The device has no active internet connection, and the application is confirmed to be in "Offline Mode".
*   The application contains other features that explicitly require a live internet connection (e.g., "Live Chat Support", "Real-time Feed Refresh", "External Share", "Make a Purchase").

Steps:
1.  Attempt to access or use the "Live Chat Support" feature.
2.  Attempt to trigger a "Real-time Feed Refresh".
3.  Attempt to use an "External Share" feature for content.
4.  Attempt to initiate a "Make a Purchase" transaction.
5.  (Repeat for any other known online-only functionalities).

Expected Result:
*   For each attempted online-only action, the request is immediately blocked.
*   An appropriate and context-specific message indicating the need for an internet connection (e.g., "Internet connection required", "Cannot connect to chat server offline", "Offline, cannot refresh feed", "Cannot process payment offline") is displayed.
*   The application remains stable and does not crash, freeze, or lose data.

### TC-006: Sync failure message and retain queued data
Preconditions:
*   Application is installed, running, and user is logged in.
*   The application has previously queued write operations (e.g., a drafted comment, a saved preference, a created item) while offline.
*   The device currently has no internet connection.
*   A mechanism to simulate a server-side synchronization error is in place (e.g., a mock server returning 500s, network proxy blocking sync requests).

Steps:
1.  Restore the internet connection to the device.
2.  Ensure the simulated synchronization error is active (e.g., server is configured to return errors for sync endpoints).
3.  Observe the application's behavior during and after the automatic synchronization attempt.
4.  Verify the displayed messages on the application UI.
5.  Attempt to access or verify the state of the locally queued unsynced data.

Expected Result:
*   The system attempts to synchronize the queued offline data upon reconnection.
*   Upon encountering the simulated error, the system displays the exact message: "Sync failed, please retry later".
*   The previously queued offline data is not lost and remains present in the local queue, marked for a future sync attempt.
*   The application remains functional, allowing the user to continue interacting with local data without loss.

### TC-007: Successful synchronization after reconnection (Positive)
Preconditions:
*   Application is installed, running, and user is logged in.
*   The application has previously queued write operations while offline.
*   The device currently has no internet connection.
*   The backend server is operational and ready to accept synchronization data.

Steps:
1.  Restore the internet connection to the device.
2.  Observe the application's behavior during and after the automatic synchronization attempt.
3.  Verify the status of the previously queued data within the application (e.g., the drafted comment is now 'posted', the liked item is updated).
4.  If applicable, check the backend system or another client to confirm the data was successfully synchronized and reflected online.

Expected Result:
*   The system attempts and successfully synchronizes all queued offline data upon reconnection.
*   No error message related to synchronization failure is displayed.
*   The previously queued data is reflected as successfully synchronized both within the application and on the backend.
*   The data is removed from the local synchronization queue.

### TC-008: Data persistence and retry after sync failure (Boundary/Error Recovery)
Preconditions:
*   Application is installed, running, and user is logged in.
*   The application has previously queued write operations while offline.
*   A sync failure has occurred, and the "Sync failed, please retry later" message was displayed (as per TC-006).
*   The queued data is confirmed to be in the local queue after the initial failure.
*   The internet connection is stable, and the backend error from TC-006 has been resolved or is no longer simulated.

Steps:
1.  Close the application completely (force-quit if necessary).
2.  Relaunch the application.
3.  Verify the presence and integrity of the unsynced queued data immediately after relaunch.
4.  If a manual retry option exists, trigger it. Otherwise, wait for the automatic retry mechanism to activate (if any).
5.  Observe the new sync attempt.

Expected Result:
*   The unsynced queued data persists in the local queue across application restarts.
*   The system attempts to resynchronize the data upon launch or when a retry is triggered.
*   Upon successful synchronization, the data is correctly sent to the server and removed from the local queue.
*   The user is notified of successful synchronization (if applicable) or the error message is cleared.

### TC-009: Connection restored with no pending offline data
Preconditions:
*   Application is installed, running, and user is logged in.
*   The application has *no* pending write operations to synchronize.
*   The device currently has no internet connection, and the application is in "Offline Mode".

Steps:
1.  Restore the internet connection to the device.
2.  Observe the application's behavior after reconnection.

Expected Result:
*   The application automatically detects the restored connection.
*   The application returns to "Online Mode" (e.g., status indicator changes).
*   No specific synchronization success or error messages are displayed, as there was no data to sync.
*   The application functions normally, allowing access to real-time online content.