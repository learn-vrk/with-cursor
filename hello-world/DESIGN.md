# Design Documentation

## Overview
The **HelloWorld** application is a lightweight Angular 19 SPA that demonstrates:

* Stand-alone Angular components & providers (Angular v15+ style).
* NgRx state management for remote data.
* HTTP integration with an external REST API (`api.restful-api.dev`).
* Presentational layer powered by Kendo UI (ListView component).
* Unit testing with Jasmine/Karma (headless Chrome).

## High-Level Architecture
```
[Browser]
   │  (HTTP)
   ▼
[Angular App]
  ├─ HomePageComponent (static)
  └─ ObjectsFeature
       ├─ ObjectsPageComponent ← Kendo ListView
       ├─ NgRx Store Feature Slice
       │    • objects.reducer.ts
       │    • objects.actions.ts
       │    • objects.effects.ts
       └─ ApiService (via HttpClient)

[Dev Proxy]
  /api/*  ──►  https://api.restful-api.dev/* (CORS friendly)
```

### Data Flow
1. `ObjectsPageComponent` dispatches `loadObjects` in `ngOnInit()`.
2. `ObjectsEffects` intercepts the action, makes an HTTP GET to `/api/objects`.
3. On success → `loadObjectsSuccess` with payload, reducer stores `objects` list.
4. Component subscribes with selectors and renders via ListView.
5. Errors are captured by `loadObjectsFailure` and surfaced in the UI.

### State Shape
```ts
interface ObjectsState {
  objects: ApiObject[];   // API payload
  loading: boolean;       // true while fetching
  error: unknown;         // non-null if request failed
}
```

### Key Decisions & Rationale
* **NgRx** chosen for predictable state, easy unit-testing, and future scalability.
* **Kendo UI ListView** provides quick, responsive rendering with minimal setup.
* **Proxy configuration** avoids CORS issues during local development.
* **Headless test runner** (`ChromeHeadless`, `--watch=false`) enables CI-friendly test execution.
* **Stand-alone components** reduce NgModule boilerplate and align with latest Angular guidance.

### Testing Strategy
* **Unit Tests** focus on reducer logic and component behaviour.
* **Effect tests** can be added with `provideMockActions` if asynchronous logic grows.
* **E2E** tests (not included) could be added via Cypress or Playwright for full-stack verification.

### Future Improvements
* Integrate Module Federation for micro-frontend distribution (initial scaffolding present).
* Add caching & optimistic UI updates.
* Expand UI with filtering/sorting using additional Kendo components.
* Implement CI pipeline (GitHub Actions) running `npm ci`, `npm test`, and production build. 