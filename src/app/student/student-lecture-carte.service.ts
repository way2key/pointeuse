import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './student-models/student.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StudentLectureCarteService {
  private apiUrl = 'http://localhost:3000/api/student';

  private student: Student;

  constructor(private http: HttpClient) { }

  updateCardNumber(cardNumber: string) {
  }

  checkAStudent(cardNumber: string): Observable<Student> {
    const url = this.apiUrl + '/' + cardNumber;
    //this.updateStudentTime(cardNumber, this.student)
    return this.http.get<Student>(url);
  }

  updateStudentTime(cardNumber: string, student: Student): Observable<Student> {
    const url = this.apiUrl + '/' + cardNumber;
    var date: string = moment().format();
    var presence;

    if(student.data[student.data.length-1]){
      presence = false;
    } else {
      presence = true;
    }
    student.data.push({date: date, performedTime: 0, presence: presence});
    return this.http.put<Student>(url, student);
  }

  sendToMessage(student: Student){
    this.student = student;
  }

  getFromStudentCard() {
    return this.student;
  }

}
