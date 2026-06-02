# Stack Research

## Recommended Stack
- **Framework**: React 18+ via Vite (fast, standard SPA setup).
- **Styling**: TailwindCSS (utility-first, great for rapid UI development and custom themes).
- **State & Storage**: React Context API + LocalStorage API (no external DB needed, persists state across refreshes).
- **Icons**: Lucide React (clean, modern SVG icons).
- **Routing**: React Router (if multiple pages are needed) or simple conditional rendering (for a single-page feel).

## Rationale
Vite + React is the industry standard for fast, client-side applications. Using TailwindCSS fulfills the user's learning goal while making it easy to implement the vibrant pink/green theme. LocalStorage is perfect for a single-user private application, eliminating backend complexity and hosting costs.

## What NOT to use
- Next.js / Server-Side Rendering: Overkill for a simple static anniversary app.
- Firebase / Supabase / MongoDB: Unnecessary backend infrastructure since the "secret passcode" acts as the verification layer.
