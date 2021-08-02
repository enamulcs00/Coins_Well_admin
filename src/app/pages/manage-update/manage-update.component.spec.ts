import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUpdateComponent } from './manage-update.component';

describe('ManageUpdateComponent', () => {
  let component: ManageUpdateComponent;
  let fixture: ComponentFixture<ManageUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
