import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ObjectsActions from './objects.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiObject } from './objects.models';

@Injectable()
export class ObjectsEffects {
  loadObjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ObjectsActions.loadObjects),
      switchMap(() =>
        this.http.get<ApiObject[]>('/api/objects').pipe(
          map((objects) => ObjectsActions.loadObjectsSuccess({ objects })),
          catchError((error) => of(ObjectsActions.loadObjectsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
} 