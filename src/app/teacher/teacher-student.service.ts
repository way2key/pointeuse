import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherStudentService {
  private apiUrl = 'http://localhost:3000/api/teacher-student';
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

  modifyPerformedTime(payload){
    let url = this.apiUrl + '/time';
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  getStudentStatus(hash: string){
    const url = this.apiUrl + '/status/' + hash;
    return this.http.get<any>(url);
  }
}
