import { objectsFeature } from './objects.reducer';
import * as ObjectsActions from './objects.actions';

describe('objectsReducer', () => {
  it('should set loading true on loadObjects', () => {
    const state = objectsFeature.reducer(undefined, ObjectsActions.loadObjects());
    expect(state.loading).toBeTrue();
    expect(state.objects.length).toBe(0);
  });

  it('should load objects on success', () => {
    const objects = [
      { id: 1, name: 'Test', data: null },
      { id: 2, name: 'Another', data: null },
    ];
    const state = objectsFeature.reducer(undefined, ObjectsActions.loadObjectsSuccess({ objects }));
    expect(state.loading).toBeFalse();
    expect(state.objects).toEqual(objects);
  });

  it('should set error on failure', () => {
    const error = new Error('oops');
    const state = objectsFeature.reducer(undefined, ObjectsActions.loadObjectsFailure({ error }));
    expect(state.loading).toBeFalse();
    expect(state.error).toBe(error);
  });
}); 