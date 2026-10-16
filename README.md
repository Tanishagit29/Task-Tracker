<<<<<<< HEAD
# Taskly – Task Tracker

Frontend internship assessment (JTRONIX). A small Task Tracker built with **React + Vite**. It covers all three questions (1.1, 1.2, 1.3) in a single application. No backend or database is used.

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # starts the dev server (usually http://localhost:5173)
```

Production build:

```bash
npm run build      # output goes to dist/
npm run preview    # serves the built app locally
```

## Features

**1.1 Create and display tasks**
- Text box and **Add** button (pressing Enter also works).
- New tasks appear in a list on the page.
- Empty or whitespace-only tasks are rejected with an inline error message.

**1.2 Manage tasks**
- Checkbox on each task toggles **Completed** / **Pending** (shown with a badge and strike-through).
- **Delete** button on each task.
- Sidebar shows **Total**, **Completed** and **Pending** counts, plus a progress ring with the completion percentage.

**1.3 Filter and save tasks**
- **All / Pending / Completed** filter pills, each with a live count.
- Tasks and their statuses are saved to `localStorage` (key: `taskly.tasks.v1`) and survive a page refresh. Corrupt or blocked storage is handled without crashing.
- Responsive layout: sidebar plus content on desktop, stacked on tablets and phones (checked at 375px with no horizontal scrolling).

## Extras
- Keyboard accessible, with visible focus styles and ARIA labels on the checkbox and delete controls.
- Task text is rendered as plain text (no HTML injection).
- Friendly empty-state message for each filter.

## Project structure

```
src/
  main.jsx     entry point
  App.jsx      all components and logic
  styles.css   styling and responsive rules
screenshots/   desktop, mobile, filter and validation screenshots
```

## Screenshots

See the `screenshots/` folder:
- `01-add-tasks.png` – adding tasks
- `02-filter-completed.png` – Completed filter active
- `03-desktop-full.png` – desktop layout
- `04-validation-error.png` – empty-task validation
- `05-mobile.png` – mobile layout (375px)

## Status

All required features are implemented. Public deployment was not done (optional).
=======
# Task-Tracker
>>>>>>> edf21e27b2eeee3ae9b260fad5a89f85332c097c
