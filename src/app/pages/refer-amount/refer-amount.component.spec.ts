import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferAmountComponent } from './refer-amount.component';

describe('ReferAmountComponent', () => {
  let component: ReferAmountComponent;
  let fixture: ComponentFixture<ReferAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
