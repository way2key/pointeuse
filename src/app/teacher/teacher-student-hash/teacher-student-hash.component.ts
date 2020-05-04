import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherStudentService } from '../teacher-student.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-teacher-student-hash',
  templateUrl: './teacher-student-hash.component.html',
  styleUrls: ['./teacher-student-hash.component.scss']
})
export class TeacherStudentHashComponent implements OnInit {
  hash = new FormControl('');
  students;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private teacherStudentService: TeacherStudentService) { }

  ngOnInit(): void {
    this.getModalData();
  }

  updateHash(): void {
    this.students.forEach(student => {
      let payload = {
        _id: student._id,
        hash: this.hash.value
      };
      /*
      let payload2 = {
        "teacher": this.teacher.firstname + " " + this.teacher.lastname,
        "message": "",
        "studentId": student._id,
        "operation": "Horaire selectionné"
      }*/
      this.teacherStudentService.updateStudentHash(payload).subscribe();
      //this.createLog(payload2);
    });

  }

  getModalData() {
    this.students = this.data.students;
  }
}
