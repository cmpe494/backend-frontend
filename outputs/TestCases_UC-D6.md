### TC-001: Successful Configuration Publishing
Preconditions:
*   The Admin user is logged into the system.
*   There are pending configuration changes (e.g., a new zone created, a kiosk setting updated, a global policy modified).
*   All target components (Zones, Kiosks) are online and reachable by the Backend Distribution Service.
*   The Backend Distribution Service is operational and has network connectivity.
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin reviews the list of pending changes.
3.  Admin clicks the "Publish" button.
Expected Result:
*   The Backend Distribution Service successfully broadcasts the updates to all registered components (Zones, Kiosks).
*   All components apply the new configuration.
*   The system displays a confirmation message: "Configuration published successfully".
*   The list of pending changes is cleared.

### TC-002: Publishing with a Large Number of Changes
Preconditions:
*   The Admin user is logged into the system.
*   There are a very large number of pending configuration changes (e.g., hundreds of individual settings across multiple zones and kiosks).
*   All target components are online and reachable.
*   The Backend Distribution Service is operational.
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin reviews the extensive list of pending changes.
3.  Admin clicks the "Publish" button.
Expected Result:
*   The system efficiently processes and broadcasts all updates to all components.
*   The "Configuration published successfully" message is displayed within an acceptable time frame, without system performance degradation.
*   All components successfully apply all new configurations.

### TC-003: Publishing with a Single Minor Change
Preconditions:
*   The Admin user is logged into the system.
*   There is only one pending configuration change (e.g., a single minor setting updated for one kiosk).
*   All target components are online and reachable.
*   The Backend Distribution Service is operational.
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin reviews the single pending change.
3.  Admin clicks the "Publish" button.
Expected Result:
*   The system successfully broadcasts the update for the single change to the relevant component(s).
*   The "Configuration published successfully" message is displayed.
*   The single pending change is cleared.

### TC-004: Publishing with No Pending Changes
Preconditions:
*   The Admin user is logged into the system.
*   There are NO pending configuration changes.
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin verifies that no pending changes are listed.
3.  Admin clicks the "Publish" button.
Expected Result:
*   The system does NOT attempt to broadcast any updates.
*   The system displays an informative message: "No changes to publish".

### TC-005: "Publish" Button Disabled When No Changes (Good UX)
Preconditions:
*   The Admin user is logged into the system.
*   There are NO pending configuration changes.
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin verifies that no pending changes are listed.
3.  Admin observes the state of the "Publish" button.
Expected Result:
*   The "Publish" button is disabled or greyed out, preventing the Admin from clicking it when no changes are available.

### TC-006: Handling Partial Distribution Failure (Single Component)
Preconditions:
*   The Admin user is logged into the system.
*   There are pending configuration changes.
*   All components except "Kiosk-05" are online and configured to receive updates.
*   "Kiosk-05" is simulated to fail receiving or applying the update (e.g., network timeout, service crash, invalid configuration received).
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin reviews the pending changes.
3.  Admin clicks the "Publish" button.
Expected Result:
*   The system attempts to publish the configuration to all components.
*   The update succeeds for all components except "Kiosk-05".
*   The system reports a summary message: "Publish completed with errors".
*   The system explicitly lists "Kiosk-05" as a failed unit in an easily visible format.
*   An option/button labeled "Retry Failed Units" is prominently displayed.
*   Configuration changes are applied successfully to the functional units.

### TC-007: Handling Partial Distribution Failure (Multiple Components)
Preconditions:
*   The Admin user is logged into the system.
*   There are pending configuration changes.
*   Multiple components (e.g., "Kiosk-05", "Zone-B Display", "Kiosk-12") are simulated to fail receiving or applying the update.
*   Other components successfully receive and apply the updates.
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin reviews the pending changes.
3.  Admin clicks the "Publish" button.
Expected Result:
*   The system attempts to publish the configuration to all components.
*   The update succeeds for the majority of components.
*   The system reports a summary message: "Publish completed with errors".
*   The system explicitly lists all failed units ("Kiosk-05", "Zone-B Display", "Kiosk-12") in a clear, consolidated view.
*   An option/button labeled "Retry Failed Units" is prominently displayed.

