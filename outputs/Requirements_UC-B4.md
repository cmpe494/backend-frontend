# System Requirements Specification

## 1. Functional Requirements (FR)
-   **[FR-001]** The system shall allow an Operator to input a valid customer ID or Transaction ID.
-   **[FR-002]** The system shall enable an Operator to initiate financial transactions, including "Load Points" and "Refunds".
-   **[FR-003]** The system shall allow an Operator to specify a transaction amount for financial operations.
-   **[FR-004]** The system shall provide a confirmation mechanism for Operator-initiated transactions.
-   **[FR-005]** The system shall verify the initiating Operator's transaction limits and authority prior to processing any financial transaction.
-   **[FR-006]** The system shall log all financial transaction actions in a "Financial Journal".
-   **[FR-007]** The system shall display a "Transaction Complete" message upon successful completion of a financial transaction.
-   **[FR-008]** The system shall reject refund transactions that would result in a negative customer balance.
-   **[FR-009]** The system shall display an "Insufficient funds for refund" error message when a refund is rejected due to insufficient funds.
-   **[FR-010]** The system shall perform a rollback of any in-progress transaction upon detecting a database connection error during the save operation.
-   **[FR-011]** The system shall alert the technical team upon the occurrence of a database connection error requiring a rollback.

## 2. Non-Functional Requirements (NFR)
-   **[NFR-001]** The system shall maintain accurate customer balances. (Derived from Feature: "So that customer balances are accurate" and implied by balance checks).
-   **[NFR-002]** The system shall perform all financial transactions atomically within the database.
-   **[NFR-003]** The system shall ensure data consistency and integrity, specifically that customer balances remain unaffected in the event of a transaction rollback due to errors.