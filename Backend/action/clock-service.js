const moment = require('moment');
const db = require('../database/db');
const dayService = require('./day-service.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');


exports.getStudentClockFromHash = (studentHash) => {
  return new Promise( (resolve, reject) => {
    dayService.getStudentCurrentDay(studentHash)
    .then(
      dayId => {
        Clock.find({dayId:dayId})
        .then(
          clocks => {
            resolve(clocks);

          }
        )
        .catch(
          error => {
            console.log("Unable to fetch student's clock ☠ ");
            reject(error);
          }
        )
      }
    )
    .catch(
      error => {
        console.log("Unable to fetch student's clock ☠ ");
        reject(error);
      }
    )
  });
}

exports.getStudentClockFromDayId = (dayId) => {
  return new Promise( (resolve, reject) => {
    Clock.find({dayId:dayId})
    .then(
      clocks => {
        resolve(clocks);
      }
    )
    .catch(
      error => {
        console.log("Unable to fetch clocks with this dayId ☠");
        reject(error);
      }
    )
  });
}

exports.clockAStudent = (studentHash) => {
  return new Promise( (resolve, reject) => {
    let dayId;
    dayService.getStudentCurrentDay(studentHash)
    .then(
      dayId => {
        this.dayId = dayId;
        const newClock = new Clock({
          dayId: dayId,
          time: moment().format("HH:mm:ss")
        });
        return newClock.save();
      }
    )
    .then(
      () => {
        return Day.findOneAndUpdate({_id:this.dayId},{$set:{present:true}});
      }
    )
    .then(
      () => resolve("Clock créé")
    )
    .catch(
      () => resolve("Erreur de création de clock")
    )
  })
}
