# System Requirements Specification

## 1. Functional Requirements (FR)

-   **[FR-001]** The system shall enable authenticated users to access the "Top-up Balance" functionality.
-   **[FR-002]** The system shall allow users to select from a range of payment methods, including Credit Card, QR Payment, and Cash.
-   **[FR-003]** The system shall facilitate the process for a user to complete a chosen payment transaction.
-   **[FR-004]** The system shall transmit payment transaction details to the Backend Payment Service.
-   **[FR-005]** The system shall, upon successful payment processing by the Backend Payment Service, trigger an update to the user's wallet balance.
-   **[FR-006]** The system shall display a "Transaction Successful" message to the user following a successful top-up.
-   **[FR-007]** The system shall display the user's updated wallet balance on the screen after a successful transaction.
-   **[FR-008]** The system shall be capable of receiving and processing "Transaction Failed" error responses from the Payment Gateway.
-   **[FR-009]** The system shall display a "Payment could not be processed" error message to the user upon a payment failure.
-   **[FR-010]** The system shall ensure that the user's wallet balance remains unchanged in the event of a payment failure.

## 2. Non-Functional Requirements (NFR)

-   **[NFR-001]** The system shall ensure user authentication is in place for accessing balance top-up functionality. (Derived from "Given the user is logged in")
-   **[NFR-002]** The system shall maintain the data integrity of the user's wallet balance by preventing unauthorized or erroneous changes during failed payment transactions. (Derived from "And the user's balance should remain unchanged")