### TC-008: Handling Total Distribution Failure (All Components)
Preconditions:
*   The Admin user is logged into the system.
*   There are pending configuration changes.
*   All target components are simulated to fail receiving or applying the update (e.g., widespread network outage affecting all devices).
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin reviews the pending changes.
3.  Admin clicks the "Publish" button.
Expected Result:
*   The system attempts to publish the configuration to all components.
*   The update fails for ALL components.
*   The system reports a critical error message, potentially "Publish failed for all units" or "Publish completed with errors".
*   The system lists all components as failed units.
*   An option/button labeled "Retry Failed Units" is displayed.
*   No configuration changes are applied to any components.

### TC-009: Retrying Failed Units Successfully
Preconditions:
*   TC-006 (Partial Distribution Failure) has just occurred, resulting in "Kiosk-05" being listed as failed.
*   "Kiosk-05" is now online and ready to receive updates (simulated recovery).
Steps:
1.  Admin views the "Publish completed with errors" message.
2.  Admin identifies "Kiosk-05" as the failed unit.
3.  Admin clicks the "Retry Failed Units" button.
Expected Result:
*   The system initiates a re-broadcast attempt *only* to "Kiosk-05".
*   "Kiosk-05" successfully receives and applies the configuration.
*   The system displays a success message, e.g., "Retry successful for all previously failed units" or "Configuration published successfully".
*   The error state for "Kiosk-05" is cleared.

### TC-010: Retrying Failed Units with Subsequent Failure
Preconditions:
*   TC-006 (Partial Distribution Failure) has just occurred, resulting in "Kiosk-05" being listed as failed.
*   "Kiosk-05" remains offline or continues to reject updates (simulated persistent failure).
Steps:
1.  Admin views the "Publish completed with errors" message.
2.  Admin identifies "Kiosk-05" as the failed unit.
3.  Admin clicks the "Retry Failed Units" button.
Expected Result:
*   The system initiates a re-broadcast attempt *only* to "Kiosk-05".
*   "Kiosk-05" fails to receive or apply the configuration again.
*   The system again reports "Publish completed with errors" (or "Retry failed").
*   "Kiosk-05" is again listed as a failed unit.
*   The "Retry Failed Units" option remains available.

### TC-011: Backend Distribution Service Failure During Publish
Preconditions:
*   The Admin user is logged into the system.
*   There are pending configuration changes.
*   The Backend Distribution Service is simulated to crash or become unresponsive immediately after the "Publish" button is clicked.
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin reviews the pending changes.
3.  Admin clicks the "Publish" button.
Expected Result:
*   The system detects the failure of the Backend Distribution Service.
*   An appropriate error message is displayed to the Admin, indicating a critical system error, e.g., "System Error: Failed to initiate configuration broadcast. Please contact support."
*   No changes are broadcasted or applied to any components.
*   The pending changes remain in the system.

### TC-012: Network Connectivity Loss During Broadcast
Preconditions:
*   The Admin user is logged into the system.
*   There are pending configuration changes.
*   A widespread network connectivity loss (e.g., internet outage affecting the facility network) is simulated *during* the configuration broadcast process.
Steps:
1.  Admin navigates to the configuration management section.
2.  Admin reviews the pending changes.
3.  Admin clicks the "Publish" button.
4.  Network connectivity loss occurs.
Expected Result:
*   The system attempts the broadcast.
*   Due to network loss, most or all components fail to receive the update.
*   The system reports "Publish completed with errors" or a similar error message.
*   Failed components are listed, and the "Retry Failed Units" option is available.
*   The system should attempt to gracefully handle the network interruption without crashing or data corruption.

### TC-013: Unauthorized Publish Attempt
Preconditions:
*   A user with insufficient permissions (e.g., a standard user, not an Admin) is logged into the system.
*   There are pending configuration changes.
Steps:
1.  The unauthorized user navigates to the configuration management section.
2.  The user attempts to access the "Publish" functionality (if visible) or observes its state.
Expected Result:
*   The "Publish" button or functionality is either:
    *   Not visible to the unauthorized user.
    *   Visible but disabled/greyed out with a tooltip indicating insufficient permissions.
    *   If clicked, the system displays an "Access Denied" or "Insufficient Permissions" error message.
*   No configuration changes are published.