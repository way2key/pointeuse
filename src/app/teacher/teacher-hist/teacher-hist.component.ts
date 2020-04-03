import {Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-teacher-hist',
  templateUrl: './teacher-hist.component.html',
  styleUrls: ['./teacher-hist.component.scss']
})

export class TeacherHistComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  stats = true;
  logs = false;
  incidents = false;
  more = false;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getStudent() {
    alert("you got one!");
  }

  getStat(){
    this.stats = true;
    this.logs = false;
    this.incidents = false;
    this.more = false;
    console.log(this.stats);

  }

  getLog(){
    this.stats = false;
    this.logs = true;
    this.incidents = false;
    this.more = false;
    console.log(this.logs);

  }

  getIncidents(){
    this.stats = false;
    this.logs = false;
    this.incidents = true;
    this.more = false;
    console.log(this.incidents);

  }

  getMore(){
    this.stats = false;
    this.logs = false;
    this.incidents = false;
    this.more = true;
    console.log(this.more);

  }


}
