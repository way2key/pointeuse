import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthService {
  private loginUrl = 'http://localhost:3000/api/teacher-auth/login';
  constructor(private http: HttpClient) { }

  logUserIn(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
