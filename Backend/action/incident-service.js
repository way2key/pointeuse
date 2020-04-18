const teacherDB = require('../database/teacherDB');
const moment = require('moment');
const clockService = require('./clock-service.js');
const dayService = require('./day-service.js')
const studentService = require('./student-service.js')
const presenceService = require('./presence-service.js')

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

exports.clockOversightIncident = (studentHash, studentId) => {
  return new Promise( (resolve,reject) => {
    let date = moment().format('YYYY-MM-DD');
    dayService.getStudentSpecificDayId(studentHash, date)
    .then(
      (day) => {
        return clockService.getStudentClockFromDayId(day);
      }
    )
    .then(
      (clocks) => {
        if(clocks.length % 2 === 0) {
          resolve('Timbrage verifié avec succès');
        } else {
        return module.exports.saveNewIncident(studentId, "Oubli de timbrage");
        }
      }
    )
    .then(
      () => {
      resolve('Timbrage verifié avec succès')
    })
    .catch(
      error => {
        reject(error);
      }
    )
  });
}

exports.unallowedPresenceIncident = (studentHash) => {
  return new Promise( (resolve,reject) => {
    const holidays = []; //fonction pour récupérer les holidays
    const dayPlanEnd = '22:00:00' //récupérer heure de fin du jour
    const dayPlanStart = '06:00:00' //récupérer heure de début du jour
    const currentTime = moment().format('HH:mm:ss');
    const currentDay = moment().format('YYYY MM DD');
    let student;
    User.findOne({hash: studentHash})
    .then(
      s => {
        student = s;
        if(currentTime < dayPlanStart || currentTime >= dayPlanEnd) {
          module.exports.saveNewIncident(student._id, "En dehors des heures de travail")
          .then(
            resolve('Pas dans les horaires')
          )
          .catch(
            reject()
          )
        } else if (0 === moment().days()) {
          module.exports.saveNewIncident(student._id, "En dehors des heures de travail")
          .then(
            resolve('Pas dans les horaires')
          )
          .catch(
            reject()
          )
        } else {
          return (async function loop() {
            for(let holiday of holidays) {
               await new Promise( resolve => {
                 if(!holiday.authorizedPresence && holiday.timeStart <= currentDay && holiday.timeEnd >= currentDay) {
                    module.exports.saveNewIncident(student._id, "Timbrage pendant les vacances")
                   .then(
                     resolve("Timbrage pendant les vacances")
                   )
                   .catch(
                     error => {
                     console.log('error',error);
                     reject(error);
                   });
                 } else {
                   resolve();
                 }
               })
             }
           })();
        }
    })
    .catch(
      error => {
        console.log(error);
          reject(error)
      }
    )

  });
}

exports.checkStudentBreather = (studentHash, studentId) => {
  return new Promise( (resolve,reject) => {
    studentService.getStudentBreather(studentHash)
    .then(
      breather => {
        if(breather) {
          resolve();
        } else {
          return module.exports.saveNewIncident(studentId, "Pas pris de pause")
        }
      }
    )
    .then(
      resolve()
    )
    .catch(
      reject()
    )
  });
}

exports.checkStudentMeal = (studentHash, studentId) => {
  return new Promise( (resolve,reject) => {
    studentService.getStudentMeal(studentHash)
    .then(
      meal => {
        if(meal) {
          resolve();
        } else {
          module.exports.saveNewIncident(studentId, "Pas pris la pause de midi")
        }
      }
    )
    .then(
      resolve()
    )
    .catch(
      reject()
    )
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

exports.dailyIncidentCheck = () => {
  return new Promise( (resolve, reject) => {

    User.find({type:0})
    .then(
      students => {
        return (async function loop() {
          for(let student of students) {
             await new Promise( resolve => {
               presenceService.checkStudentPresence(student.hash)
               .then(
                 presence => {
                   if (!presence) {
                     resolve();
                   } else {
                     return module.exports.checkStudentMeal(student.hash, student._id);
                   }
                 }
               )
               .then(
                 () => {
                   return module.exports.checkStudentBreather(student.hash, student._id);
                 }
               )
               .then(
                 () => {
                   return module.exports.clockOversightIncident(student.hash, student._id);
                 }

               )
               .then(
                 resolve()
               )
               .catch(
                 error => {
                   resolve(error);
                 }
               )
             })
          }
        })();
    })
    .catch(
      error => {
        reject(error)
      }

    )
  })
}

exports.weeklyIncidentCheck = () => {
  return new Promise( (resolve, reject) => {
    module.exports.quotaTimeIncident();
    User.find({type:0})
    .then(
      students => {
        return (async function loop() {
          for(let student of students) {
             await new Promise( resolve => {

             })
          }
        })();
    })
  })
}
