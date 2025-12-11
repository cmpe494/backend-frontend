### TC-001: Verify successful dashboard load with all specified real-time metrics

**Preconditions:**
*   User is logged in as a Manager or Admin.
*   User has viewing permissions for the Dashboard.
*   Backend Data Service is operational and providing valid real-time data for all specified metrics.

**Steps:**
1.  Navigate to the Dashboard.
2.  Observe the Dashboard content upon initial load.

**Expected Result:**
*   The Dashboard loads successfully within an acceptable time frame (e.g., < 5 seconds).
*   "Zone Occupancy" metric is displayed prominently using a "Heatmap" visualization.
*   "Daily Revenue" metric is displayed prominently using a "Line Chart" visualization.
*   "Active Alerts" metric is displayed prominently using a "List View" visualization.
*   All displayed metrics contain valid, non-empty, and up-to-date real-time data.

### TC-002: Verify Dashboard data auto-refresh functionality

**Preconditions:**
*   User is logged in as a Manager or Admin.
*   User has viewing permissions for the Dashboard.
*   Dashboard is loaded and displaying initial real-time metrics (as per TC-001).
*   Backend Data Service is operational and providing *changing* real-time data (e.g., simulate a slight increment in daily revenue or a new alert appearing/disappearing).

**Steps:**
1.  Note down the current displayed values for "Zone Occupancy", "Daily Revenue", and "Active Alerts".
2.  Wait for approximately 35-40 seconds (allowing for a 30-second refresh cycle).
3.  Observe the displayed metric values again without any user interaction.

**Expected Result:**
*   After approximately 30 seconds, the displayed values for "Zone Occupancy", "Daily Revenue", and "Active Alerts" should automatically update to reflect the latest data from the Backend Data Service.
*   The update should be smooth, without full page reloads, noticeable flickers, or interruption to user experience.

### TC-003: Verify various data states and boundary conditions for displayed metrics

**Preconditions:**
*   User is logged in as a Manager or Admin.
*   User has viewing permissions for the Dashboard.
*   Backend Data Service is operational and configured to send specific data scenarios.

**Steps:**
1.  **Scenario A (Empty/Zero Data):** Configure Backend Data Service to send zero or empty values for all metrics (e.g., Zone Occupancy = 0%, Daily Revenue = $0.00, no active alerts). Navigate to the Dashboard and observe.
2.  **Scenario B (Max/High Data):** Configure Backend Data Service to send maximum possible values or very high values (e.g., Zone Occupancy = 100%, Daily Revenue = $9,999,999.99, 100+ Active Alerts). Navigate to the Dashboard and observe.
3.  **Scenario C (Negative/Invalid Data):** Configure Backend Data Service to send values that are logically incorrect (e.g., negative percentage for Zone Occupancy, text string for Daily Revenue). Navigate to the Dashboard and observe.

**Expected Result:**
*   **Scenario A:** The Dashboard displays 0, "N/A", or appropriately formatted empty states for empty/zero data without breaking the layout, showing errors, or causing visualizations to malfunction. Heatmap shows no activity, Line Chart starts at zero, List View is empty.
*   **Scenario B:** The Dashboard correctly displays large/maximum values without truncation, overflow, or layout issues. All visualizations scale appropriately to accommodate the data.
*   **Scenario C:** The Dashboard gracefully handles invalid data types or logically incorrect values (e.g., displays 'Invalid Data', 'Error', 'N/A', or renders placeholder) without crashing, displaying raw error messages to the user, or affecting other metric displays.

### TC-004: Verify Dashboard responsiveness and performance under normal load

**Preconditions:**
*   User is logged in as a Manager or Admin.
*   User has viewing permissions for the Dashboard.
*   Backend Data Service is operational and providing a typical volume of real-time data.

**Steps:**
1.  Load the Dashboard and immediately interact with it (e.g., scroll up/down, hover over charts, click on any interactive components if present).
2.  Observe the time taken for the initial load and the responsiveness of UI elements.
3.  Monitor system resources (CPU, Memory) usage if tools are available.

**Expected Result:**
*   The Dashboard should load completely and all components should render within an acceptable time frame (e.g., less than 3-5 seconds on a standard connection).
*   User interactions (scrolling, hovering, clicking) should be responsive and fluid without any noticeable lag or stuttering.
*   Data refreshes should occur smoothly in the background without causing the UI to freeze or become unresponsive.
*   Client-side resource utilization (CPU, memory) should remain within reasonable limits, not impacting overall system performance.

