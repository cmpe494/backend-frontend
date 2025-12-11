### TC-001: Successful Distribution of New Pricing Configuration
Preconditions:
*   Admin portal is accessible and configured to interact with the Backend system.
*   Backend system is running and connected to the Message Queue.
*   "KioskClient" and "GameClient" applications are running, connected to the Message Queue, and have valid initial configurations.
*   Message Queue is operational and accessible by the Backend and Clients.

Steps:
1.  Admin logs into the admin portal.
2.  Admin navigates to the game pricing configuration section.
3.  Admin enters new, valid game prices (e.g., Game A price: $5 -> $6, Game B price: $10 -> $11).
4.  Admin saves the new pricing configuration.
5.  Observe the Backend system logs for publication confirmation.
6.  Observe "KioskClient" and "GameClient" system logs for message reception and application.
7.  Verify the new prices are reflected locally on both "KioskClient" and "GameClient" (e.g., by checking their UI or local configuration files/databases).
8.  Observe Backend system logs for "Update Successful" acknowledgements from both clients.

Expected Result:
*   The Backend system successfully publishes the new pricing configuration message to the Message Queue.
*   Both "KioskClient" and "GameClient" consume the message from the Message Queue.
*   Both clients validate and successfully apply the new pricing configuration locally.
*   The new prices are active on both clients.
*   Both clients send an "Update Successful" acknowledgment message to the Backend.
*   Backend logs confirm successful distribution and acknowledgements from both clients.

### TC-002: Distribution of Large Configuration Message
Preconditions:
*   Admin portal, Backend, Message Queue, "KioskClient", and "GameClient" are operational.
*   Message Queue is configured with a default message size limit and retention policy.

