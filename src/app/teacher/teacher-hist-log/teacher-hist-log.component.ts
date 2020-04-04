import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-teacher-hist-log',
  templateUrl: './teacher-hist-log.component.html',
  styleUrls: ['./teacher-hist-log.component.scss']
})
export class TeacherHistLogComponent implements OnInit {

  logs = [
    {
      opDate: '03.04.2020',
      teacher: 'MLI',
      reason: 'Oubli de timbrage',
      studentId: 'A2562',
      operation: 'Add time',
      reasonDetail: 'M. Genestier oublie de timbrer en arrivant'
    },
    {
      opDate: '02.04.2020',
      teacher: 'JVY',
      reason: 'Pas de pause de midi',
      studentId: 'B2562',
      operation: 'Remove time'
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
