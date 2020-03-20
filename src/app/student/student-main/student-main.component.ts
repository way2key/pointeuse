import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentInfoComponent } from '../student-info/student-info.component';
import { StudentMessageComponent } from '../student-message/student-message.component';
import { StudentTestCardComponent } from '../student-test-card/student-test-card.component';

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
    let dialogRef = this.dialog.open(StudentInfoComponent);

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed');
    })
  }

  showMessage(): void {
    let dialogRef = this.dialog.open(StudentMessageComponent);

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed');
    })
  }

}
