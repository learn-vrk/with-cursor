import { createAction, props } from '@ngrx/store';
import { ApiObject } from './objects.models';

/**
 * Objects feature actions – load list from remote API.
 */
export const loadObjects = createAction('[Objects] Load Objects');

export const loadObjectsSuccess = createAction(
  '[Objects] Load Objects Success',
  props<{ objects: ApiObject[] }>()
);

export const loadObjectsFailure = createAction(
  '[Objects] Load Objects Failure',
  props<{ error: unknown }>()
); 