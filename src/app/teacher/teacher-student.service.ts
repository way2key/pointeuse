import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherStudentService {
  private apiUrl = 'http://localhost:3000/api/teacher-student';
  private adminUrl = 'http://localhost:4000/api/admin-data-timeplan';
  private studentStatusUrl = 'http://localhost:3000/api/student';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<String[]> {
    return this.http.get<String[]>(this.apiUrl, this.httpOptions);
  }

  getAStudent(incident) {
    const url = this.apiUrl + '/' + incident.studentId;
    return this.http.get<any>(url, this.httpOptions);
  }

  getATeacher(){
    const url = this.apiUrl + "/teacher";
    return this.http.get<String[]>(url, this.httpOptions);
  }

  getStudentStatus(hash: string){
    const url = this.studentStatusUrl + '/status/' + hash;
    return this.http.get<any>(url);
  }

  getStudentPresence(hash: string){
    const url = this.apiUrl + '/presence/' + hash;
    return this.http.get<any>(url);
  }

  createLog(payload){
    const url = this.apiUrl + '/log';
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  getTimeplan() {
    const url = this.adminUrl + "/timeplan";
    return this.http.get<any>(url, this.httpOptions);
  }

  modifyPresence(payload) {
    const url = this.apiUrl + '/presence';
    return this.http.put(url, payload, this.httpOptions);
  }

  modifyPerformedTime(payload) {
    const url = this.apiUrl + '/time';
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  updateTimeplan(payload) {
    const url = this.apiUrl + '/timeplan';
    return this.http.post<any>(url, payload, this.httpOptions);
  }

}
