# Taskly: Task Tracker

A simple, responsive Task Tracker built with **React** and **Vite** for the JTRONIX Frontend Internship Assessment. All three questions (1.1, 1.2 and 1.3) are built into a single application. No backend or database is needed; tasks are saved in the browser.


## Features

### 1.1 Create and display tasks
- Text box and **Add** button (pressing Enter also works)
- New tasks appear in a list on the page
- Empty or whitespace-only tasks are blocked, with an inline error message

### 1.2 Manage tasks
- Mark each task as **Completed** or **Pending** with a checkbox
- **Delete** button on every task
- Live counts for **Total**, **Completed** and **Pending**, plus a progress ring showing the completion percentage

### 1.3 Filter and save tasks
- **All / Pending / Completed** filter, with a count on each option
- Tasks and their statuses are saved in `localStorage`, so they remain after refreshing the page
- Clear layout that works on desktop and mobile screens

### Extras
- Keyboard accessible, with visible focus styles and ARIA labels
- Task text is displayed as plain text (no HTML injection)
- Friendly empty-state message for each filter
- Corrupt or blocked browser storage is handled without crashing

## Tech stack
- React 18
- Vite 5
- Plain CSS (no UI library)

## Getting started

**Requirements:** Node.js 18 or newer

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

### Other commands

```bash
npm run build     # create a production build in dist/
npm run preview   # preview the production build locally
```

## Project structure

```
task-tracker/
├── index.html
├── package.json
├── vite.config.js
├── screenshots/
└── src/
    ├── main.jsx      # app entry point
    ├── App.jsx       # components and logic
    └── styles.css    # styling and responsive rules
```


## How it works
- Tasks are stored as `{ id, text, completed }` objects in React state.
- A `useEffect` saves the list to `localStorage` (key `taskly.tasks.v1`) on every change, and the app loads it again on startup.
- The visible list is derived from the current filter, and the counts are calculated from the full list.

