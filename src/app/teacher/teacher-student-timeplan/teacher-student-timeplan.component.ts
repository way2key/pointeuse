import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherStudentService } from '../teacher-student.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-teacher-student-timeplan',
  templateUrl: './teacher-student-timeplan.component.html',
  styleUrls: ['./teacher-student-timeplan.component.scss']
})
export class TeacherStudentTimeplanComponent implements OnInit {
  students;
  timeplan;
  selectedTimeplan:string;
  teacher;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private teacherStudentService: TeacherStudentService) { }

  ngOnInit(): void {
    this.getModalData();
    this.getATeacher();
  }

  getModalData() {
    this.timeplan = this.data.timeplan;
    this.students = this.data.students;
  }

  updateTimeplan() {
    this.students.forEach(student => {
      let payload = {timeplan: this.selectedTimeplan, _id:student._id};
      let payload2 = {
        "teacher": this.teacher.firstname + " " + this.teacher.lastname,
        "message": "",
        "studentId": student._id,
        "operation": "Horaire selectionné"
      }
      this.teacherStudentService.updateTimeplan(payload).subscribe();
      this.createLog(payload2);
    });
  }

  createLog(payload) {
    this.teacherStudentService.createLog(payload)
    .subscribe(
      result => console.log(result)
    )
  }

  getATeacher(){
    this.teacherStudentService.getATeacher()
    .subscribe(
      teacher => {
        this.teacher = teacher;
    }
    )
  }

}
