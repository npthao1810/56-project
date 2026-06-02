# Architecture Research

## Component Boundaries
- **App Shell**: Navigation, global state provider, theme wrapper.
- **Quiz Engine**: Reads from a static JSON file, handles progression, scoring, and UI presentation (chat bubbles).
- **Bingo Engine**: Renders a 3x3 or 4x4 grid, manages passcode validation logic, enforces time boundaries, calculates stamp rewards.
- **Reward Shop**: Displays available coupons, handles point deductions, and manages inventory state.

## Data Flow
- **State Store**: A centralized hook (e.g., `useGameState`) reads from and writes to LocalStorage.
- **Data Model**:
  - `points`: Integer
  - `completedQuizzes`: Array of IDs
  - `stamps`: Array of IDs/Coordinates
  - `purchasedCoupons`: Array of IDs
- All components subscribe to the State Store to update the UI reactively.

## Build Order
1. Setup Vite + Tailwind (Theme configuration).
2. Build the State Store (LocalStorage hooks).
3. Build Quiz Engine (static data + UI).
4. Build Bingo Engine (grid UI, passcode validation, time constraints).
5. Build Reward Shop.
