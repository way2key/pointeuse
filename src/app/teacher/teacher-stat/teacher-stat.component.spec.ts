import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStatComponent } from './teacher-stat.component';

describe('TeacherStatComponent', () => {
  let component: TeacherStatComponent;
  let fixture: ComponentFixture<TeacherStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
