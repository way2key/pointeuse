const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const dayService = require('./day-service.js');
const incidentService = require('./incident-service.js');

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
            reject("Unable to find student's clock ☠ ");
          }
        )
      }
    )
    .catch(
      error => {
        reject("No clocks available <= " + error);
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
        reject("Unable to fetch clocks with this dayId ☠");
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
      () => {
        incidentService.clockIncidentCheck(studentHash);
      }
    )
    .then(
      () => resolve("Clock créé")
    )
    .catch(
      (error) => reject("Clock non créé <= " + error)
    )
  })
}

exports.deleteClock = (clockId) => {
  return new Promise( (resolve, reject) => {
    Clock.findByIdAndRemove(clockId)
    .then(
      () => resolve("Clock supprimé")
    )
    .catch(
      error => reject("Impossible de supprimer le Clock " + clockId + " <= " + error)
    )
  })
}
