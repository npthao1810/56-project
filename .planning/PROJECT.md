# 2-Year Anniversary Quest

## What This Is

A cute, vibrant, light mode web application built to celebrate a 2-year anniversary. It provides an interactive experience for the boyfriend, featuring daily quizzes and a time-bound bingo stamp collection for real-life challenges, culminating in a reward shop. 

## Core Value

A fun, romantic, and engaging experience that seamlessly blends digital interaction with real-life activities, working entirely in the browser without a backend.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] **Part 1: Daily Quizzes:** 10 placeholder questions designed in a chat-bubble UI with 4 options each. Supports images in the questions or revealed after the correct answer. Separate from Part 2, but visible to build curiosity. Designed to be done together in the morning or night.
- [ ] **Part 2: Stamp Collection (Bingo):** Grid-based challenge board. He collects stamps by completing real-life challenges and entering a passcode you provide. 
  - *Logic:* 3 continuous stamps (straight or cross) = 1 bingo = small points. All stamps = big points.
  - *Time Constraints:* Maximum of 1 bingo allowed per hour. Hard deadline: all challenges must be completed before 6:00 PM on June 5, 2026 (GMT+7).
- [ ] **Part 3: Reward Shop:** Points earned from quizzes and challenges can be spent on coupons/rewards.
- [ ] **Theme & UI:** Cute, vibrant, light mode. Colors: Pink (you) and Green (him). 
- [ ] **Tech Stack:** React (Vite) and TailwindCSS.
- [ ] **Architecture:** Completely backend-free. Uses browser Local Storage to save all progress, points, and stamps.

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- [Heavy Backend/Database] — explicitly excluded to keep the project lightweight and simple. The secret passcode system replaces the need for a server.

## Context

- **Technical ecosystem:** React, TailwindCSS, LocalStorage.
- **Goal:** The user wants to learn TailwindCSS while building this project.

## Constraints

- **Timeline**: Must be completed and playable before the event date (June 5, 2026).
- **Tech Stack**: Must use TailwindCSS. No external databases or backend services.

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use LocalStorage + Secret Passcodes | Achieves the goal of verifying real-life challenges without needing a heavy backend. | — Pending |

---
*Last updated: 2026-06-02 after initialization*
## Current Milestone: v1.1 Final Polish & User Journey

**Goal:** Polish visual bugs, refine interactive elements, and weave the application tabs into a cohesive story with an introduction.

**Target features:**
- Fix Thaoxinh shadow positioning.
- Dynamic character spacing on Quiz tab based on progress + CTA.
- Introduction story with calls to action linking the tabs.
- Reorder tabs to show Mountain first as the primary goal tracker.
