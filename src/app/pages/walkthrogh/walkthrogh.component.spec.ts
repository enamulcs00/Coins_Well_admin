import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkthroghComponent } from './walkthrogh.component';

describe('WalkthroghComponent', () => {
  let component: WalkthroghComponent;
  let fixture: ComponentFixture<WalkthroghComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkthroghComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkthroghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
