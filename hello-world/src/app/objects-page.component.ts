import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiObject } from './state/objects.models';
import * as ObjectsActions from './state/objects.actions';
import { objectsFeature } from './state/objects.reducer';

@Component({
  selector: 'app-objects-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Objects</h2>
    <div *ngIf="loading$ | async" class="loading">Loading...</div>
    <div class="objects-grid">
      <div class="object-card" *ngFor="let obj of objects$ | async">
        <h3>{{ obj.name }}</h3>
        <p>ID: {{ obj.id }}</p>
        <pre>{{ obj.data | json }}</pre>
      </div>
    </div>
    <div *ngIf="error$ | async as error" class="error">
      Error: {{ error | json }}
    </div>
  `,
  styles: [
    `
    .objects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .object-card {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      background: #fafafa;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .object-card h3 {
      margin-top: 0;
      font-size: 1.1rem;
    }

    .loading {
      font-style: italic;
    }

    .error {
      color: red;
      margin-top: 1rem;
    }
    `
  ],
})
export class ObjectsPageComponent implements OnInit {
  objects$: Observable<ApiObject[]> = this.store.select(objectsFeature.selectObjects);
  loading$: Observable<boolean> = this.store.select((state) => objectsFeature.selectObjectsState(state).loading);
  error$: Observable<unknown> = this.store.select((state) => objectsFeature.selectObjectsState(state).error);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ObjectsActions.loadObjects());
  }
} 