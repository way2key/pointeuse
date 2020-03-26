import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentInfoComponent } from '../student-info/student-info.component';
import { StudentMessageComponent } from '../student-message/student-message.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.scss']
})
export class StudentMainComponent implements OnInit {
  private infoRequested = false;
  cardForm = new FormGroup({
    cardNumber: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  info(){
    this.infoRequested = !this.infoRequested;
  }

  readCard() {
    let studentHash = this.cardForm.value.cardNumber;

    if(this.infoRequested){
      this.infoRequested = !this.infoRequested;
      this.showInfo(studentHash);
    }else {
      this.showMessage(studentHash);
    }
  }

  showInfo(studentHash) {
    let dialogRef = this.dialog.open(StudentInfoComponent,{data: {hash: studentHash}});

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed');
    })
  }

  showMessage(studentHash) {
    let dialogRef = this.dialog.open(StudentMessageComponent,{data: {hash: studentHash}});

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed');
    })
  }

}
