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
    student = {
    break: true,
    status: true,
    firstname: "Olivier",
    lastname: "Dancona",
    elapsedTime: '2'
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudent(this.data.hash);
  }

  getStudent(hash): void {
    this.studentService.getStudentInfo(hash).subscribe(
      student => {
        this.student = student;
        this.message = 1;
        this.student.meal = 0;
        this.student.breather = 0;
      },
      error => {
        console.log(error.message);
      }

    )
  }
}
