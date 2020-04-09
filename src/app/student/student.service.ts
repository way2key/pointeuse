import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiURL = 'http://localhost:3000/api/student';


  constructor(private http: HttpClient) { }

  getStudentStatus(hash: string){
    const url = this.apiURL + '/status/' + hash;
    return this.http.get<any>(url);
  }

  getStudentInfo(hash: string){
    const url = this.apiURL + '/' + hash;
    return this.http.get<any>(url);
  }

  getStudentMeal(hash: string){
    const url = this.apiURL + '/meal/' + hash;
    return this.http.get<any>(url);
  }

  getStudentBreather(hash: string){
    const url = this.apiURL + '/breather/' + hash;
    return this.http.get<any>(url);
  }

  clockAStudent(hash: string): Observable<any> {
    return this.http.post<any>(this.apiURL, {hash: hash});
  }

  getStudentClock(hash: string): Observable<any> {
    const url = this.apiURL + '/clock/' + hash;
    return this.http.get<any>(url);
  }
}