### TC-005: Verify error handling when Backend Data Service fails to respond

**Preconditions:**
*   User is logged in as a Manager or Admin.
*   User has viewing permissions for the Dashboard.
*   Dashboard is initially loaded and displaying valid, real-time data.

**Steps:**
1.  Simulate a failure of the Backend Data Service (e.g., by shutting down the service, blocking its network port, or configuring it to return error responses).
2.  Wait for the next data refresh cycle (approximately 30 seconds).
3.  Observe the Dashboard's display carefully.

**Expected Result:**
*   The Dashboard should display a prominent, user-friendly "Data unavailable" warning message.
*   Crucially, the Dashboard should *not* display a blank screen or crash.
*   Instead of real-time data, the Dashboard should continue to display the "Last Known" cached values for "Zone Occupancy", "Daily Revenue", and "Active Alerts" that were present just before the backend failure.
*   The visualizations (Heatmap, Line Chart, List View) should remain visible, populated with the cached data.

### TC-006: Verify persistence and content accuracy of "Last Known" cached values during backend failure

**Preconditions:**
*   User is logged in as a Manager or Admin.
*   User has viewing permissions for the Dashboard.
*   Dashboard is currently displaying the "Data unavailable" warning with "Last Known" cached values, as the Backend Data Service is in a failed state (as per TC-005).

**Steps:**
1.  Record the exact values displayed for "Zone Occupancy", "Daily Revenue", and "Active Alerts" as the "Last Known" data.
2.  Wait for several subsequent refresh cycles (e.g., 2-3 minutes) while the Backend Data Service remains down.
3.  Observe the Dashboard's display and the values shown for metrics.
4.  (If applicable) Navigate away from the Dashboard to another page and then return to the Dashboard. Observe the display.

**Expected Result:**
*   The "Data unavailable" warning remains present throughout the prolonged failure.
*   The Dashboard should continue to display the *exact same* "Last Known" cached values that were recorded before the failure, and these values should not change or become blank.
*   The cached values should persist on the screen as long as the backend remains unavailable and the user stays on or returns to the Dashboard within a reasonable session timeframe (assuming cache scope is session-based).

### TC-007: Verify Dashboard behavior upon Backend Data Service recovery

**Preconditions:**
*   User is logged in as a Manager or Admin.
*   User has viewing permissions for the Dashboard.
*   Dashboard is currently displaying the "Data unavailable" warning with "Last Known" cached values, due to a Backend Data Service failure.
*   The Backend Data Service has been restored and is now operational, providing new, valid real-time data that is different from the cached values.

**Steps:**
1.  Restore the Backend Data Service to an operational state.
2.  Wait for the next scheduled data refresh cycle (approximately 30 seconds).
3.  Observe the Dashboard's display carefully.

**Expected Result:**
*   The "Data unavailable" warning message should automatically disappear.
*   The Dashboard should seamlessly switch from displaying "Last Known" cached values to displaying the new, real-time data from the recovered Backend Data Service.
*   The displayed values for "Zone Occupancy", "Daily Revenue", and "Active Alerts" should update to reflect the current real-time data provided by the backend.
*   The transition should occur automatically without any manual intervention from the user.

### TC-008: Verify Dashboard behavior when no 'Last Known' data is available on initial load during backend failure

**Preconditions:**
*   User is logged in as a Manager or Admin.
*   User has viewing permissions for the Dashboard.
*   The Backend Data Service is in a failed state *before* the Dashboard is loaded for the very first time in the current user session (i.e., no previously cached data exists).

**Steps:**
1.  Navigate to the Dashboard for the first time in a session while the Backend Data Service is down.
2.  Observe the Dashboard's display upon loading.

**Expected Result:**
*   The system should display a prominent "Data unavailable" warning message to the user.
*   The Dashboard should display placeholder elements or "N/A" / "No Data" indicators for "Zone Occupancy", "Daily Revenue", and "Active Alerts" visualizations, instead of a completely blank screen.
*   No "Last Known" data should be displayed, as none existed to cache.
*   The overall layout and structure of the dashboard should remain intact and functional.