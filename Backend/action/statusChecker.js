const moment = require('moment');
const db = require('../database/db');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');

exports.checkClockStatus = (clockId) => {
  return new Promise( (resolve, reject) => {
    Clock.findOne({_id: clockId})
    .then(
      clock => {
        //Find the day the clock is bound to
        return Clock.find({dayId: clock.dayId});
      }
    )
    .then(
      clocks => {
        //Find which position this clock is in the day
        let count = 1;
        for(let clock of clocks){
          if(clock.id === clockId){
            break;
          }
          count++;
        }
        resolve(!(count%2==0));
      }
    )
  });
}

exports.checkStudentStatus = (studentHash) => {
}
