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
    <div *ngIf="loading$ | async">Loading...</div>
    <ul>
      <li *ngFor="let obj of objects$ | async">
        {{ obj.id }} - {{ obj.name }}
      </li>
    </ul>
    <div *ngIf="error$ | async as error" style="color:red;">
      Error: {{ error | json }}
    </div>
  `,
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