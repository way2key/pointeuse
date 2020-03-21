import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthService {
  private loginUrl = 'http://localhost:3000/api/teacher-auth/login';
  constructor(private http: HttpClient, private router: Router) { }

  logUserIn(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logUserOut() {
    localStorage.removeItem('token');
    this.router.navigate(['teacher/login']);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
