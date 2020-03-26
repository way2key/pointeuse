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
  student = {
    firstname: 'Nom',
    lastname: 'Prenom'
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
        this.student.status = true;
      },
      error => {
        console.log(error.message);
      }


    )
  }
}
