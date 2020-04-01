import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-student-time',
  templateUrl: './teacher-student-time.component.html',
  styleUrls: ['./teacher-student-time.component.scss']
})
export class TeacherStudentTimeComponent implements OnInit {

  students = [];
  tempsChoisi = '01:00';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

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

  modifyTime(plusMinus) {
    if (plusMinus === 1) {
      console.log('Enlever du temps');

    } else {
      console.log('Ajouter du temps');
    }

    this.students.forEach(student => {
      console.log('Modified time on student ', student.firstname);
    });
  }
}
