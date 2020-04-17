const db = require('../database/db');
const moment = require('moment');
const clockService = require('./clock-service.js');
const dayService = require('./day-service.js')

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');
const Incident = require('../data-schematic/incident-schematic');

exports.quotaTimeIncident = () => {
  return new Promise( (resolve,reject) => {
    User.find({type:0})
    .then(
      students => {
        for(let student of students) {
          if(student.performedTime < 0) {
            this.saveNewIncident(student._id, "Quota Insuffisant");
          }
        }
      })
    .then(
      resolve()
    )
    .catch(
      reject()
    )
  });
}

exports.clockOversightIncident = () => {
  return new Promise( (resolve,reject) => {
    
  });
}

exports.unallowedPresenceIncident = (studentHash) => {
  return new Promise( (resolve,reject) => {
    const currentTime = moment().format('HH:mm:ss');
    if(currentTime >= '06:00:00' && currentTime < '22:00:00') {
      resolve('Dans les horaires');
    } else {
      User.findOne({hash: studentHash})
      .then(
        student => {
          return this.saveNewIncident(student._id, "En dehors des heures de travail");
        }
      )
      .then(
        resolve('Pas dans les horaires')
      )
      .catch(
        reject()
      )
    }
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
    Incident.find({treated:true})
    .then(
      incidents => {
        resolve(incidents);
      }
    )
    .catch(
      error => {
        reject(error);
      }
    )
  });
}

exports.getUntreatedIncident = () => {
  return new Promise( (resolve,reject) => {
    Incident.find({treated:false})
    .then(
      incidents => {
        resolve(incidents);
      }
    )
    .catch(
      error => {
        reject(error);
      }
    )
  });
}

exports.checkIncident = (incident) => {
  return new Promise( (resolve,reject) => {
    Incident.updateOne({_id:incident._id},{$set:{treated: true}})
    .then(
      (msg) => {
        resolve("Incident quittancé!");
      }
    )
    .catch(
      error => {
        reject(error);
      }
    )
  });
}

exports.saveNewIncident = (studentId, type) => {
  return new Promise( (resolve,reject) => {
    let newIncident = new Incident({
      date: moment().format("YYYY/MM/DD HH:mm:ss"),
      studentId: studentId,
      type: type,
      treated: false
    });
    console.log(newIncident);
    newIncident.save()
    .then(
      resolve()
    )
    .catch(
      reject()
    )
  });
}

exports.clockIncidentCheck = (studentHash) => {
  return new Promise( (resolve,reject) => {
    this.unallowedPresenceIncident(studentHash)
    .then(
      resolve()
    )
    .catch(
      reject()
    )
  })
}
