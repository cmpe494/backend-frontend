### TC-001: Successful Session Authorization with Ample Balance
Preconditions:
*   A KioskClient is active and connected to the Backend System.
*   User account (Card ID: 'CARD-123') exists and is active.
*   User's wallet has a balance of $100.00.
*   Game (Game ID: 'GAME-A') exists and is active, with a cost of $10.00.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-123' and 'Game ID': 'GAME-A'.
2.  Backend processes the request, checks user's wallet balance.
3.  Backend confirms balance ($100.00) is greater than Game Cost ($10.00).
Expected Result:
*   Backend successfully deducts $10.00 from 'CARD-123' wallet.
*   'CARD-123' wallet balance becomes $90.00.
*   A financial log entry is created for the deduction (e.g., 'Session Start', 'CARD-123', 'GAME-A', '-$10.00').
*   Backend sends a "Session Authorized" response to the KioskClient.

### TC-002: Successful Session Authorization with Minimum Required Balance (Boundary)
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-124') exists and is active.
*   User's wallet has a balance of $10.01.
*   Game (Game ID: 'GAME-B') exists and is active, with a cost of $10.00.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-124' and 'Game ID': 'GAME-B'.
2.  Backend processes the request, checks user's wallet balance.
3.  Backend confirms balance ($10.01) is greater than Game Cost ($10.00).
Expected Result:
*   Backend successfully deducts $10.00 from 'CARD-124' wallet.
*   'CARD-124' wallet balance becomes $0.01.
*   A financial log entry is created for the deduction.
*   Backend sends a "Session Authorized" response to the KioskClient.

### TC-003: Rejection Due to Invalid Card ID
Preconditions:
*   A KioskClient is active and connected.
*   Game (Game ID: 'GAME-C') exists and is active, with a cost of $5.00.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with an invalid 'Card ID': 'NONEXISTENT-CARD' and 'Game ID': 'GAME-C'.
2.  Backend attempts to validate the 'Card ID'.
Expected Result:
*   Backend sends an "Invalid Card ID" error response to the KioskClient.
*   No deduction occurs.
*   No financial log entry is created.
*   System logs an error for the invalid Card ID.

### TC-004: Rejection Due to Invalid Game ID
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-125') exists, is active, and has sufficient balance ($50.00).
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-125' and an invalid 'Game ID': 'NONEXISTENT-GAME'.
2.  Backend attempts to validate the 'Game ID'.
Expected Result:
*   Backend sends an "Invalid Game ID" or "Game Not Found" error response to the KioskClient.
*   No deduction occurs.
*   No financial log entry is created.
*   System logs an error for the invalid Game ID.

### TC-005: Rejection Due to Missing Card ID
Preconditions:
*   A KioskClient is active and connected.
*   Game (Game ID: 'GAME-D') exists and is active.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with a missing 'Card ID' field (e.g., only 'Game ID': 'GAME-D' is present, or 'Card ID' is null/empty string).
2.  Backend attempts to parse and validate the request.
Expected Result:
*   Backend sends a "Missing Parameter: Card ID" or "Bad Request" error response to the KioskClient.
*   No deduction occurs.
*   No financial log entry is created.
*   System logs an error for the malformed request.

### TC-006: Rejection Due to Missing Game ID
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-126') exists and is active.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with a missing 'Game ID' field (e.g., only 'Card ID': 'CARD-126' is present, or 'Game ID' is null/empty string).
2.  Backend attempts to parse and validate the request.
Expected Result:
*   Backend sends a "Missing Parameter: Game ID" or "Bad Request" error response to the KioskClient.
*   No deduction occurs.
*   No financial log entry is created.
*   System logs an error for the malformed request.

### TC-007: Rejection Due to Malformed Request (e.g., Non-JSON)
Preconditions:
*   A KioskClient is active and connected.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with an improperly formatted request body (e.g., XML instead of JSON, or invalid JSON syntax).
2.  Backend attempts to parse the request.
Expected Result:
*   Backend sends a "Bad Request" or "Malformed JSON" error response (e.g., HTTP 400) to the KioskClient.
*   No processing of game logic or wallet occurs.
*   System logs an error related to request parsing.

### TC-008: Rejection Due to Inactive User Account
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-127') exists but is marked as 'inactive' or 'suspended'.
*   Game (Game ID: 'GAME-E') exists and is active, with a cost of $8.00.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-127' and 'Game ID': 'GAME-E'.
2.  Backend validates the 'Card ID' status.
Expected Result:
*   Backend sends an "Account Inactive" or "Account Suspended" error response to the KioskClient.
*   No deduction occurs.
*   No financial log entry is created.
*   System logs an event for attempted session start with an inactive account.

### TC-009: Rejection Due to Inactive/Unavailable Game
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-128') exists, is active, and has sufficient balance ($20.00).
*   Game (Game ID: 'GAME-F') exists but is marked as 'inactive' or 'unavailable'.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-128' and 'Game ID': 'GAME-F'.
2.  Backend validates the 'Game ID' status.
Expected Result:
*   Backend sends an "Game Unavailable" or "Game Inactive" error response to the KioskClient.
*   No deduction occurs.
*   No financial log entry is created.
*   System logs an event for attempted session start with an unavailable game.

