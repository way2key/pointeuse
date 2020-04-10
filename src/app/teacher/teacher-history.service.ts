import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherHistoryService {
  private apiUrl = 'http://localhost:3000/api/teacher-hist';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient) { }

  getAllLog() {
    const url = this.apiUrl + '/log';
    return this.http.get<any>(url, this.httpOptions);
  }

  getAllIncident() {
    const url = this.apiUrl + '/incident';
    return this.http.get<any>(url, this.httpOptions);
  }

}
