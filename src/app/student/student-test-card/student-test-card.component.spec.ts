import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTestCardComponent } from './student-test-card.component';

describe('StudentTestCardComponent', () => {
  let component: StudentTestCardComponent;
  let fixture: ComponentFixture<StudentTestCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTestCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
