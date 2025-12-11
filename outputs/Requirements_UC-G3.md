# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The GameClient shall detect when the game objective has been completed or when the game time has expired.
- **[FR-002]** The GameClient shall calculate the final score for the game session.
- **[FR-003]** The GameClient shall send the final score payload to the Backend Score Service.
- **[FR-004]** The Backend Score Service shall validate the submitted score payload.
- **[FR-005]** The Backend Score Service shall accept valid scores.
- **[FR-006]** The GameClient shall close the active game session.
- **[FR-007]** The GameClient shall transition to an "Idle" state after closing the game session.
- **[FR-008]** The Backend Score Service shall respond with a "Verification Error" when a submitted score fails validation.
- **[FR-009]** The GameClient shall process "Verification Error" responses received from the Backend Score Service.
- **[FR-010]** The GameClient shall mark the submitted score as "Pending Review" locally upon receiving a "Verification Error".
- **[FR-011]** The GameClient shall retain session data locally subsequent to receiving a "Verification Error" from the Backend Score Service.

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** The system shall ensure the reliable recording of player performance (scores).
- **[NFR-002]** The GameClient shall ensure the persistence of session data locally until a definitive score submission status (e.g., accepted, rejected, or permanently failed) is achieved, particularly in cases of backend verification failure.