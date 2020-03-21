import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from '../teacher-auth.service';

@Component({
  selector: 'app-teacher-main',
  templateUrl: './teacher-main.component.html',
  styleUrls: ['./teacher-main.component.scss']
})
export class TeacherMainComponent implements OnInit {

  constructor(private teacherAuthService: TeacherAuthService) { }

  ngOnInit(): void {
  }

  logUserOut(): void {
    this.teacherAuthService.logUserOut();
  }

}
