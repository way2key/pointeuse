import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherSettingService {
  private teacherUrl = 'http://localhost:3000/api/teacher-setting';
  private adminUrl = 'http://localhost:4000/api/admin-data-timeplan';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient) { }

  changePassword(password) {
    const url = this.teacherUrl + "/password";
    return this.http.post<any>(this.teacherUrl, password, this.httpOptions);
  }

  getClockMachine(clockMachineId) {
    const url = this.teacherUrl + "/" + clockMachineId;
    return this.http.get<any>(url, this.httpOptions);
  }

  getTimeplan() {
    const url = this.adminUrl + "/timeplan";
    return this.http.get<any>(url, this.httpOptions);
  }

  getSound() {
    const url = this.teacherUrl + "/sound";
    return this.http.get<any>(url, this.httpOptions);
  }

  updateClockMachineNotification(payload) {
    const url = this.teacherUrl + "/notification";
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  updateClockMachineVolume(payload) {
    const url = this.teacherUrl + "/volume";
    return this.http.post<any>(url, payload, this.httpOptions);
  }


  updateTimeplan(payload){
    const url = this.teacherUrl + "/dayplan";
    return this.http.post<any>(url, payload, this.httpOptions);
  }
}
