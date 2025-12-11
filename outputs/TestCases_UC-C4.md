### TC-001: Client Sends Regular Heartbeats - Active Status & Green Indicator
Preconditions:
*   `KioskClient` is installed, configured, and powered on.
*   `SystemController` is operational and connected to the `KioskClient`.
*   `Dashboard` is accessible and displaying real-time client status.
Steps:
1.  Initiate `KioskClient` to send "Heartbeat" signals consistently every "10 seconds".
2.  Monitor the `SystemController` logs and `Dashboard` for a period of at least 30 seconds (3 heartbeat cycles).
Expected Result:
*   The `SystemController` successfully receives the heartbeats.
*   The `SystemController` marks the `KioskClient` status as "Active".
*   The `Dashboard` displays a "Green Light" indicator for the `KioskClient`.

### TC-002: Client Sends Heartbeats - Malformed/Invalid Heartbeat Signal
Preconditions:
*   `KioskClient` is installed, configured, and powered on.
*   `SystemController` is operational and connected to the `KioskClient`.
*   `Dashboard` is accessible.
Steps:
1.  Configure `KioskClient` to send a "Heartbeat" signal that is syntactically malformed or contains invalid data (e.g., incorrect format, missing required fields).
2.  Send this malformed heartbeat signal to the `SystemController`.
3.  Monitor `SystemController` logs and `KioskClient` status on the `Dashboard`.
Expected Result:
*   The `SystemController` logs an error indicating a malformed/invalid heartbeat.
*   The `SystemController` does *not* update the client's status based on the invalid heartbeat.
*   The `KioskClient` status on the `Dashboard` remains unchanged (or enters an "Error" state if such a status is implemented for invalid input).

### TC-003: Missing Heartbeats - Exactly 3 Consecutive Misses (Passive Status Trigger)
Preconditions:
*   `GameClient-02` is currently in an "Active" status, sending heartbeats every 10 seconds.
*   `SystemController` is operational and monitoring `GameClient-02`.
*   `Dashboard` is accessible and displaying a "Green Light" for `GameClient-02`.
Steps:
1.  Stop `GameClient-02` from sending any further "Heartbeat" signals.
2.  Wait for a duration equivalent to just over 3 consecutive missed heartbeat intervals (e.g., 35 seconds to ensure the detection logic fires).
3.  Monitor the `SystemController` logs and `Dashboard`.
Expected Result:
*   After the 3rd consecutive missed heartbeat, the `SystemController` detects the missing signals.
*   The `SystemController` updates the `GameClient-02` status to "Connection Lost/Passive".
*   The `Dashboard` updates the indicator for `GameClient-02` to "Red".

### TC-004: Missing Heartbeats - Less Than 3 Consecutive Misses (Boundary Condition)
Preconditions:
*   `GameClient-02` is currently in an "Active" status, sending heartbeats every 10 seconds.
*   `SystemController` is operational and monitoring `GameClient-02`.
*   `Dashboard` is accessible and displaying a "Green Light" for `GameClient-02`.
Steps:
1.  Stop `GameClient-02` from sending "Heartbeat" signals.
2.  Wait for a duration equivalent to 2 consecutive missed heartbeat intervals (e.g., 25 seconds).
3.  Monitor the `SystemController` logs and `Dashboard`.
Expected Result:
*   The `SystemController` detects 2 missed heartbeats but does *not* trigger the "Connection Lost/Passive" status.
*   The `GameClient-02` status on the `SystemController` remains "Active".
*   The `Dashboard` indicator for `GameClient-02` remains "Green".

### TC-005: Missing Heartbeats - Intermittent Connection (Counter Reset)
Preconditions:
*   `GameClient-02` is currently in an "Active" status, sending heartbeats every 10 seconds.
*   `SystemController` is operational and monitoring `GameClient-02`.
*   `Dashboard` is accessible and displaying a "Green Light" for `GameClient-02`.
Steps:
1.  Stop `GameClient-02` from sending heartbeats. Wait for a duration equivalent to 2 missed heartbeats (e.g., 25 seconds).
2.  Start `GameClient-02` to send a single "Heartbeat" signal.
3.  Immediately stop `GameClient-02` from sending heartbeats again.
4.  Wait for a duration equivalent to 2 more missed heartbeats (e.g., 25 seconds).
Expected Result:
*   After the heartbeat in Step 2, the `SystemController`'s missed heartbeat counter for `GameClient-02` is reset.
*   Despite missing heartbeats before and after the single successful heartbeat, the `SystemController` status for `GameClient-02` remains "Active".
*   The `Dashboard` indicator for `GameClient-02` remains "Green".

