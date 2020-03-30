import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../student.service';
import * as p5 from 'p5';
import * as moment from 'moment';

@Component({
  selector: 'app-student-timeline',
  templateUrl: './student-timeline.component.html',
  styleUrls: ['./student-timeline.component.scss']
})
export class StudentTimelineComponent implements OnInit {
  canvas: any;
  time = moment.duration(moment().format('HH:mm:ss')).asHours();

  clock = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudentClock(this.data.hash);
    const sketch = s => {
      var x_start;
      var x_end;
      var lowerBound;
      var upperBound;
      var y;

      s.setup = () => {
        s.createCanvas(800,400).parent('p5-sketch');
        x_start = 0.1*s.width;
        x_end = 0.9*s.width;
        y = 0.8*s.height;
      }

      s.draw = () => {
        let range = this.clock[this.clock.length-1]-this.clock[0];
        let margin = 0.2*range;
        lowerBound = this.clock[0]-margin;
        upperBound = this.clock[this.clock.length-1]+margin;
        s.clear();

        // Baseline
        s.strokeWeight(4);
        let baseline = s.line(x_start, y, x_end, y);

        // Clocks
        for(let p of this.clock){
          let x_time = s.map(p,lowerBound,upperBound,x_start,x_end);
          s.strokeWeight(3);
          s.line(x_time,y,x_time,0.63*s.height);
        }

        // Completed period
        for(let i=0; i < this.clock.length; i+=2){
          s.fill(0,255,0,140);
          s.strokeWeight(3);
          s.rect(s.map(this.clock[i],lowerBound,upperBound,x_start,x_end), y, s.map(this.clock[i+1],lowerBound,upperBound,x_start,x_end)-s.map(this.clock[i],lowerBound,upperBound,x_start,x_end), -0.17*s.height);
        }

        // Timeline
        s.fill(0,255,0);
        let x_time = s.map(this.time,lowerBound,upperBound,x_start,x_end);
        s.strokeWeight(4);
        let timeline = s.line(x_time,0.85*s.height,x_time,0.3*s.height);

        // Timeline Hour
        s.fill(230);
        s.textSize(0.05*s.height);
        s.textAlign(s.CENTER);
        s.text(this.time, x_time, 0.9*s.height);
      }
    };
    this.canvas = new p5(sketch);
  }

  getStudentClock(hash){
    this.studentService.getStudentClock(hash).subscribe(
      clocks => {
        this.clock = clocks;
      },
      error => {
        console.log(error.message);
      }
    )
  }


}
