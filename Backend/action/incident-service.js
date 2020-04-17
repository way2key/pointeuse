const db = require('../database/db');
const moment = require('moment');
const clockService = require('./clock-service.js');
const dayService = require('./day-service.js')

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');
const Incident = require('../data-schematic/incident-schematic');

exports.quotaTimeIncident = () => {
  console.log('here');
  let insufficientTimeStudents = [];
  let i = 0;
  return new Promise( (resolve,reject) => {
    User.find({type:0})
    .then(
      students => {
        for(let student of students) {
          if(student.performedTime < 0) {
            insufficientTimeStudents.push(student._id);
            let newIncident = new Incident({
              date: moment().format("YYYY/MM/DD HH:mm:ss"),
              studentId: student._id,
              type: "Quota Insuffisant",
              treated: false
            });
            console.log(newIncident);
            newIncident.save()
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
    let date = moment()/*.subtract(1, 'days')*/.format('YYYY-MM-DD');
    User.find({type:0})
    .then(
      students => {
        return (async function loop() {
          for(let student of students) {
             await new Promise( resolve => {
              dayService.getStudentSpecificDayId(student.hash, date)
              .then(
                (day) => {
                  return clockService.getStudentClockFromDayId(day);
                }
              )
              .then(
                (clocks) => {
                  if(clocks.length % 2 === 0) {
                    resolve();
                  } else {
                    let highestClock = '16:00:00';
                    for(let clock of clocks) {
                      if(clock.time > highestClock) {
                        highestClock = clock.time;
                      }
                    }
                    return clockService.createLastClock(students.hash, clocks[0].dayId, highestClock);
                  }
                }
              )
              .then(
                () => {
                  resolve();
                }

              )
            })
          }
        })();
      }
    )
    .then(
      resolve('Timbrage verifié avec succès')
    )
    .catch(
      error => {
        reject(error);
      }
    )
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
