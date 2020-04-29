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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private teacherStudentService: TeacherStudentService) { }

  ngOnInit(): void {
    this.getModalData();
  }

  getModalData() {
    this.timeplan = this.data.timeplan;
    this.students = this.data.students;
  }

  updateTimeplan() {
    this.students.forEach(student => {
      let payload = {timeplan: this.selectedTimeplan, _id:student._id};
      this.teacherStudentService.updateTimeplan(payload).subscribe();
    });
  }

}
