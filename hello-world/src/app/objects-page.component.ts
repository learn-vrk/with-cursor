/**
 * ObjectsPageComponent
 * --------------------
 * Displays a list of objects fetched from https://api.restful-api.dev/objects.
 * The component dispatches a NgRx action on init, listens to store selectors
 * for data / loading / error and presents the results using Kendo ListView.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiObject } from './state/objects.models';
import * as ObjectsActions from './state/objects.actions';
import { objectsFeature } from './state/objects.reducer';

@Component({
  selector: 'app-objects-page',
  standalone: true,
  imports: [CommonModule, ListViewModule],
  template: `
    <h2>Objects</h2>
    <kendo-listview [data]="(objects$ | async) || []" class="object-listview">
      <ng-template kendoListViewItemTemplate let-item>
        <div class="list-item">
          <strong>{{ item.name }}</strong> (ID: {{ item.id }})
          <pre>{{ item.data | json }}</pre>
        </div>
      </ng-template>
    </kendo-listview>
    <div *ngIf="error$ | async as error" class="error">
      Error: {{ error | json }}
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
      padding: 1rem;
    }
    .object-listview .list-item {
      padding: 0.5rem 0.75rem;
      border-bottom: 1px solid #e0e0e0;
    }
    pre {
      margin: 0;
      white-space: pre-wrap;
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