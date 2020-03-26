import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
    message = 0;
    meal = false;
    breather = false;
    status = null;
    student = {
    break: true,
    firstname: "Olivier",
    lastname: "Dancona",
    elapsedTime: '2'
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStatus(this.data.hash);
    this.getStudent(this.data.hash);
  }

  getStatus(studentHash): void {
    this.studentService.getStudentStatus(studentHash).subscribe(
      status => {
        this.status = status;
      },
      error => {
        console.log(error.message);
      }
    )
  }

  getStudent(hash): void {
    this.studentService.getStudentInfo(hash).subscribe(
      student => {

        this.student = student;
        this.message = 1;
        this.meal = false;
        this.breather = false;
      },
      error => {
        console.log(error.message);
      }

    )
  }

}
