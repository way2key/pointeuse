const moment = require('moment');
const db = require('../database/db');

const Day = require('../data-schematic/day-schematic');
const User = require('../data-schematic/user-schematic');

exports.getStudentCurrentDay = (studentHash) => {
  return new Promise( (resolve, reject) => {
    User.findOne({hash: studentHash})
    .then(
      student => {
        let dateId = [];
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        let today = ((new Date(year, month, day)).getTime()/1000);
        let todayId = today.toString(16) +'0000000000000000';

        for(day of student.data) {
          if(day >= todayId) {
            dateId.push(day);
          }
        }

        if(dateId.length == 1) {
          resolve(dateId[0]);
        }
      }
    )
  });
}
