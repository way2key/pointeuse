import { Component, OnInit } from '@angular/core';
import { TeacherStudentService } from '../teacher-student.service';


@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.scss']
})

export class TeacherStudentComponent implements OnInit {
  students = [];
  constructor(private teacherStudentService: TeacherStudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.teacherStudentService.getAllStudents()
    .subscribe(dbStudents => this.students = dbStudents);
  }
}
