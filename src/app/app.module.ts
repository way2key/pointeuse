import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { StudentComponent } from './student/student.component';

import { TeacherLoginComponent } from './teacher/teacher-login/teacher-login.component';
import { TeacherMainComponent } from './teacher/teacher-main/teacher-main.component';
import { TeacherStudentComponent } from './teacher/teacher-student/teacher-student.component';
import { TeacherStatComponent } from './teacher/teacher-stat/teacher-stat.component';
import { TeacherSettingComponent } from './teacher/teacher-setting/teacher-setting.component';
import { TeacherInfoComponent } from './teacher/teacher-info/teacher-info.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TeacherLoginComponent,
    TeacherMainComponent,
    TeacherStudentComponent,
    TeacherStatComponent,
    TeacherSettingComponent,
    TeacherInfoComponent,
    TeacherDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
