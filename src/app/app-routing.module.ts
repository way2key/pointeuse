import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentMainComponent } from './student/student-main/student-main.component';
import { StudentInfoComponent } from './student/student-info/student-info.component';
import { StudentMessageComponent } from './student/student-message/student-message.component';
import { TeacherLoginComponent } from './teacher/teacher-login/teacher-login.component';
import { TeacherMainComponent } from './teacher/teacher-main/teacher-main.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherStudentComponent } from './teacher/teacher-student/teacher-student.component';
import { TeacherStatComponent } from './teacher/teacher-stat/teacher-stat.component';
import { TeacherSettingComponent } from './teacher/teacher-setting/teacher-setting.component';
import { TeacherInfoComponent } from './teacher/teacher-info/teacher-info.component';
import { TeacherAuthGuard } from './teacher/teacher-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/student', pathMatch: 'full' },
  { path: 'teacher', redirectTo: '/teacher/dashboard', pathMatch: 'full' },
  {
    path: 'student',
    component: StudentMainComponent
  },
  {
    path: 'teacher',
    component: TeacherMainComponent,
    canActivate: [TeacherAuthGuard],
    children:[
      {path:"dashboard" , component: TeacherDashboardComponent},
      {path:"student"   , component: TeacherStudentComponent},
      {path:"stat"      , component: TeacherStatComponent},
      {path:"setting"   , component: TeacherSettingComponent},
      {path:"info"      , component: TeacherInfoComponent},
    ]

  },
  {
    path: 'teacher/login',
    component: TeacherLoginComponent
  },
  {
    path: '**',
    component: StudentMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
