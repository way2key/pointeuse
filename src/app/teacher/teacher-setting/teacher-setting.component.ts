import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
  timeplan;
  selectedTimeplan:string;
  sounds;
  soundSetting;
  clockMachine;
  clockMachineId='5eac2b3d197357249cc24249';
  loading;
  clockInSound;
  clockOffSound;
  infoSound;
  errorSound;

  constructor(private teacherSettingService: TeacherSettingService, private router: Router, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loading = true;
    this.getClockMachine(this.clockMachineId);
    this.getTimeplan();
    this.getSound();
  }

  getTimeplan(): void {
    this.teacherSettingService.getTimeplan()
    .subscribe(
      timeplans => {
        this.timeplan=[];
        for (let t of timeplans) {
          this.timeplan.push({name:t.name,id:t._id})
        }
      },
      error => console.log(error)
    )
  }

  getSound(): void {
    this.teacherSettingService.getSound()
    .subscribe(
      sounds => this.sounds = sounds
    )
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

        if(machine.timeplan) {
          this.selectedTimeplan = machine.timeplan;
        }

        if(machine.sound) {
          this.soundSetting = machine.sound;
        }
        this.loading = false;
      }
    )
  }

  updateClockMachineNotification(): void {
    this.teacherSettingService.updateClockMachineNotification(this.clockMachine)
    .subscribe(
      succes => console.log(succes),
      error => console.log(error)
    )
  }

  updateClockMachineVolume(): void {
    this.teacherSettingService.updateClockMachineVolume(this.clockMachine)
    .subscribe(
      succes => console.log(succes),
      error => console.log(error)
    )
  }

  updateTimeplan(): void {
    let payload = {
      timeplan:this.selectedTimeplan,
      id:this.clockMachineId
    }

    this.teacherSettingService.updateClockMachineTimeplan(payload)
    .subscribe(
      succes => console.log(succes),
      error => console.log(error)
    )
  }

  updateSound(): void {
    let payload = {
      clockMachineId:this.clockMachineId,
      sound: {
        clockIn:this.clockMachine.sound.clockIn,
        clockOff:this.clockMachine.sound.clockOff,
        info:this.clockMachine.sound.info,
        error:this.clockMachine.sound.error,
      }
    }
    this.teacherSettingService.updateClockMachineSound(payload)
    .subscribe(
      succes => console.log(succes),
      error => console.log(error)
    )
  }
}
