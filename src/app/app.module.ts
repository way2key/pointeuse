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

//Components
import { TeacherLoginComponent } from './teacher/teacher-login/teacher-login.component';
import { TeacherMainComponent } from './teacher/teacher-main/teacher-main.component';
import { TeacherStudentComponent } from './teacher/teacher-student/teacher-student.component';
import { TeacherHistComponent } from './teacher/teacher-hist/teacher-hist.component';
import { TeacherSettingComponent } from './teacher/teacher-setting/teacher-setting.component';
import { TeacherInfoComponent } from './teacher/teacher-info/teacher-info.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentMainComponent } from './student/student-main/student-main.component';
import { StudentInfoComponent } from './student/student-info/student-info.component';
import { StudentMessageComponent } from './student/student-message/student-message.component';
import { StudentTimelineComponent } from './student/student-timeline/student-timeline.component';

//Guards
import { TeacherAuthGuard } from './teacher/teacher-auth.guard';
import { TeacherClockComponent } from './teacher/teacher-clock/teacher-clock.component';
import { TeacherStudentTimeComponent } from './teacher/teacher-student-time/teacher-student-time.component';



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

  ],
  providers: [
    TeacherAuthGuard,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
