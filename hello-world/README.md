# HelloWorld

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Objects Feature

The **Objects** page fetches data from `https://api.restful-api.dev/objects` via an NgRx-powered flow:

1. `ObjectsPageComponent` dispatches `loadObjects` on init.
2. `ObjectsEffects` performs an HTTP GET (`/api/objects` behind the dev proxy).
3. Results are stored in the NgRx state and rendered using the Kendo ListView.

During development the Angular dev-server proxies `/api/**` requests to avoid CORS. See `proxy.conf.json`.

### Unit tests

Run once in headless Chrome and exit automatically:

```bash
npm test
```

Tests live in:
* `objects-page.component.spec.ts` – component behaviour & rendering
* `objects.reducer.spec.ts` – reducer logic
