import { createFeature, createReducer, on } from '@ngrx/store';
import * as ObjectsActions from './objects.actions';
import { ApiObject } from './objects.models';

export interface ObjectsState {
  objects: ApiObject[];
  loading: boolean;
  error: unknown;
}

const initialState: ObjectsState = {
  objects: [],
  loading: false,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(ObjectsActions.loadObjects, (state) => ({ ...state, loading: true, error: null })),
  on(ObjectsActions.loadObjectsSuccess, (state, { objects }) => ({ ...state, loading: false, objects })),
  on(ObjectsActions.loadObjectsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const objectsFeature = createFeature({
  name: 'objects',
  reducer,
}); 