import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TeacherAuthService } from './teacher-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivate {
  constructor(private teacherAuthService: TeacherAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.teacherAuthService.isAuthenticated()){
      return true;
    } else{
      this.router.navigate(['teacher/login']);
    }
  }

}
