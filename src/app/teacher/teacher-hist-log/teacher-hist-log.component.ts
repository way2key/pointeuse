import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TeacherHistoryService } from '../teacher-history.service.js';

@Component({
  selector: 'app-teacher-hist-log',
  templateUrl: './teacher-hist-log.component.html',
  styleUrls: ['./teacher-hist-log.component.scss']
})
export class TeacherHistLogComponent implements OnInit {

  logs = [];


  constructor(private teacherHistoryService:TeacherHistoryService) { }

  ngOnInit(): void {
    this.getAllLog();
  }

  getAllLog(): void{
    this.teacherHistoryService.getAllLog()
    .subscribe(
      logs => this.logs = logs
    )
  }

}
