import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

//Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

//Components teacher
import { TeacherLoginComponent } from './teacher/teacher-login/teacher-login.component';
import { TeacherMainComponent } from './teacher/teacher-main/teacher-main.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherClockComponent } from './teacher/teacher-clock/teacher-clock.component';
import { TeacherStudentComponent } from './teacher/teacher-student/teacher-student.component';
import { TeacherStudentTimeComponent } from './teacher/teacher-student-time/teacher-student-time.component';
import { TeacherHistComponent } from './teacher/teacher-hist/teacher-hist.component';
import { TeacherHistStatComponent } from './teacher/teacher-hist-stat/teacher-hist-stat.component';
import { TeacherHistLogComponent } from './teacher/teacher-hist-log/teacher-hist-log.component';
import { TeacherHistIncidentComponent } from './teacher/teacher-hist-incident/teacher-hist-incident.component';
import { TeacherHistMoreComponent } from './teacher/teacher-hist-more/teacher-hist-more.component';
import { TeacherSettingComponent } from './teacher/teacher-setting/teacher-setting.component';
import { TeacherInfoComponent } from './teacher/teacher-info/teacher-info.component';

//Components students
import { StudentMainComponent } from './student/student-main/student-main.component';
import { StudentInfoComponent } from './student/student-info/student-info.component';
import { StudentMessageComponent } from './student/student-message/student-message.component';
import { StudentTimelineComponent } from './student/student-timeline/student-timeline.component';

//Guards
import { TeacherAuthGuard } from './teacher/teacher-auth.guard';





@NgModule({
  declarations: [
    AppComponent,
    TeacherLoginComponent,
    TeacherMainComponent,
    TeacherDashboardComponent,
    TeacherClockComponent,
    TeacherStudentComponent,
    TeacherStudentTimeComponent,
    TeacherHistComponent,
    TeacherHistStatComponent,
    TeacherHistLogComponent,
    TeacherHistIncidentComponent,
    TeacherHistMoreComponent,
    TeacherSettingComponent,
    TeacherInfoComponent,
    StudentMainComponent,
    StudentInfoComponent,
    StudentMessageComponent,
    StudentTimelineComponent,
  ],
  entryComponents:[StudentInfoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatCheckboxModule,
    MatTooltipModule,

  ],
  providers: [
    TeacherAuthGuard,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
