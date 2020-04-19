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
  clockMachine;
  constructor(private teacherSettingService: TeacherSettingService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.getClockMachine('5e9bfc772178aa4084f14ba2');
    this.getTimeplan();
  }

  changePassword(): void {
    let p1 = this.changePasswordForm.value.newPassword;
    let p2 = this.changePasswordForm.value.confirmPassword;
    let payload = {password: p1};
    if(p1===p2){
      this.teacherSettingService.changePassword(payload)
      .subscribe(
        ((data) => {
          console.log('success: ', data);
        }),
        ((error) => {
        console.log('error: ', error);
        })
      );
    }
  }

  getClockMachine(clockMachineId): void {
    this.teacherSettingService.getClockMachine(clockMachineId)
    .subscribe(
      machine => {
        this.clockMachine = machine;
        this.loading = false;
      }
    )
  }

  getTimeplan(): void {

  }

}
