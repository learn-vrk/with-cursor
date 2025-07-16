import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { objectsFeature } from './state/objects.reducer';
import { ObjectsEffects } from './state/objects.effects';

const routes: Routes = [
  {
    path: 'objects',
    loadComponent: () => import('./objects-page.component').then((m) => m.ObjectsPageComponent),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(objectsFeature),
    provideEffects(ObjectsEffects),
  ],
};
