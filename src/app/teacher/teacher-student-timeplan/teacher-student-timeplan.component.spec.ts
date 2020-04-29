import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentTimeplanComponent } from './teacher-student-timeplan.component';

describe('TeacherStudentTimeplanComponent', () => {
  let component: TeacherStudentTimeplanComponent;
  let fixture: ComponentFixture<TeacherStudentTimeplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentTimeplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentTimeplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
