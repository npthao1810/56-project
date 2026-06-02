# Roadmap: 2-Year Anniversary Quest

## Overview

We are building a vibrant, backend-free web application to celebrate a 2-year anniversary. The journey involves setting up the core static architecture with TailwindCSS, building the two main game loops (chat-bubble quizzes and time-locked bingo stamp collection), and finally assembling the reward shop where earned points can be spent.

## Phases

- [ ] **Phase 1: Foundation & Theme** - Setup Vite, TailwindCSS, and the LocalStorage state manager.
- [ ] **Phase 2: The Core Game Loops** - Build the Quiz Engine and the Bingo Stamp Collection.
- [ ] **Phase 3: Reward Shop & Integration** - Build the reward shop and integrate the points system.

## Phase Details

### Phase 1: Foundation & Theme
**Goal**: Establish the project structure, styling system, and local data persistence.
**Depends on**: Nothing
**Requirements**: [CORE-01, CORE-02, CORE-03]
**Success Criteria**:
  1. The Vite app runs locally.
  2. The pink and green color palette is accessible via Tailwind classes.
  3. The `useGameState` hook can read and write to LocalStorage without errors.
**Plans**: TBD

Plans:
- [ ] 01-01: Initialize Vite React app and configure TailwindCSS
- [ ] 01-02: Implement useGameState hook for LocalStorage
- [ ] 01-03: Create the App Shell (Navigation and basic layout)

### Phase 2: The Core Game Loops
**Goal**: Deliver the interactive parts of the application where the user spends their time.
**Depends on**: Phase 1
**Requirements**: [QUIZ-01, QUIZ-02, QUIZ-03, QUIZ-04, QUIZ-05, BINGO-01, BINGO-02, BINGO-03, BINGO-04, BINGO-05, BINGO-06]
**Success Criteria**:
  1. User can answer a quiz question in a chat-bubble UI and see an image/result.
  2. User can click a bingo square, enter a passcode, and receive a stamp.
  3. The system enforces the 1-bingo-per-hour and global 6 PM deadline constraints.
**Plans**: TBD

Plans:
- [ ] 02-01: Build the Chat-Bubble Quiz Engine and static questions
- [ ] 02-02: Build the Bingo Grid and Passcode Validation logic
- [ ] 02-03: Implement the time constraints and bingo-detection rewards

### Phase 3: Reward Shop & Integration
**Goal**: Allow users to spend points and finalize the application flow.
**Depends on**: Phase 2
**Requirements**: [SHOP-01, SHOP-02, SHOP-03]
**Success Criteria**:
  1. User can view available coupons and their point cost.
  2. User can purchase a coupon, deducting points from the state.
  3. User can view their inventory of purchased coupons.
**Plans**: TBD

Plans:
- [ ] 03-01: Build the Reward Shop UI and purchase logic
- [ ] 03-02: Final integration testing and polish

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Theme | 0/3 | Not started | - |
| 2. The Core Game Loops | 0/3 | Not started | - |
| 3. Reward Shop & Integration | 0/2 | Not started | - |
