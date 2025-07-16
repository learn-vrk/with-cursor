import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ObjectsPageComponent } from './objects-page.component';
import * as ObjectsActions from './state/objects.actions';
import { By } from '@angular/platform-browser';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { CommonModule } from '@angular/common';

describe('ObjectsPageComponent', () => {
  let component: ObjectsPageComponent;
  let fixture: ComponentFixture<ObjectsPageComponent>;
  let store: MockStore;

  const initialState = {
    objects: {
      objects: [
        { id: 1, name: 'Test', data: { foo: 'bar' } },
        { id: 2, name: 'Another', data: null },
      ],
      loading: false,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ListViewModule, ObjectsPageComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ObjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadObjects on init', () => {
    const action = ObjectsActions.loadObjects();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should render list items', () => {
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(By.css('.list-item'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Test');
  });
}); 