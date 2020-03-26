import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './student-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentLectureCarteService {
  private apiUrl = 'http://localhost:3000/api/student-message';

  private student: Student;

  constructor(private http: HttpClient) { }

  updateCardNumber(cardNumber: string) {
  }

  checkAStudent(cardNumber: string): Observable<Student> {
    const url = this.apiUrl + '/' + cardNumber;
    return this.http.get<Student>(url);
  }

  sendToMessage(student: Student){
    this.student = student;
  }

  getFromStudentCard() {
    return this.student;
  }

}
