import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentInfoComponent } from '../student-info/student-info.component';
import { StudentMessageComponent } from '../student-message/student-message.component';
//import { StudentTestCardComponent } from '../student-test-card/student-test-card.component';
import { StudentLectureCarteService } from '../student-lecture-carte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../student/student-models/student.model';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.scss']
})
export class StudentMainComponent implements OnInit {

  cardForm: FormGroup;
  cardNumber: string;
  private student: Student;


  constructor(private studentLectureCarteService: StudentLectureCarteService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.cardForm = this.formBuilder.group({
      cardNumber: ['',Validators.required]
    });
  }

  onSubmitForm() {
    this.cardNumber = this.cardForm.value['cardNumber'];
    this.studentLectureCarteService.checkAStudent(this.cardForm.value['cardNumber']).toPromise()
      .then(
        (student) => {
          this.studentLectureCarteService.sendToMessage(student);
          this.showMessage();
        }
      );
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
