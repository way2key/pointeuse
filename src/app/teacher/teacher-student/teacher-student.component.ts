import { Component, OnInit } from '@angular/core';
import { TeacherStudentService } from '../teacher-student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TeacherStudentTimeComponent } from '../teacher-student-time/teacher-student-time.component';
import * as moment from 'moment';


@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.scss']
})

export class TeacherStudentComponent implements OnInit {

  students = [];

  shownStudents = [];

  disabled = true;

  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;

  searchField = '';

  constructor(private teacherStudentService: TeacherStudentService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudents();
  }


  getStudents(): void {
    this.students = [];
    this.teacherStudentService.getAllStudents()
    .subscribe((dbStudents) => {
      this.students = dbStudents;
      for (let student of this.students) {
        this.getStudentStatus(student.hash)
        .then(
          status => {
            student['isSelected'] = false;
            student['presence'] = true;
            student['status'] = status;
          }
        )
      }
      this.students.sort(this.alphabeticalSort('lastname'));
      this.shownStudents = this.students;
      this.autocompleteFill();
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => {
          this.shownStudents = [];
          let studentNames = this._filter(value);
          studentNames.forEach(studentName => {
            this.students.forEach(student => {
              if(studentName === (student.firstname + ' ' + student.lastname)){
                this.shownStudents.push(student);
              };
            })
          });

          return studentNames;
        })
      );
    });
  }

  getStudentStatus(studentHash) {
    return new Promise(( resolve, reject) => {
      this.teacherStudentService.getStudentStatus(studentHash)
      .subscribe(
        status => resolve(status)
      )
    })
  }

  onAll() {
    if (this.students.every(student =>student.isSelected)){
      this.deselectAll();
      document.getElementById("allButton").innerHTML = "Tout selectionner";
    } else {
      this.selectAll();
      document.getElementById("allButton").innerHTML = "Tout déselectionner";
    }
  }

  selectAll() {
    this.students.forEach(student => {
      student.isSelected = true;
    });
    this.disabled = false;
  }

  deselectAll() {
    this.students.forEach(student => {
      student.isSelected = false;
    });
    this.disabled = true;
  }

  onCheckBox() {

    if (this.students.every(student =>student.isSelected)){
        document.getElementById("allButton").innerHTML = "Tout déselectionner";
    } else {
          document.getElementById("allButton").innerHTML = "Tout selectionner";
    }

    if(this.students.some((student) => student.isSelected)) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }

    this.clearSearchField();
  }

  modifyTime() {
    let dialogRef = this.dialog.open(TeacherStudentTimeComponent, {data: this.students});


    dialogRef.afterClosed().subscribe(result =>{
      this.openSnackBar('Temps modifié avec succès');
      this.getStudents();
      this.deselectAll();
    })
  }

  modifyPresence() {
    this.students.forEach(student => {
      if(student.isSelected) {
        let payload = { hash: student.hash }
        this.teacherStudentService.modifyPresence(payload)
        .subscribe(
          result => console.log(result)
        );
      }
    });
    this.openSnackBar('Presence modifiée avec succès');
    this.deselectAll();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'FERMER', {
      duration: 2000,
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  autocompleteFill() {
    this.options = [];
    for(let student of this.students) {
      let name = student.firstname + ' ' + student.lastname;
      this.options.push(name);
    }
  }


  alphabeticalSort(lastname: string) {
    return function(a, b) {
      if(a[lastname] > b[lastname]) {
        return 1;
      } else if (a[lastname] < b[lastname]) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  clearSearchField() {
    this.searchField = '';
    this.shownStudents = this.students;
  }

  convertTime(thisValue: number) {
    let timeValue = Math.abs(thisValue);
    let time;
    let hours = timeValue-(timeValue%1);
    let minutes = ((timeValue%1)*60);

    if (minutes > 59.5) {
      hours = hours + 1;
      minutes = 0;
    }
    minutes = parseInt(minutes.toFixed(0));

    let minutesText;
    let hoursText;
    if (hours === 0 ) {
      hoursText = '00';
    } else if (hours < 10 ) {
      hoursText = '0' + hours.toString();
    } else {
      hoursText =  hours.toString();
    }

    if (minutes === 0 ) {
      minutesText = '00';
    } else if (minutes < 10 ) {
      minutesText = '0' + minutes.toString();
    } else {
      minutesText = minutes.toString();
    }

    if (thisValue < -(0.1/12)) {
      time = '- ' + hoursText + ' : ' + minutesText;
    } else {
      time = '  ' + hoursText + ' : ' + minutesText;
    }

    return time;
  }

}
