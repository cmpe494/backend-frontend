### TC-001: Successful Retrieval of Financial Report Data
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   Admin user is logged into the Dashboard with a valid, unexpired authorization token.
*   The Backend API is operational and accessible.
*   Financial report data is available in the Backend system.

Steps:
1.  Admin navigates to the "Reports" section on the Dashboard.
2.  Admin triggers the "Fetch Financial Report" action (e.g., by clicking a button or selecting an option).
3.  Observe network requests from the Dashboard to the Backend.
4.  Observe the Backend's response.
5.  Observe the Dashboard UI.

Expected Result:
*   The Dashboard sends a valid GET request to the Backend API for the financial report.
*   The request includes a valid authorization token.
*   The Backend successfully validates the authorization token.
*   The Backend returns the financial report data in "JSON" format with a "200 OK" status code.
*   The Dashboard successfully parses the JSON data.
*   The financial report data is correctly rendered and displayed on the Dashboard UI to the Admin.

### TC-002: Dashboard Displays Different Report Types Successfully
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   Admin user is logged into the Dashboard with a valid, unexpired authorization token.
*   The Backend API is operational and accessible.
*   Multiple types of report data (e.g., Sales Report, User Activity Report) are available in the Backend system.

Steps:
1.  Admin navigates to the "Reports" section on the Dashboard.
2.  Admin selects and triggers fetching a "Sales Report".
3.  Admin then selects and triggers fetching a "User Activity Report".
4.  Observe network requests and Dashboard UI for both report types.

Expected Result:
*   For each report type, the Dashboard sends a valid GET request to the Backend API.
*   The Backend returns the respective report data in "JSON" format with a "200 OK" status code.
*   The Dashboard successfully renders and displays each report type correctly on the UI, specific to its content.

### TC-003: Retrieval of Static Configuration from Cache
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   The Dashboard system is operational.
*   Static configuration data (e.g., UI themes, feature flags) has been previously requested and is present in the Backend's cache.
*   The Backend's cache mechanism is active and configured for static configuration data.

Steps:
1.  The Dashboard system initiates a request for specific static configuration data (e.g., upon loading a configuration-dependent component).
2.  Monitor Backend logs or performance metrics for data retrieval source.
3.  Measure the response time for the configuration data.

Expected Result:
*   The Backend identifies the request as being for static configuration data available in its cache.
*   The Backend serves the response directly from the "Cache" without querying the primary database or external storage.
*   The response time for this request is significantly lower (e.g., measurable in milliseconds vs. hundreds of milliseconds) compared to a typical database query for similar data.
*   The Dashboard receives and applies the configuration data correctly.

### TC-004: Initial Retrieval of Static Configuration (Cache Miss)
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   The Dashboard system is operational.
*   The Backend's cache for static configuration data is empty or the specific configuration data is not yet cached.

Steps:
1.  The Dashboard system initiates an initial request for static configuration data.
2.  Monitor Backend logs or performance metrics for data retrieval source.
3.  Measure the response time for the configuration data.

Expected Result:
*   The Backend identifies the request as being for static configuration data not present in its cache.
*   The Backend queries its primary database or external storage to retrieve the configuration data.
*   The Backend stores (populates) the retrieved data in its cache for subsequent requests.
*   The response time is comparable to a typical database query for similar data.
*   The Dashboard receives and applies the configuration data correctly.

### TC-005: Backend Fails to Respond Within Defined Timeout (2 seconds)
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   The Dashboard system is operational.
*   The Backend API is simulated to delay its response beyond 2 seconds (e.g., 2.5 seconds).
*   The Dashboard's request timeout is configured to 2 seconds.

Steps:
1.  The Dashboard sends a request to the Backend.
2.  Observe the Dashboard's behavior and UI for 2 seconds and beyond.

Expected Result:
*   After exactly 2 seconds (or slightly after the timeout threshold), the Dashboard cancels the pending request to the Backend.
*   The Dashboard immediately displays a "System not responding" error message to the user on the UI.
*   The Dashboard does not attempt to process any late response from the Backend for that specific request.

### TC-006: Backend Responds Just Under Timeout Limit
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   The Dashboard system is operational.
*   The Backend API is simulated to respond exactly at 1.9 seconds (just under the 2-second timeout).
*   The Dashboard's request timeout is configured to 2 seconds.

Steps:
1.  The Dashboard sends a request to the Backend.
2.  Observe the Dashboard's behavior and UI.

Expected Result:
*   The Backend successfully responds with data (e.g., 200 OK) at 1.9 seconds.
*   The Dashboard receives the response before the timeout limit.
*   The Dashboard processes the response and updates the UI accordingly, without displaying any timeout error.

### TC-007: Handling Invalid Authorization Token
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   The Dashboard system is operational.
*   An Admin user attempts to access protected resources.

Steps:
1.  The Dashboard sends a request to the Backend API, deliberately including a syntactically incorrect or tampered authorization token.
2.  Observe the Backend's response.
3.  Observe the Dashboard's UI.

Expected Result:
*   The Backend API rejects the request due to the invalid token.
*   The Backend returns a "401 Unauthorized" status code in its response.
*   The Dashboard detects the "401 Unauthorized" status code.
*   The Dashboard immediately redirects the user to the login screen.
*   Any sensitive session data on the Dashboard side is cleared upon redirection.

### TC-008: Handling Expired Authorization Token
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   The Dashboard system is operational.
*   An Admin user is logged in, but their authorization token has subsequently expired (e.g., due to inactivity or time limit).

Steps:
1.  The Dashboard sends a request to the Backend API with the expired authorization token.
2.  Observe the Backend's response.
3.  Observe the Dashboard's UI.

Expected Result:
*   The Backend API validates the token's signature but detects that its expiration timestamp is in the past.
*   The Backend returns a "401 Unauthorized" status code in its response.
*   The Dashboard detects the "401 Unauthorized" status code.
*   The Dashboard immediately redirects the user to the login screen.
*   Any sensitive session data on the Dashboard side is cleared upon redirection.

### TC-009: Handling Missing Authorization Token
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   The Dashboard system is operational.
*   An Admin user attempts to access protected resources.

Steps:
1.  The Dashboard sends a request to the Backend API, deliberately omitting the authorization token from the request headers.
2.  Observe the Backend's response.
3.  Observe the Dashboard's UI.

Expected Result:
*   The Backend API detects the absence of an authorization token.
*   The Backend returns a "401 Unauthorized" status code in its response.
*   The Dashboard detects the "401 Unauthorized" status code.
*   The Dashboard immediately redirects the user to the login screen.
*   Any sensitive session data on the Dashboard side is cleared upon redirection.

### TC-010: Dashboard Request Cancellation Mechanism Validation
Preconditions:
*   A secure HTTPS connection exists between Dashboard and Backend.
*   The Dashboard system is operational.
*   A specific request to the Backend is in progress, and the Backend is simulated to respond slowly (e.g., 10 seconds).
*   The Dashboard has a user-initiated "Cancel" button for the ongoing request.

Steps:
1.  The Dashboard sends a request to the Backend.
2.  Immediately click the "Cancel" button on the Dashboard UI.
3.  Monitor network activity and Dashboard UI.

Expected Result:
*   The Dashboard internally cancels the ongoing request, preventing it from waiting for the Backend's full response.
*   No response from the Backend for the cancelled request is processed by the Dashboard.
*   The Dashboard UI updates to reflect the cancellation (e.g., "Request cancelled" message, spinner disappears).
*   No "System not responding" timeout error is displayed, as the cancellation was user-initiated.