Steps:
1.  Admin prepares an unusually large configuration update (e.g., containing thousands of pricing entries or a large data payload, approaching the Message Queue's maximum message size).
2.  Admin saves the large configuration.
3.  Observe Backend system logs for publication status.
4.  Observe Message Queue metrics for message size and throughput.
5.  Observe "KioskClient" and "GameClient" system logs for reception, processing time, and application of the configuration.
6.  Verify the large configuration is applied correctly on both clients.
7.  Observe Backend system logs for "Update Successful" acknowledgements.

Expected Result:
*   The Backend system successfully publishes the large configuration message without errors related to message size.
*   The Message Queue handles the large message efficiently, without performance degradation or message truncation.
*   Both "KioskClient" and "GameClient" successfully consume, process, and apply the large configuration within acceptable time limits.
*   Both clients send "Update Successful" acknowledgements to the Backend.
*   No errors or warnings related to message size or processing time are logged on any component.

### TC-003: Distribution to Numerous Connected Clients
Preconditions:
*   Admin portal, Backend, and Message Queue are operational.
*   A simulated environment with a high number (e.g., 500-1000) of "KioskClient" and "GameClient" instances is running and connected to the Message Queue.
*   Each client has a valid initial configuration.

Steps:
1.  Admin saves a new, simple configuration change (e.g., a single price update).
2.  Observe Backend system logs for publication status.
3.  Monitor Message Queue performance metrics (e.g., message rates, queue depth, latency).
4.  Monitor CPU, memory, and network usage on the Backend and Message Queue servers.
5.  Observe a sample set of client logs for message reception and application.
6.  Verify the new configuration is applied correctly on a representative sample of clients.
7.  Observe Backend system logs for "Update Successful" acknowledgements from all connected clients.

Expected Result:
*   The Backend system successfully publishes the configuration message to the Message Queue.
*   The Message Queue efficiently distributes the message to all connected clients without significant latency or resource exhaustion.
*   All connected "KioskClient" and "GameClient" instances consume, process, and apply the configuration successfully.
*   All clients send "Update Successful" acknowledgements to the Backend.
*   The overall system remains stable and responsive under the load of multiple clients.

### TC-004: Backend Publishes When Message Queue is Unavailable
Preconditions:
*   Admin portal and Backend system are operational.
*   "KioskClient" and "GameClient" are running.

Steps:
1.  **Intentionally shut down or disconnect the Message Queue service.**
2.  Admin saves a new pricing configuration in the admin portal.
3.  Observe Backend system logs for any errors or retry attempts.
4.  **Restart or reconnect the Message Queue service.**
5.  Observe Backend system logs for successful message publication after MQ is back online (if retry mechanism exists).
6.  Observe client logs for message reception (if message was published after retry).

Expected Result:
*   When the Message Queue is unavailable, the Backend system should log an error indicating it cannot publish the message.
*   The Backend should implement a retry mechanism to attempt publishing the message once the Message Queue becomes available again.
*   Upon Message Queue restoration, the Backend should successfully publish the pending configuration message.
*   "KioskClient" and "GameClient" should then consume the message and apply the new prices.
*   Clients should send "Update Successful" acknowledgements to the Backend.

### TC-005: Client Fails to Apply New Configuration Locally
Preconditions:
*   Admin portal, Backend, Message Queue, "KioskClient", and "GameClient" are operational.
*   One client (e.g., "KioskClient-01") has a simulated internal error that prevents it from writing to its local configuration storage (e.g., read-only file system, database connection error).

Steps:
1.  Admin saves a new, valid pricing configuration.
2.  Backend publishes the message.
3.  "KioskClient-01" receives the message.
4.  Observe "KioskClient-01" logs for errors during the application of the configuration.
5.  Verify that "KioskClient-01" continues to operate with its previous configuration.
6.  Observe "KioskClient-01" for any error acknowledgment sent to the Backend (if designed).
7.  Verify other clients (e.g., "GameClient") successfully apply the configuration.

Expected Result:
*   "KioskClient-01" should log an error indicating it failed to apply the new configuration locally.
*   "KioskClient-01" should *not* apply the new configuration and should continue running with its previous valid settings.
*   "KioskClient-01" should send an "Update Failed" (or similar error) acknowledgment to the Backend, providing details of the failure.
*   The Backend should log this error acknowledgment and potentially alert operations.
*   Other clients should successfully apply the configuration and send "Update Successful" acknowledgements.

### TC-006: Client Fails to Send Acknowledgment Message
Preconditions:
*   Admin portal, Backend, Message Queue, "KioskClient", and "GameClient" are operational.
*   One client (e.g., "GameClient-01") has a simulated issue where it successfully applies the configuration but fails to send the acknowledgment message (e.g., network issue, internal messaging component error on client).

Steps:
1.  Admin saves a new, valid pricing configuration.
2.  Backend publishes the message.
3.  "GameClient-01" receives the message and *successfully* applies the new prices locally.
4.  **Intentionally block "GameClient-01" from sending its acknowledgment message.**
5.  Observe Backend system logs for expected acknowledgements from clients and any missing acknowledgements.
6.  Verify "GameClient-01" is running with the new prices.
7.  Verify other clients (e.g., "KioskClient") successfully apply the configuration and send acknowledgements.

Expected Result:
*   Backend system logs should show an acknowledgment from "KioskClient" but *not* from "GameClient-01".
*   The Backend should have a timeout mechanism for acknowledgements and log an alert for the missing acknowledgment from "GameClient-01".
*   "GameClient-01" should be running with the *new* prices, despite failing to send the acknowledgment.
*   The system should not halt or enter an inconsistent state due to a missing acknowledgment from a single client.

### TC-007: Offline Client Receives Configuration Upon Reconnection
Preconditions:
*   Backend system is running and connected to the Message Queue.
*   "KioskClient-05" is initially offline.
*   Message Queue is configured for durable subscriptions or message persistence for clients.
*   "GameClient" is online and operational.

Steps:
1.  Verify "KioskClient-05" is offline (e.g., by checking its status in the Backend monitoring).
2.  Admin saves a new configuration (e.g., game prices).
3.  Backend publishes the new configuration message.
4.  Verify "GameClient" consumes and applies the message, and sends an acknowledgment.
5.  Observe Message Queue status to confirm the message is retained for "KioskClient-05".
6.  **Bring "KioskClient-05" online.**
7.  Observe "KioskClient-05" logs for immediate message reception and application upon connection.
8.  Verify the new configuration is applied locally on "KioskClient-05".
9.  Observe Backend system logs for "Update Successful" acknowledgement from "KioskClient-05".

Expected Result:
*   The Backend successfully publishes the message.
*   The Message Queue retains the configuration message specifically for the offline "KioskClient-05".
*   When "KioskClient-05" comes online, it immediately connects to the Message Queue, retrieves the pending configuration message, and applies it.
*   "KioskClient-05" successfully applies the new configuration locally.
*   "KioskClient-05" sends an "Update Successful" acknowledgement to the Backend.

### TC-008: Client Offline Beyond MQ Retention Period
Preconditions:
*   Backend system is running.
*   "KioskClient-05" is offline.
*   Message Queue is configured with a specific message retention period (e.g., 24 hours, 7 days) for persistent messages or durable subscriptions.

Steps:
1.  Verify "KioskClient-05" is offline.
2.  Admin saves a new configuration.
3.  Backend publishes the new configuration message.
4.  **Allow "KioskClient-05" to remain offline for a duration *longer* than the Message Queue's configured message retention period.**
5.  **Bring "KioskClient-05" online.**
6.  Observe "KioskClient-05" logs for any message reception or errors upon connection.
7.  Verify the configuration on "KioskClient-05" (it should *not* have the new configuration).
8.  Observe Backend system for any alerts regarding client configuration consistency.

Expected Result:
*   The Message Queue should *not* deliver the configuration message to "KioskClient-05" because it has exceeded the retention period.
*   "KioskClient-05" should come online with its previous configuration.
*   "KioskClient-05" logs should indicate no pending messages or that a message could not be retrieved.
*   The Backend system should ideally have a mechanism to detect configuration drift for clients that have been offline too long and not received updates, and potentially trigger a full configuration sync for such clients or flag them for manual intervention.

### TC-009: Multiple Clients Offline and Reconnecting Sequentially
Preconditions:
*   Backend system is running.
*   A set of "KioskClient" instances (e.g., KioskClient-01, -02, -03) are offline.
*   Message Queue is configured for durable subscriptions and message persistence.

Steps:
1.  Verify KioskClient-01, -02, -03 are offline.
2.  Admin saves a new configuration.
3.  Backend publishes the new configuration message.
4.  Observe Message Queue to confirm messages are retained for all offline clients.
5.  **Bring KioskClient-01 online.** Verify it receives, applies the config, and acknowledges.
6.  **Wait for some time.**
7.  **Bring KioskClient-02 online.** Verify it receives, applies the config, and acknowledges.
8.  **Wait for some time.**
9.  **Bring KioskClient-03 online.** Verify it receives, applies the config, and acknowledges.
10. Verify all clients are running with the new configuration.

Expected Result:
*   The Message Queue successfully retains separate messages or handles durable subscriptions for each offline client.
*   Each client, upon reconnecting sequentially, immediately receives its pending configuration message.
*   Each client successfully applies the new configuration and sends an "Update Successful" acknowledgment to the Backend.
*   The sequential reconnection and message delivery do not impact the processing or delivery for other clients.

### TC-010: Message Queue Fails to Persist Message for Offline Client
Preconditions:
*   Backend system is running.
*   "KioskClient-05" is offline.
*   **Message Queue is intentionally misconfigured to *not* persist messages for offline clients (e.g., non-durable subscription, non-persistent message flag, or insufficient disk space on MQ server).**

Steps:
1.  Verify "KioskClient-05" is offline.
2.  Admin saves a new configuration.
3.  Backend publishes the new configuration message.
4.  Observe Message Queue logs and metrics for persistence status (e.g., warnings about non-persistent messages or storage errors).
5.  **Bring "KioskClient-05" online.**
6.  Observe "KioskClient-05" logs for message reception.
7.  Verify "KioskClient-05" does *not* have the new configuration.

Expected Result:
*   The Message Queue should *not* persist the message for "KioskClient-05" due to misconfiguration or error.
*   "KioskClient-05", upon coming online, should *not* receive the new configuration message.
*   "KioskClient-05" should continue to operate with its old configuration.
*   Backend system or Message Queue logs should contain errors or warnings indicating the failure to persist the message.
*   The Backend should ideally have a mechanism to identify clients with outdated configurations due to persistence failure and flag them for re-synchronization.

### TC-011: Client Reconnects but Fails to Connect to Message Queue
Preconditions:
*   Backend system is running.
*   "KioskClient-05" is offline.
*   Message Queue has a pending configuration message for "KioskClient-05".
*   **"KioskClient-05" has a simulated network issue or misconfiguration that prevents it from connecting to the Message Queue even after coming online.**

Steps:
1.  Verify "KioskClient-05" is offline.
2.  Admin saves a new configuration.
3.  Backend publishes the new configuration message.
4.  Observe Message Queue to confirm the message is retained for "KioskClient-05".
5.  **Bring "KioskClient-05" online but keep its connection to the Message Queue blocked or misconfigured.**
6.  Observe "KioskClient-05" logs for connection attempts and failures to the Message Queue.
7.  Verify "KioskClient-05" does *not* receive the new configuration and continues with old settings.
8.  Observe Backend system for any alerts regarding "KioskClient-05" not receiving the update or not connecting to MQ.

Expected Result:
*   "KioskClient-05" should fail to establish a connection with the Message Queue upon coming online.
*   "KioskClient-05" logs should show repeated connection errors and retry attempts to the Message Queue.
*   "KioskClient-05" should *not* receive or apply the pending configuration message.
*   "KioskClient-05" should continue running with its previous valid settings.
*   The Backend system should detect that "KioskClient-05" is online but has not acknowledged the update, and potentially raise an alert or flag it for manual troubleshooting.

### TC-012: Client Rejects Configuration Violating Price Range Rule
Preconditions:
*   Backend, Message Queue, and "KioskClient" are operational.
*   "KioskClient" has a local rule defined: "Game price must be between $1.00 and $50.00".
*   "KioskClient" is running with a valid initial configuration.

Steps:
1.  Admin attempts to save a new game price that violates the local rule (e.g., setting a price to $0.50 or $55.00).
2.  Backend publishes this invalid configuration message.
3.  "KioskClient" receives the configuration message.
4.  Observe "KioskClient" logs for validation failure and error logging.
5.  Verify "KioskClient" rejects the update.
6.  Verify "KioskClient" continues running with its previous valid game prices.
7.  Observe "KioskClient" for an "Configuration Validation Error" log entry.
8.  Observe Backend system for any error acknowledgment from the client (if implemented).

Expected Result:
*   "KioskClient" successfully receives the message but identifies it as invalid based on its local rules.
*   "KioskClient" rejects the update, preventing the invalid price from being applied.
*   "KioskClient" logs a "Configuration Validation Error" with details about the rule violation (e.g., "Price $0.50 is below minimum allowed $1.00").
*   "KioskClient" continues to operate normally with its previous valid configuration.
*   The Backend system should ideally receive an error acknowledgment from the client indicating the rejection and reason.

### TC-013: Client Rejects Configuration with Missing Mandatory Field
Preconditions:
*   Backend, Message Queue, and "KioskClient" are operational.
*   "KioskClient" expects a configuration to always include a mandatory field (e.g., "gameId").
*   "KioskClient" is running with a valid initial configuration.

Steps:
1.  Admin, or a simulated Backend, creates and publishes a configuration message that *omits* a mandatory field (e.g., a new game price configuration for 'Game A' without specifying its 'gameId').
2.  "KioskClient" receives the malformed configuration message.
3.  Observe "KioskClient" logs for parsing or validation errors and error logging.
4.  Verify "KioskClient" rejects the update.
5.  Verify "KioskClient" continues running with its previous valid configuration.
6.  Observe "KioskClient" for a "Configuration Validation Error" log entry specifically about the missing field.

Expected Result:
*   "KioskClient" receives the message but fails its internal schema validation due to the missing mandatory field.
*   "KioskClient" rejects the update.
*   "KioskClient" logs a "Configuration Validation Error" detailing the missing mandatory field (e.g., "Mandatory field 'gameId' is missing").
*   "KioskClient" continues to operate with its previous valid settings.
*   The Backend system should ideally receive an error acknowledgment from the client, providing specific details of the missing field.

### TC-014: Client Handles Consecutive Invalid Configurations
Preconditions:
*   Backend, Message Queue, and "KioskClient" are operational.
*   "KioskClient" has local validation rules.
*   "KioskClient" is running with a valid initial configuration.

Steps:
1.  Admin publishes an invalid configuration (e.g., price too low).
2.  "KioskClient" receives, rejects, logs the error, and continues with previous settings. (Verify this based on TC-012/013 outcomes).
3.  **Shortly after, Admin publishes another, different invalid configuration (e.g., price too high).**
4.  "KioskClient" receives this second invalid configuration.
5.  Observe "KioskClient" logs for the rejection of the second invalid configuration.
6.  Verify "KioskClient" rejects the second update.
7.  Verify "KioskClient" *still* continues running with its original, valid settings.
8.  Observe "KioskClient" for separate "Configuration Validation Error" log entries for each rejection.

Expected Result:
*   "KioskClient" successfully handles multiple consecutive invalid configuration messages.
*   Each invalid configuration is individually rejected, and a specific "Configuration Validation Error" is logged for each.
*   The client consistently maintains its last *valid* configuration and continues operating without applying any of the invalid updates.
*   The client does not enter an unstable state or crash after multiple rejections.

### TC-015: Client Fails to Log Configuration Validation Error
Preconditions:
*   Backend, Message Queue, and "KioskClient" are operational.
*   "KioskClient" has local validation rules.
*   **"KioskClient" has a simulated error in its logging subsystem (e.g., log file permissions issue, logging service unavailable) but can still perform validation.**

Steps:
1.  Admin publishes an invalid configuration (e.g., violating a price rule).
2.  "KioskClient" receives and validates the configuration, identifying it as invalid.
3.  **Observe "KioskClient" logs to verify that *no* "Configuration Validation Error" is recorded, despite the configuration being invalid.**
4.  Verify "KioskClient" still correctly rejects the update.
5.  Verify "KioskClient" continues running with the previous valid settings.
6.  Observe Backend system for any error acknowledgment (it might send one, even without a local log).

Expected Result:
*   "KioskClient" correctly rejects the invalid configuration and continues with previous settings.
*   However, "KioskClient" logs show no entry for the "Configuration Validation Error".
*   The absence of the log entry indicates a critical issue in the client's error reporting.
*   This scenario highlights a silent failure, which should be detected by external monitoring or a dedicated health check if possible.

### TC-016: Client Crashes After Rejecting Invalid Configuration
Preconditions:
*   Backend, Message Queue, and "KioskClient" are operational.
*   "KioskClient" has local validation rules.
*   **"KioskClient" has a simulated defect where a critical error occurs during or immediately after the rejection of an invalid configuration, causing a crash.**

Steps:
1.  Admin publishes an invalid configuration message.
2.  "KioskClient" receives the message and attempts to validate/reject it.
3.  **Observe "KioskClient" status; it should crash or terminate unexpectedly.**
4.  Observe "KioskClient" logs for crash dumps or error messages just before termination.
5.  Verify that "KioskClient" does *not* continue running with its previous valid settings.
6.  Observe Backend system for client disconnection alerts.

Expected Result:
*   "KioskClient" receives the invalid configuration.
*   Instead of gracefully rejecting and continuing, "KioskClient" encounters an unhandled exception or critical error and crashes.
*   "KioskClient" stops operating.
*   The Backend system detects the client's disconnection and potentially flags it as unhealthy.
*   This indicates a severe defect in the client's error handling for invalid configurations.

### TC-017: Client Incorrectly Accepts Invalid Configuration
Preconditions:
*   Backend, Message Queue, and "KioskClient" are operational.
*   **"KioskClient" has a simulated defect in its validation logic, causing it to incorrectly accept an invalid configuration.**
*   "KioskClient" is running with a valid initial configuration.

Steps:
1.  Admin publishes a configuration that *should* violate a local rule (e.g., a game price of $0.50, which is below the minimum $1.00).
2.  "KioskClient" receives the configuration message.
3.  Observe "KioskClient" logs for validation outcomes.
4.  **Verify that "KioskClient" *incorrectly* applies the invalid configuration locally.**
5.  Verify the invalid configuration (e.g., $0.50 price) is active on the "KioskClient" UI or local data.
6.  Observe "KioskClient" logs; there should be *no* "Configuration Validation Error" logged for this scenario.
7.  Observe Backend system for an "Update Successful" acknowledgement from the client.

Expected Result:
*   "KioskClient" receives the invalid configuration but, due to a defect, fails to identify it as invalid.
*   "KioskClient" incorrectly applies the invalid configuration locally.
*   The invalid configuration becomes active on the client, leading to potentially incorrect behavior (e.g., games priced at $0.50 instead of the minimum $1.00).
*   "KioskClient" sends an "Update Successful" acknowledgment to the Backend, indicating a false positive.
*   This scenario represents a critical failure in the client's local validation logic, leading to configuration inconsistency.