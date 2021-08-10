import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTemplateComponent } from './faq-template.component';

describe('FaqTemplateComponent', () => {
  let component: FaqTemplateComponent;
  let fixture: ComponentFixture<FaqTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
