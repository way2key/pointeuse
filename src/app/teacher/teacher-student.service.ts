import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherStudentService {
  private apiUrl = 'http://localhost:3000/api/teacher-student';
  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<String[]> {
    return this.http.get<String[]>(this.apiUrl);
  }
}
