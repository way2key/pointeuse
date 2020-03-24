import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherDashboardService {
  private getTeacherUrl = 'http://localhost:3000/api/teacher-dashboard';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient) { }

  getTeacher(): Observable<any>{
      return this.http.get<any>(this.getTeacherUrl, this.httpOptions);
  }
}
