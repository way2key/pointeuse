import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherSettingService {
  private apiUrl = 'http://localhost:3000/api/teacher-setting';
  private apiUrl2 = 'http://localhost:4000/api/admin-data-timeplan';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient) { }

  changePassword(password) {
    const url = this.apiUrl + "/password";
    return this.http.post<any>(this.apiUrl, password, this.httpOptions);
  }

  getClockMachine(clockMachineId) {
    const url = this.apiUrl + "/" + clockMachineId;
    return this.http.get<any>(url, this.httpOptions);
  }

  updateClockMachineNotification(payload) {
    const url = this.apiUrl + "/notification";
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  getTimeplan(){
    const url = this.apiUrl2 + "/timeplan";
    return this.http.get<any>(url, this.httpOptions);
  }
}
