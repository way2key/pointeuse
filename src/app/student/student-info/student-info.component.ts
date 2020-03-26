import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  public student = {
    meal: false,
    break: true,
    status: true,
    firstname: "Olivier",
    lastname: "Dancona",
    elapsedTime: '2'
  }

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    //this.student = this.studentLectureCarteService.getStudentFromCard();
  }
}
