# System Requirements Specification

## 1. Functional Requirements (FR)

-   **[FR-001]** The Dashboard System shall allow an Administrator to trigger requests for reports and configurations.
-   **[FR-002]** The Dashboard System shall send a valid GET request to the Backend API when a data fetch is triggered.
-   **[FR-003]** The Backend System shall validate the authorization token provided with API requests.
-   **[FR-004]** The Backend System shall return requested data in JSON format upon successful validation and processing.
-   **[FR-005]** The Backend System shall return an HTTP status code "200 OK" upon successful data retrieval and response.
-   **[FR-006]** The Dashboard System shall render retrieved data on its User Interface for the Administrator.
-   **[FR-007]** The Backend System shall serve static configuration data responses directly from a cache mechanism.
-   **[FR-008]** The Dashboard System shall implement a timeout mechanism for API requests.
-   **[FR-009]** The Dashboard System shall cancel an API request if the Backend System does not respond within the defined timeout period.
-   **[FR-010]** The Dashboard System shall display a "System not responding" error message to the Administrator when a request times out.
-   **[FR-011]** The Backend System shall return an HTTP "401 Unauthorized" status code when an API request contains an invalid or expired authorization token.
-   **[FR-012]** The Dashboard System shall redirect the Administrator to the login screen upon receiving an HTTP "401 Unauthorized" status code from the Backend System.

## 2. Non-Functional Requirements (NFR)

-   **[NFR-001]** The Dashboard System shall establish and maintain a secure HTTPS connection with the Backend System.
-   **[NFR-002]** The Backend System shall establish and maintain a secure HTTPS connection with the Dashboard System.
-   **[NFR-003]** The Backend System's response time for cached data shall be significantly lower than an equivalent database query.
-   **[NFR-004]** The Backend System shall respond to API requests within 2 seconds.