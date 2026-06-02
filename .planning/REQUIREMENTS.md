# Requirements: 2-Year Anniversary Quest

**Defined:** 2026-06-02
**Core Value:** A fun, romantic, and engaging experience that seamlessly blends digital interaction with real-life activities, working entirely in the browser without a backend.

## v1 Requirements

### Architecture & Theme
- [ ] **CORE-01**: Initialize React/Vite project with TailwindCSS.
- [ ] **CORE-02**: Implement cute, vibrant, light mode UI with Pink (you) and Green (him) theme.
- [ ] **CORE-03**: Create centralized state manager (useGameState) using LocalStorage API to persist data.

### Part 1: Quizzes
- [ ] **QUIZ-01**: Build Quiz UI visualized as a chat-bubble conversation.
- [ ] **QUIZ-02**: Each question must support exactly 4 answer options.
- [ ] **QUIZ-03**: Quiz system must support rendering images in the question prompt or after the correct answer is revealed.
- [ ] **QUIZ-04**: Include exactly 10 placeholder questions in the initial setup.
- [ ] **QUIZ-05**: Award points to the user for correct answers.

### Part 2: Bingo Stamp Collection
- [ ] **BINGO-01**: Build a grid-based bingo UI for real-life challenges.
- [ ] **BINGO-02**: Implement a passcode validation input modal for verifying challenges.
- [ ] **BINGO-03**: Detect and reward a "Bingo" (3 contiguous stamps - straight or diagonal) with small points.
- [ ] **BINGO-04**: Detect and reward completing the full board with big points.
- [ ] **BINGO-05**: Enforce rate limit: maximum 1 bingo (3 contiguous stamps) allowed per hour.
- [ ] **BINGO-06**: Enforce global deadline: lock all challenges completely at 6:00 PM on June 5, 2026 (GMT+7).

### Part 3: Reward Shop
- [ ] **SHOP-01**: Build UI to list available rewards/coupons.
- [ ] **SHOP-02**: Allow user to purchase coupons by deducting earned points.
- [ ] **SHOP-03**: Display an inventory of purchased coupons.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend / Database | Avoid unnecessary complexity and hosting; LocalStorage is sufficient. |
| User Authentication | Single-user private URL, login is overkill. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CORE-01 | TBD | Pending |
| CORE-02 | TBD | Pending |
| CORE-03 | TBD | Pending |
| QUIZ-01 | TBD | Pending |
| QUIZ-02 | TBD | Pending |
| QUIZ-03 | TBD | Pending |
| QUIZ-04 | TBD | Pending |
| QUIZ-05 | TBD | Pending |
| BINGO-01 | TBD | Pending |
| BINGO-02 | TBD | Pending |
| BINGO-03 | TBD | Pending |
| BINGO-04 | TBD | Pending |
| BINGO-05 | TBD | Pending |
| BINGO-06 | TBD | Pending |
| SHOP-01 | TBD | Pending |
| SHOP-02 | TBD | Pending |
| SHOP-03 | TBD | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 0
- Unmapped: 17 ⚠️

---
*Requirements defined: 2026-06-02*
*Last updated: 2026-06-02 after initial definition*