### TC-010: Rejection Due to Insufficient Funds (General)
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-129') exists and is active.
*   User's wallet has a balance of $5.00.
*   Game (Game ID: 'GAME-G') exists and is active, with a cost of $15.00.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-129' and 'Game ID': 'GAME-G'.
2.  Backend checks the user's wallet balance.
3.  Backend confirms balance ($5.00) is less than Game Cost ($15.00).
Expected Result:
*   Backend sends an "Insufficient Funds" error response to the KioskClient.
*   'CARD-129' wallet balance remains unchanged at $5.00.
*   No financial log entry is created.

### TC-011: Rejection Due to Insufficient Funds (Boundary - Balance Equal to Game Cost)
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-130') exists and is active.
*   User's wallet has a balance of $10.00.
*   Game (Game ID: 'GAME-H') exists and is active, with a cost of $10.00.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-130' and 'Game ID': 'GAME-H'.
2.  Backend checks the user's wallet balance.
3.  Backend confirms balance ($10.00) is NOT *greater than* Game Cost ($10.00).
Expected Result:
*   Backend sends an "Insufficient Funds" error response to the KioskClient.
*   'CARD-130' wallet balance remains unchanged at $10.00.
*   No financial log entry is created.

### TC-012: Rejection Due to Insufficient Funds (Boundary - Balance Just Below Game Cost)
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-131') exists and is active.
*   User's wallet has a balance of $9.99.
*   Game (Game ID: 'GAME-I') exists and is active, with a cost of $10.00.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-131' and 'Game ID': 'GAME-I'.
2.  Backend checks the user's wallet balance.
3.  Backend confirms balance ($9.99) is less than Game Cost ($10.00).
Expected Result:
*   Backend sends an "Insufficient Funds" error response to the KioskClient.
*   'CARD-131' wallet balance remains unchanged at $9.99.
*   No financial log entry is created.

### TC-013: Rejection Due to Zero Balance
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-132') exists and is active.
*   User's wallet has a balance of $0.00.
*   Game (Game ID: 'GAME-J') exists and is active, with a cost of $7.00.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-132' and 'Game ID': 'GAME-J'.
2.  Backend checks the user's wallet balance.
3.  Backend confirms balance ($0.00) is less than Game Cost ($7.00).
Expected Result:
*   Backend sends an "Insufficient Funds" error response to the KioskClient.
*   'CARD-132' wallet balance remains unchanged at $0.00.
*   No financial log entry is created.

### TC-014: Session Authorization Response Within SLA
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-133') exists, is active, and has sufficient balance ($50.00).
*   Game (Game ID: 'GAME-K') exists and is active, with a cost of $12.00.
*   Backend system is operating under normal load conditions.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-133' and 'Game ID': 'GAME-K'.
2.  Backend processes the request, performs balance check, deduction, and log creation.
Expected Result:
*   Backend sends a "Session Authorized" response to the KioskClient.
*   The total time from receiving the request to sending the response is less than 1 second.
*   No timeout error is logged internally.

### TC-015: Session Authorization Response Exceeds SLA (Timeout Condition)
Preconditions:
*   A KioskClient is active and connected.
*   User account (Card ID: 'CARD-134') exists, is active, and has sufficient balance ($50.00).
*   Game (Game ID: 'GAME-L') exists and is active, with a cost of $12.00.
*   Backend system is intentionally slowed down or under extreme load conditions (e.g., simulating a dependent service delay) to exceed the 1-second threshold.
Steps:
1.  KioskClient sends a "Start Session" request to the Backend with 'Card ID': 'CARD-134' and 'Game ID': 'GAME-L'.
2.  Backend processes the request, but due to induced delay, the processing time exceeds 1 second.
Expected Result:
*   Backend eventually sends a response (either "Session Authorized" if processing completes, or an error if the internal timeout mechanism acts).
*   A "Timeout Error" or "Performance Degradation" event is logged internally by the Backend system, noting that processing exceeded 1 second.
*   (Assumption) If the KioskClient has its own timeout, it might report a timeout. The Backend's action is to *log* the exceedance.

### TC-016: Stress Test - High Concurrent Session Requests
Preconditions:
*   Multiple KioskClients are active and connected.
*   Multiple user accounts with sufficient balances are available.
*   Multiple active games are available.
Steps:
1.  Simultaneously send a high volume of "Start Session" requests from multiple KioskClients to the Backend System (e.g., 500 requests per second for 5 minutes).
2.  Monitor Backend system resources (CPU, Memory, Network I/O, Database connections).
3.  Monitor response times for all requests.
Expected Result:
*   The majority (e.g., >99%) of "Session Authorized" responses are sent within the 1-second SLA.
*   Backend system remains stable, without crashes or significant performance degradation impacting other services.
*   Error rates for "Insufficient Funds" or "Invalid ID" are consistent with the input data, not due to system overload.
*   System logs do not show an abnormal increase in "Timeout Error" entries, indicating the system can handle the load.
*   All financial deductions and log entries are accurate and consistent.