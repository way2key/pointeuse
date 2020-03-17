import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.scss']
})

export class TeacherStudentComponent implements OnInit {

  public students = [
    {firstname: 'mojojojo', lastname: 'Hydrogen'},
    {firstname: 'mojojojo', lastname: 'Helium'},
    {firstname: 'mojojojo', lastname: 'Lithium'},
    {firstname: 'mojojojo', lastname: 'Beryllium'},
    {firstname: 'mojojojo', lastname: 'Boron'},
    {firstname: 'mojojojo', lastname: 'Carbon'},
    {firstname: 'mojojojo', lastname: 'Nitrogen'},
    {firstname: 'mojojojo', lastname: 'Oxygen'},
    {firstname: 'mojojojo', lastname: 'Fluorine'}
  ];

  constructor() { }

  ngOnInit(): void {}
}
