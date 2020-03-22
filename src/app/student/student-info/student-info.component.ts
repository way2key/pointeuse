import { Component, OnInit } from '@angular/core';
import { StudentLectureCarteService } from '../student-lecture-carte.service';
import { Student } from '../student-models/student.model';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  student: Student;
  message: Number = 2;

  studentStatus = false;

  constructor(private studentLectureCarteService: StudentLectureCarteService) { }

  ngOnInit(): void {
    this.student = this.studentLectureCarteService.getFromStudentCard();
    this.controleValide(this.studentLectureCarteService.getFromStudentCard());
  }

  controleValide(student: Student) {
    if(!student){
      this.message = 2;
    } else {
      this.message = 0;
      this.student = student;
    }
  }

}
