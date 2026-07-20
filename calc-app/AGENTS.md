# AGENTS.md

## Workflow

Before implementing any task, read:

- specs/requirements.md
- specs/design.md

These documents are the source of truth.

---

## Deployment Context

- Hosted at `https://<owner>.github.io/guano/` (GitHub Pages project site at the repository root).
- `calc-app/vite.config.ts` `base` is set to `/guano/`. The PWA `start_url`, `scope`, and absolute icon paths must match.
- Routing uses `HashRouter`. Do not switch to `BrowserRouter`; the static host does not rewrite deep links.
- Deployment is automated via `.github/workflows/deploy.yml` (GitHub Actions). Tests are run locally with `npm test` only; CI currently does not run them.

---

## Rules

- Do not modify the specification files unless explicitly instructed.
- If a request conflicts with the specifications, explain the conflict before implementing.
- If the specifications are ambiguous, ask for clarification instead of making assumptions.
- Explain architectural or structural changes before implementing them.
- Before considering a task complete, verify that the implementation conforms to the specifications.

## Scope Control

Implement only what is required for the current task.

Do not add features, abstractions, dependencies, optimizations, or refactors that are not required by the specifications or explicitly requested.