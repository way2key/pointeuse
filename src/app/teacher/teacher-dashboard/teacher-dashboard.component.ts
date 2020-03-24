import { Component, OnInit } from '@angular/core';
import { TeacherDashboardService } from '../teacher-dashboard.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  teacher = {
    firstname: 'Nom',
    lastname: 'Prenom'
  }
  constructor(private teacherDashboardService: TeacherDashboardService) { }

  ngOnInit(): void {
    this.getTeacher();
  }

  getTeacher(): void {
    this.teacherDashboardService.getTeacher().subscribe(
      teacher => this.teacher = teacher
    )
  }

}
