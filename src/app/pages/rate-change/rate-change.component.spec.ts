import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateChangeComponent } from './rate-change.component';

describe('RateChangeComponent', () => {
  let component: RateChangeComponent;
  let fixture: ComponentFixture<RateChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
