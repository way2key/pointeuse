import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TeacherLoginService } from '../teacher-login.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.scss']
})
export class TeacherLoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private teacherLoginService: TeacherLoginService) { }

  ngOnInit(): void {
  }

  logUserIn(): void {
    console.log(this.loginForm.value);
    this.teacherLoginService.logUserIn(this.loginForm.value).
    subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
