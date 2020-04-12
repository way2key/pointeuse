import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-message',
  templateUrl: './student-message.component.html',
  styleUrls: ['./student-message.component.scss']
})
export class StudentMessageComponent implements OnInit {
  message = 0;
  status = null;
  student = {
    firstname: 'Nom',
    lastname: 'Prenom'
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService) { }

  ngOnInit() {
    this.clock(this.data.hash)
    .then(
      () => {
        this.getStudent(this.data.hash);
        this.getStatus(this.data.hash);
      }
    )
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

  getStudent(studentHash): void {
    this.studentService.getStudentInfo(studentHash).subscribe(
      student => {
        this.student = student;
        this.message = 1;
      },
      error => {
        console.log(error.message);
      }
    )
  }

  clock(studentHash) {
    return new Promise( (resolve, reject) => {
      this.studentService.clockAStudent(studentHash).subscribe(
        data => {
          console.log('success: ', data);
          resolve(data);
        },
        error => {
          reject(error);
        }
      )
    });
  }

}
