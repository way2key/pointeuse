import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TeacherHistoryService } from '../teacher-history.service.js';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-teacher-hist-incident',
  templateUrl: './teacher-hist-incident.component.html',
  styleUrls: ['./teacher-hist-incident.component.scss']
})
export class TeacherHistIncidentComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'studentId'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private teacherHistoryService:TeacherHistoryService) { }


  ngOnInit() {
    this.getAllIncident();
    this.dataSource.sort = this.sort;
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
