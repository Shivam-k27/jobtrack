# JobTrack — Job & Placement Tracker

A modern, SaaS-style dashboard for tracking job applications, online assessments, interviews, and offers during placement season. Built as a fully client-side React application — no backend, no database, all data lives in the browser via `localStorage`.

> **Live Demo:** https://jobtrack-taupe.vercel.app/

> **Note:** All company names and application data shipped with this project are fictional sample data used to demonstrate the UI.

---

## Overview

Placement season means juggling dozens of applications across companies, each moving through its own pipeline — applied, online assessment, interview, and finally an offer or a rejection. JobTrack gives that pipeline a home: a single dashboard to see where every application stands, what's due next, and how the season is trending.

The interface is built around a signature visual motif — the **pipeline rail**, a connected-node track that mirrors the real stage-by-stage journey of a placement application. It shows up as compact status chips throughout the app and as a full progress timeline on each application's detail page.

## Features

* **Dashboard** — total/active application counts, a full status breakdown, an applications-over-time trend, a selected-vs-rejected outcome chart, upcoming interviews & deadlines, and a recent-activity feed.
* **Applications list** — searchable, filterable (by status), and sortable (by deadline, applied date, company, or CTC), with both table and card layouts.
* **Add Application** — validated form for company, role, CTC, location, dates, status, description, and notes.
* **Application Details** — full record view with an editable form, a delete confirmation flow, and a vertical pipeline-rail timeline of progress.
* **Calendar** — month view with interview and deadline markers, plus a day-detail panel.
* **Dark / light mode**, persisted across visits.
* **Full CRUD**, all persisted to `localStorage` — your data survives a refresh.
* Empty states, loading skeleton, responsive layout (desktop sidebar, mobile drawer nav), and delete confirmations throughout.

## Tech Stack

* **React 19** (functional components, hooks: `useState`, `useEffect`, `useMemo`, custom hooks)
* **Vite** — build tooling and dev server
* **React Router v7** — client-side routing
* **Recharts** — dashboard charts
* **lucide-react** — icon set
* **localStorage** — persistence layer (no backend, no database)
* Plain CSS with a shared design-token system (no CSS framework)

## Screenshots

*Add screenshots of the Dashboard, Applications list, Application Details, and Calendar pages here before sharing this project.*

```text
docs/screenshots/dashboard.png
docs/screenshots/applications.png
docs/screenshots/details.png
docs/screenshots/calendar.png
```

## Installation

Requires Node.js 18+ and npm.

```bash
# 1. Move into the project folder
cd jobtrack

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other commands

```bash
npm run build     # production build, output to dist/
npm run preview   # preview the production build locally
npm run lint      # run oxlint against src/
```

On first run, JobTrack seeds `localStorage` with 12 sample applications so the dashboard and charts aren't empty. Delete all applications (or clear `localStorage`) to start from a blank slate.

## Folder Structure

```text
src/
├── components/
│   ├── charts/
│   ├── ApplicationCard.jsx
│   ├── ApplicationForm.jsx
│   ├── ApplicationTable.jsx
│   ├── ConfirmDialog.jsx
│   ├── EmptyState.jsx
│   ├── PipelineRail.jsx
│   ├── SearchFilterBar.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   ├── StatusBadge.jsx
│   ├── Topbar.jsx
│   └── UpcomingList.jsx
├── data/
│   ├── constants.js
│   └── sampleData.js
├── hooks/
│   ├── useApplications.js
│   └── useTheme.js
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── AddApplication.jsx
│   ├── ApplicationDetails.jsx
│   ├── Applications.jsx
│   ├── Calendar.jsx
│   ├── Dashboard.jsx
│   └── NotFound.jsx
├── utils/
│   ├── dateUtils.js
│   ├── statsUtils.js
│   ├── storage.js
│   └── validation.js
├── App.jsx
├── main.jsx
└── index.css
```

## Future Improvements

* Export/import applications as JSON or CSV for backup and sharing.
* Attach resumes or offer letters per application (would require a backend or IndexedDB for file storage).
* Reminders/notifications for upcoming deadlines.
* Multi-device sync via an optional backend, without losing the offline-first localStorage mode.
* Kanban-style board view of applications grouped by status.
* Tagging/labels for referral source, application round, or interview panel.

---

Built with React + Vite.
