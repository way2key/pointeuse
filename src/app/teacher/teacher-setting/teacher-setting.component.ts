import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TeacherSettingService } from '../teacher-setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-setting',
  templateUrl: './teacher-setting.component.html',
  styleUrls: ['./teacher-setting.component.scss']
})
export class TeacherSettingComponent implements OnInit {
  changePasswordForm = new FormGroup({
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  timeplan = [
    'Horaire Fixe',
    'Horaire Mobile',
    'Horaire Personnalisé 1'
  ];
  constructor(private teacherSettingService: TeacherSettingService, private router: Router) { }

  ngOnInit(): void {
  }

  changePassword(): void {
    let p1 = this.changePasswordForm.value.newPassword;
    let p2 = this.changePasswordForm.value.confirmPassword;
    if(p1===p2){
      this.teacherSettingService.changePassword({password:p1});
    }
  }

}
