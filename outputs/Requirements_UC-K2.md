# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The system shall display a list of active games to the logged-in Kiosk User.
- **[FR-002]** The system shall retrieve comprehensive game details (including price, available duration options, and difficulty levels) from the Backend Game Service when a user selects a game.
- **[FR-003]** The system shall save the user-selected game configuration, including specified duration and difficulty, upon user confirmation.
- **[FR-004]** The system shall navigate to the "Zone Check" screen immediately after a game configuration is successfully saved.
- **[FR-005]** The system shall display a "Game currently unavailable" message to the user when a game marked as "Passive" is selected.
- **[FR-006]** The system shall retain the user on the game list screen when a game marked as "Passive" is selected.
- **[FR-007]** The system shall display "Last known details" from its local cache when a user selects a game but the Backend Game Service is unreachable.
- **[FR-008]** The system shall allow the user to proceed with default or cached settings when "Last known details" are displayed from the local cache due to an unreachable Backend Game Service.

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** The system shall exhibit resilience by maintaining operational continuity and allowing user progression with locally cached game details in the event of Backend Game Service unavailability.