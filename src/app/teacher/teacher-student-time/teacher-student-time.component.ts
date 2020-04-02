import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherStudentService } from '../teacher-student.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-teacher-student-time',
  templateUrl: './teacher-student-time.component.html',
  styleUrls: ['./teacher-student-time.component.scss']
})
export class TeacherStudentTimeComponent implements OnInit {

  students = [];
  timeForm = new FormGroup({
    time: new FormControl('')
  });

  chosenTime = "01:00"

  constructor(private teacherStudentService: TeacherStudentService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.data.forEach(student => {
      if(student.isSelected) {
        this.students.push(student)
      }
    });
    this.students.sort(this.alphabeticalSort('lastname'));

  }

  alphabeticalSort(lastname: string) {
    return function(a, b) {
      if(a[lastname] > b[lastname]) {
        return 1;
      } else if (a[lastname] < b[lastname]) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  modifyTime(choice: number) {
    let time;
    if (choice === 0) {
      time = this.chosenTime;
    } else if (choice === 1) {
      time = -this.timeChoice;
    }

    console.log("noooo", time);

    this.students.forEach(student => {

      let payload = {time:4, hash:student.hash}
      console.log(payload);
      this.teacherStudentService.modifyPerformedTime(payload)
      .subscribe(
        result => console.log(result)
      );
    });
  }
}
