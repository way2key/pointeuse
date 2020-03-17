import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherLoginComponent } from './teacher/teacher-login/teacher-login.component';
import { TeacherMainComponent } from './teacher/teacher-main/teacher-main.component';


const routes: Routes = [
  { path: '', redirectTo: '/student', pathMatch: 'full' },
  { path: 'student', component: StudentComponent },
  { path: 'teacher/dashboard', component: TeacherMainComponent },
  { path: 'teacher/login', component: TeacherLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
