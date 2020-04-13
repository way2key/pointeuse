import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TeacherHistoryService } from '../teacher-history.service.js';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-hist-incident',
  templateUrl: './teacher-hist-incident.component.html',
  styleUrls: ['./teacher-hist-incident.component.scss']
})
export class TeacherHistIncidentComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'studentId'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private teacherHistoryService:TeacherHistoryService) { }


  ngOnInit() {
    this.getAllIncident();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllIncident() {
    this.teacherHistoryService.getAllIncident()
    .subscribe(
      incident => {
        this.dataSource.data = incident;
      }
    )
  }

}
