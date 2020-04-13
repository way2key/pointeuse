import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TeacherHistoryService } from '../teacher-history.service.js';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-hist-log',
  templateUrl: './teacher-hist-log.component.html',
  styleUrls: ['./teacher-hist-log.component.scss']
})
export class TeacherHistLogComponent implements OnInit {
  displayedColumns: string[] = ['date', 'teacher', 'message', 'operation', 'studentId'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private teacherHistoryService:TeacherHistoryService) { }


  ngOnInit() {
    this.getAllLog();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllLog() {
    this.teacherHistoryService.getAllLog()
    .subscribe(
      logs => {
        this.dataSource.data = logs;
      }
    )
  }

}
