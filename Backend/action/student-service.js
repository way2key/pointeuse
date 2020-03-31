const moment = require('moment');
const db = require('../database/db');
const dayService = require('./day-service.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');


exports.getStudentInfo = (studentHash) => {
  return new Promise( (resolve, reject) => {
    User.findOne({hash: studentHash})
    .then(
      students => {
        if(!students){
          reject('No students matches this call...');
        }
        resolve(students);
      }
    )
    .catch(
      error => {
        error;
      }
    );
  });
}
