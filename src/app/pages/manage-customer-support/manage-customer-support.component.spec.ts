import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomerSupportComponent } from './manage-customer-support.component';

describe('ManageCustomerSupportComponent', () => {
  let component: ManageCustomerSupportComponent;
  let fixture: ComponentFixture<ManageCustomerSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCustomerSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomerSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
