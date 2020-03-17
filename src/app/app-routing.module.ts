import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentMainComponent } from './student/student-main/student-main.component';
import { StudentInfoComponent } from './student/student-info/student-info.component';
import { StudentMessageComponent } from './student/student-message/student-message.component';
import { TeacherLoginComponent } from './teacher/teacher-login/teacher-login.component';
import { TeacherMainComponent } from './teacher/teacher-main/teacher-main.component';


const routes: Routes = [
  { path: '', redirectTo: '/student', pathMatch: 'full' },
  { path: 'student', component: StudentMainComponent },
  { path: 'student/info', component: StudentInfoComponent },
  { path: 'student/message', component: StudentMessageComponent },
  { path: 'teacher/dashboard', component: TeacherMainComponent },
  { path: 'teacher/login', component: TeacherLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
