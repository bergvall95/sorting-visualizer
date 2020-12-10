import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationContentComponent } from './explanation-content.component';

describe('ExplanationContentComponent', () => {
  let component: ExplanationContentComponent;
  let fixture: ComponentFixture<ExplanationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplanationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
