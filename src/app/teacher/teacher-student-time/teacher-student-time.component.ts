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
    time: new FormControl(''),
    message: new FormControl('')
  });

  chosenTime = "01:00";
  addButton ="false";
  choice = 0;

  motives = [
    {justification: "Oubli de timbrage"},
    {justification: "Mauvaise pause"},
    {justification: "Autre"},
  ];

  justificationText = '';



  constructor(private teacherStudentService: TeacherStudentService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.data.forEach(student => {
      if(student.isSelected) {
        this.students.push(student)
      }
    });
    this.students.sort(this.alphabeticalSort('lastname'));

  }

  onSubmit(){
    let time = this.chosenTime.toString().split(':',2);
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    hours = hours + (minutes/60);

    if (this.choice === 1) {
      hours = -hours;
    }
    this.students.forEach(student => {
      let payload = {time: hours, hash:student.hash}
      this.modifyTime(payload);
      let payload2 = {
        "teacher":"A retrouver depuis le token de connexion",
        "message":"A retrouver edpuis le formulaire",
        "studentId": "abcd",
        "operation": "coco"
      };
      this.createLog(payload2);
    });
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

  addTime() {
    this.choice = 0;
  }

  removeTime() {
    this.choice = 1;
  }

  modifyTime(payload) {
    this.teacherStudentService.modifyPerformedTime(payload)
    .subscribe(
      result => console.log(result)
    );
  }

  createLog(payload) {
    this.teacherStudentService.createLog(payload)
    .subscribe(
      result => console.log(result)
    )
  }
}
