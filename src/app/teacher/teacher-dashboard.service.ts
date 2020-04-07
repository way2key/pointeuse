import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherDashboardService {
  private TeacherUrl = 'http://localhost:3000/api/teacher-dashboard/teacher';
  private IncidentUrl = 'http://localhost:3000/api/teacher-dashboard/incident';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient) { }

  getTeacher(): Observable<any> {
    return this.http.get<any>(this.TeacherUrl, this.httpOptions);
  }

  getIncident(): Observable<any> {
      return this.http.get<any>(this.IncidentUrl, this.httpOptions);
  }

  checkIncident(incident): Observable<any> {
    return this.http.put(this.IncidentUrl, incident, this.httpOptions);
  }
}
