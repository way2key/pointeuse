const moment = require('moment');
const db = require('../database/db');
const clockService = require('./clock-service.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');

exports.updatePerformedTime = () => {
  User.find({type:0})
  .then(
    users => {
      for(let user of users){
        clockService.getStudentClock(user.hash)
        .then(
          clocks => {
            let time = 0;
            if(clocks.length%2!=0){
              let t1 = moment.duration(clocks[clocks.length-1].time);
              let t2 = moment.duration("16:00:00");
              if(t1 < t2){
                let uncompletedShift = moment.duration(Math.abs(t1-t2)).asHours();
                time += uncompletedShift;
              }
            }
            for(let i=0; i < clocks.length-1; i+=2){
              let t1 = moment.duration(clocks[i].time);
              let t2 = moment.duration(clocks[i+1].time);

              let completedShift = moment.duration(Math.abs(t1-t2)).asHours();
              time += completedShift;
            }
            console.log("Le temps total est: "+time);
          }
        )
      }
    }
  )
}
