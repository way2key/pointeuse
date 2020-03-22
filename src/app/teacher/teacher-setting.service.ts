import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherSettingService {
  private changePasswordUrl = 'http://localhost:3000/api/teacher-setting';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': this.auth
  })
  }
  constructor(private http: HttpClient) { }

  changePassword(password) {
    console.log(password);

    return this.http.post<any>(this.changePasswordUrl, password, this.httpOptions);
  }
}