### TC-006: Prolonged Downtime - Exactly 5 Minutes Passive (Boundary Condition)
Preconditions:
*   A client (e.g., `GameClient-01`) has been in "Connection Lost/Passive" state for a significant duration, but less than 5 minutes.
*   `SystemController` is operational and monitoring `GameClient-01`.
*   Technical support team email/SMS notification system is configured.
Steps:
1.  Ensure `GameClient-01` remains in "Connection Lost/Passive" state.
2.  Monitor the `SystemController` for exactly 5 minutes from the moment `GameClient-01` entered the "Passive" state.
3.  Check `SystemController` logs and notification queues.
Expected Result:
*   The `SystemController` does *not* trigger a "Critical Alert" at the 5-minute mark.
*   No email/SMS notifications are sent to the technical support team.
*   `GameClient-01` status remains "Connection Lost/Passive".

### TC-007: Prolonged Downtime - Just Over 5 Minutes Passive (Critical Alert Trigger)
Preconditions:
*   A client (e.g., `GameClient-01`) has been in "Connection Lost/Passive" state for a significant duration, but less than 5 minutes.
*   `SystemController` is operational and monitoring `GameClient-01`.
*   Technical support team email/SMS notification system is configured and functional.
Steps:
1.  Ensure `GameClient-01` remains in "Connection Lost/Passive" state.
2.  Monitor the `SystemController` for 5 minutes and 5 seconds (to ensure "more than 5 minutes" threshold is crossed) from the moment `GameClient-01` entered the "Passive" state.
3.  Check `SystemController` logs and external notification systems (email inbox, SMS logs).
Expected Result:
*   The `SystemController` triggers a "Critical Alert" for `GameClient-01`.
*   An email and/or SMS notification is successfully sent to the configured technical support team.
*   `GameClient-01` status remains "Connection Lost/Passive" and is also flagged with a "Critical Alert".

### TC-008: Prolonged Downtime - Client Recovers Before Alarm Threshold
Preconditions:
*   A client (e.g., `GameClient-01`) has been in "Connection Lost/Passive" state for, e.g., 4 minutes.
*   `SystemController` is operational and monitoring `GameClient-01`.
*   `Dashboard` is accessible and displaying "Red" for `GameClient-01`.
Steps:
1.  After `GameClient-01` has been in "Connection Lost/Passive" state for 4 minutes, start `GameClient-01` to send regular "Heartbeat" signals every 10 seconds.
2.  Monitor the `SystemController` and `Dashboard`.
Expected Result:
*   Upon receiving heartbeats, the `SystemController` updates the `GameClient-01` status back to "Active".
*   The `Dashboard` indicator for `GameClient-01` changes back to "Green".
*   No "Critical Alert" is triggered, and no notifications are sent for `GameClient-01`.

### TC-009: Prolonged Downtime - Notification System Failure
Preconditions:
*   A client (e.g., `GameClient-01`) is configured to become "Passive" and stay passive for more than 5 minutes.
*   `SystemController` is operational.
*   The email/SMS notification service (gateway, external API) is simulated to be unavailable or failing (e.g., network outage, invalid credentials).
Steps:
1.  Induce `GameClient-01` to enter and remain in "Connection Lost/Passive" state for more than 5 minutes.
2.  Before the 5-minute threshold is crossed, simulate a failure or unavailability of the configured email/SMS notification service.
3.  Monitor `SystemController` logs for alert triggering and notification attempts.
Expected Result:
*   The `SystemController` successfully triggers a "Critical Alert" for `GameClient-01`.
*   The `SystemController` attempts to send notifications.
*   The `SystemController` logs an error indicating the failure to deliver email/SMS notifications.
*   The `SystemController` should ideally implement a retry mechanism for notifications or escalate the notification failure internally.

### TC-010: SystemController Performance Under High Load (Boundary/Error Condition)
Preconditions:
*   `SystemController` is operational with a baseline number of clients (e.g., 10-20 active clients).
*   All clients are configured to send "Heartbeat" signals every 10 seconds.
*   Performance monitoring tools are in place for `SystemController` (CPU, Memory, Network I/O).
Steps:
1.  Gradually increase the number of active clients sending heartbeats to a higher number (e.g., 500, then 1000 clients).
2.  Alternatively, reduce the heartbeat interval for all clients (e.g., from 10 seconds to 1 second).
3.  Monitor `SystemController` resource utilization and client status updates.
Expected Result:
*   The `SystemController` continues to process heartbeats and accurately update client statuses (Active/Passive) for all clients.
*   No clients are erroneously marked as "Connection Lost/Passive" due to `SystemController` being overwhelmed.
*   `SystemController` resource utilization remains within acceptable performance thresholds (e.g., CPU < 80%, Memory < 90%).
*   Response times for status queries on the `Dashboard` remain consistent.