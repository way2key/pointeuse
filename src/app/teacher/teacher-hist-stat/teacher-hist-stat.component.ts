import { Component, OnInit } from '@angular/core';
import { TeacherStudentService } from '../teacher-student.service';
import {FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-teacher-hist-stat',
  templateUrl: './teacher-hist-stat.component.html',
  styleUrls: ['./teacher-hist-stat.component.scss']
})
export class TeacherHistStatComponent implements OnInit {

  students = [];

  shownStudents = [];

  sortCriteria = new FormControl('alphabetical');


  myControlSearch = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private teacherStudentService: TeacherStudentService,) { }

  ngOnInit(): void {
    this.getStudents();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getStudent() {
    alert("you got one!");
  }

  getStudents(): void {
    this.students = [];
    this.teacherStudentService.getAllStudents()
    .subscribe((dbStudents) => {
      this.students = dbStudents;
      this.students.sort(this.sortOrder());
      this.shownStudents = this.students;
      this.autocompleteFill();
      this.filteredOptions = this.myControlSearch.valueChanges
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

  autocompleteFill() {
    this.options = [];
    for(let student of this.students) {
      let name = student.firstname + ' ' + student.lastname;
      this.options.push(name);
    }
  }

  sortOrder() {
    if (this.sortCriteria.value === 'alphabetical') {
      return this.alphabeticalSort();
    } else if (this.sortCriteria.value === 'lowToHigh') {
      return this.lowToHighSort();
    } else if (this.sortCriteria.value === 'highToLow') {
      return this.highToLowSort();
    }
  }

  alphabeticalSort() {
    let lastname = 'lastname';
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

  lowToHighSort() {
    let performedTime = 'performedTime';
    return function(a, b) {
      if(a[performedTime] > b[performedTime]) {
        return 1;
      } else if (a[performedTime] < b[performedTime]) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  highToLowSort() {
    let performedTime = 'performedTime';
    return function(a, b) {
      if(a[performedTime] > b[performedTime]) {
        return -1;
      } else if (a[performedTime] < b[performedTime]) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  reloadStudents() {
    this.getStudents();
    this.shownStudents.sort(this.sortOrder());
  }

}
