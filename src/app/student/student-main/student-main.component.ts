import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentInfoComponent } from '../student-info/student-info.component';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.scss']
})
export class StudentMainComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showInfo(): void {
    console.log("da");
    this.dialog.open(StudentInfoComponent);
  }

}
