const moment = require('moment');
const db = require('../database/db');
const dayService = require('./getStudentCurrentDay.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');


exports.getStudentClock = (studentHash) => {
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
      }
    )
    .catch(
      error => {
        console.log("Unable to fetch student's clock :( ");
      }
    )
  });
}
