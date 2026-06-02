# Research Summary

## Stack
- Vite + React 18
- TailwindCSS (Utility-first styling, great for the custom Pink/Green vibrant theme)
- LocalStorage (Backend-free state persistence)
- Lucide React (Icons)

## Table Stakes & Architecture
- The application is a static SPA running entirely in the browser. 
- Core components include the App Shell, Quiz Engine, Bingo Engine, and Reward Shop.
- Data flows from a centralized `useGameState` hook synced to LocalStorage.
- Time constraints are strictly enforced using robust date logic (UTC/Offset based).

## Watch Out For
- **LocalStorage Errors**: Always use try/catch blocks for JSON parsing to avoid white-screens on corrupted data.
- **Timezone Bugs**: The June 5, 2026, 6:00 PM (GMT+7) deadline must be calculated reliably regardless of the device's local clock timezone settings.
- **Tailwind Purging**: Avoid constructing Tailwind class names dynamically via string concatenation. Use full class names in the source code.
- **Exposed Passcodes**: Keep passcodes slightly obfuscated or accept that it relies on the honor system.

## Next Steps
Proceed to defining Requirements and drafting the Roadmap based on these architectural constraints.
