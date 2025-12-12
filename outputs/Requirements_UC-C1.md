# System Requirements Specification

## 1. Functional Requirements (FR)

-   **[FR-001]** The Dashboard system shall allow an Admin user to trigger requests for data (e.g., "Fetch Financial Report").
-   **[FR-002]** The Dashboard system shall send valid GET requests to the Backend API for data retrieval.
-   **[FR-003]** The Backend system shall validate the authorization token provided with API requests.
-   **[FR-004]** The Backend system shall return requested data in JSON format for successful requests.
-   **[FR-005]** The Backend system shall return a "200 OK" status code upon successful data retrieval.
-   **[FR-006]** The Dashboard system shall render retrieved data on the User Interface.
-   **[FR-007]** The Backend system shall serve static configuration data from a cache.
-   **[FR-008]** The Dashboard system shall cancel a pending request if the Backend does not respond within a defined time limit (e.g., 2 seconds).
-   **[FR-009]** The Dashboard system shall display a "System not responding" error message to the user when a request times out.
-   **[FR-010]** The Backend system shall return a "401 Unauthorized" status code for requests with invalid or expired authorization tokens.
-   **[FR-011]** The Dashboard system shall redirect the user to the login screen upon receiving a "401 Unauthorized" status code from the Backend.

## 2. Non-Functional Requirements (NFR)

-   **[NFR-001]** **Security/Connectivity:** The system shall establish and maintain a secure HTTPS connection between the Dashboard and the Backend.
-   **[NFR-002]** **Performance:** The system shall ensure that responses served from cache have a significantly lower response time compared to database queries.
-   **[NFR-003]** **Performance/Reliability:** The Backend system shall respond to requests within 2 seconds.
-   **[NFR-004]** **Security:** The Backend system shall enforce authorization for API requests.