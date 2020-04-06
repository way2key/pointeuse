const db = require('../database/db');
const moment = require('moment');
const clockService = require('./clock-service.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');
const Incident = require('../data-schematic/incident-schematic');

exports.quotaTimeIncident = () => {
  return new Promise( (resolve,reject) => {
    //code here
    resolve('it work');
  });
}

exports.clockOversightIncident = () => {
  return new Promise( (resolve,reject) => {
    //code here
    resolve('it work');
  });
}

exports.unallowedPresenceIncident = () => {
  return new Promise( (resolve,reject) => {
    //code here
    resolve('it work');
  });
}

exports.dailyTimeNotCompletedIncident = () => {
  return new Promise( (resolve,reject) => {
    //code here
    resolve('it work');
  });
}

exports.latenessArrivalIncident = () => {
  return new Promise( (resolve,reject) => {
    //code here
    resolve('it work');
  });
}

exports.hastyDepartureIncident = () => {
  return new Promise( (resolve,reject) => {
    //code here
    resolve('it work');
  });
}

exports.getTreatedIncident = () => {
  return new Promise( (resolve,reject) => {
    //code here
    resolve('it work');
  });
}

exports.getUntreatedIncident = () => {
  return new Promise( (resolve,reject) => {
    //code here
    resolve('it work');
  });
}
