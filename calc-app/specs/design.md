# Design

## Goals

Keep the project simple.

Favor readability, maintainability and low complexity over flexibility that is not currently required.

Build only what is needed today.

---

## Technology Stack

- React
- Vite
- TypeScript
- React Router
- Material UI (MUI)

---

## Deployment

The application must:

- Deploy as a static website using GitHub Pages.
- Work offline after the first visit (PWA).

No backend should be required.

---

## Architecture

The application consists of:

- Layout
- Navigation
- Calculator pages
- Shared UI components
- Shared calculation utilities

Business logic should not be placed inside UI components.

Each calculator should encapsulate its own UI and calculation logic whenever practical.

Avoid unnecessary abstractions.

Do not introduce global state unless there is a demonstrated need.

---

## Routing

Each calculator has its own route.

The navigation drawer should automatically reflect the available calculators.

---

## UI

Use Material UI components whenever possible.

Avoid custom CSS.

Prefer theming over custom styling.

Follow Material Design guidelines.

Design mobile-first while remaining responsive on larger screens.

---

## Localization

All source code must be written in English.

All user-facing content must be written in Brazilian Portuguese.

---

## Code Standards

- Functional React components only.
- React Hooks.
- TypeScript throughout.
- Small, focused components.
- Clear naming.
- Prefer composition over inheritance.
- Avoid duplication.

---

## Project Structure

src/
    components/
    layout/
    pages/
    calculators/
    hooks/
    utils/

This structure may evolve as the project grows, but should remain simple and easy to navigate.