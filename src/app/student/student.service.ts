import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiURL = 'http://localhost:3000/api/student';


  constructor(private http: HttpClient) { }

  clockAStudent(hash: string): Observable<any> {
    const url = this.apiURL + '/' + hash;
    return this.http.get<any>(url);
  }

  getStudentInfo(hash: string): Observable<any> {
    const url = this.apiURL + '/' + hash;
    return this.http.get<any>(url);
  }
}
