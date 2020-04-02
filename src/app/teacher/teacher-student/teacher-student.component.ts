import { Component, OnInit } from '@angular/core';
import { TeacherStudentService } from '../teacher-student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TeacherStudentTimeComponent } from '../teacher-student-time/teacher-student-time.component';


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
    this.teacherStudentService.getAllStudents()
    .subscribe((dbStudents) => {
      for (let student of dbStudents) {
        let newSelect = 'isSelected';
        let select = false;
        student[newSelect] = select;
        this.students.push(student);
      };
      this.students.sort(this.alphabeticalSort('lastname'));
      this.shownStudents = this.students;
      this.autocompleteFill();
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

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
      this.deselectAll();
    })
  }

  modifyPresence() {
    this.students.forEach(student => {
      if(student.isSelected) {
        console.log('Modified presence on student ', student.firstname);
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

  getStudent() {
    let studentName = this.myControl.value.split([' '],[2]);
    this.students.forEach(student => {
      if(student.firstname === studentName[0] && student.lastname === studentName[1]) {
        this.shownStudents = [];
        this.shownStudents.push(student);
      }
    });
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

}
