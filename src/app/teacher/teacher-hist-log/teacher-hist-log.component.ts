import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-hist-log',
  templateUrl: './teacher-hist-log.component.html',
  styleUrls: ['./teacher-hist-log.component.scss']
})
export class TeacherHistLogComponent implements OnInit {

  logs = [
    {
      teacher: 'MLI',
      reason: 'Oublie de timbrage',
      studentId: 'A2562',
      operation: 'Add time'
    },
    {
      teacher: 'MLI',
      reason: 'Oublie de timbrage',
      studentId: 'A2562',
      operation: 'Add time'
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
