import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TeacherAuthService } from '../teacher-auth.service';
import { Router } from '@angular/router';

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
  constructor(private teacherAuthService: TeacherAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logUserIn(): void {
    this.teacherAuthService.logUserIn(this.loginForm.value).
    subscribe(
      res => {
        localStorage.setItem('token',res.token);
        this.router.navigate(['teacher/dashboard']);
      },
      err => console.log(err)
    )
  }

}
