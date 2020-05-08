const teacherDB = require('../database/teacherDB');
const moment = require('moment');
const clockService = require('./clock-service.js');
const dayService = require('./day-service.js')
const dayTimeService = require('./dayTime-service.js')
const studentService = require('./student-service.js')
const presenceService = require('./presence-service.js')
const fetch = require('node-fetch');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');
const Incident = require('../data-schematic/incident-schematic');

// Incident action
exports.getTreatedIncident = () => {
  return new Promise( (resolve,reject) => {
    Incident.find({treated:true})
    .then(
      incidents => resolve(incidents)
    )
    .catch(
      error => reject(error)
    )
  });
}

exports.getUntreatedIncident = () => {
  return new Promise( (resolve,reject) => {
    Incident.find({treated:false})
    .then(
      incidents => resolve(incidents)
    )
    .catch(
      error => reject(error)
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
    newIncident.save()
    .then(
      () => resolve()
    )
    .catch(
      () => reject()
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
/*
//wtf

exports.checkStudentBreather = student => {
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

exports.checkStudentMeal = student => {
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

exports.clockIncidentCheck = student => {
  return new Promise( (resolve,reject) => {
    let student;
    User.findOne({hash: studentHash})
    .then(
      s => {
        student = s;
        return module.exports.unallowedPresenceIncident(studentHash, student._id);
      }
    )
    .then(
      () => {
        return module.exports.latenessArrivalIncident(studentHash, student._id);
      }
    )
    .then(
      resolve()
    )
    .catch(
      reject()
    )
  })
}
*/

// Incident launcher
exports.controlInstantIncident = (studentHash, clockId) => {
  return new Promise( (resolve, reject) => {
    //getStudent
    studentService.getStudentFromHash(studentHash)
    .then(
      student => {
        const incidentToControl = [
          this.latenessArrivalIncident(student, clockId),
          this.unallowedPresenceIncident(student, clockId),
        ]
        return Promise.all(incidentToControl);
      }
    )
    .then(
      () => resolve("Incidents Immédiats vérifié avec succès")
    )
    .catch(
      error => reject("Incident ! <= " + error)
    )
  })
}

exports.controlDailyIncident = () => {
  return new Promise( (resolve, reject) => {
    User.find({type:0})
    .then(
      students => {
        const studentPromises = students.map(student => {
          const incidentPromises = [
            this.dailyTimeNotCompletedIncident(student),
            this.hastyDepartureIncident(student),
            this.clockOversightIncident(student)
          ]
          return Promise.all(incidentPromises);
        });
        return Promise.all(studentPromises);
      }
    )
    .then(
      () => resolve("Incidents quotidiens vérifié avec succès")
    )
    .catch(
      error => reject("Impossible de vérifier les incidents quotidiens <= " + error)
    )
  })
}

exports.controlWeeklyIncident = () => {
  return new Promise( (resolve, reject) => {
    User.find({type:0})
    .then(
      students => {
        const studentPromises = students.map(student => {
          const incidentPromises = [
            this.quotaTimeIncident(student),
          ]
          return Promise.all(incidentPromises);
        });
        return Promise.all(studentPromises);
      }
    )
    .then(
      () => resolve("Incidents quotidiens vérifié avec succès")
    )
    .catch(
      error => reject("Impossible de vérifier les incidents quotidiens <= " + error)
    )
  })
}

// Incident
//instant
exports.latenessArrivalIncident = (student) => {
    return new Promise( (resolve,reject) => {
      let sTimeplan;
      let sClock;

      //getStudentWeek + timeplan
      let getStudentTimeplan = new Promise( (resolve, reject) => {
        let weekUrl = 'http://localhost:4000/api/admin-data-week/' + student.weekId;
        fetch(weekUrl)
        .then(res => res.json())
        .then(
          week => {
            switch (moment().day()) {
              case 0:
              timeplanId = week.sunday;
              break;
              case 1:
              timeplanId = week.monday;
              break;
              case 2:
              timeplanId = week.tuesday;
              break;
              case 3:
              timeplanId = week.wednesday;
              break;
              case 4:
              timeplanId = week.thursday;
              break;
              case 5:
              timeplanId = week.friday;
              break;
              case 6:
              timeplanId = week.saturday;
            }
            let url2 = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + timeplanId;
            return fetch(url2);
          }
        )
        .then(res => res.json())
        .then(timeplan => {
          sTimeplan = timeplan;
          resolve();
        })
        .catch(error => reject("Impossible de récupérer l'horaire <= " + error))
      });

      //getClock
      let getClock = new Promise ( (resolve, reject) => {
        clockService.getStudentClockFromHash(student.hash)
        .then(clock => {
          sClock = clock;
          resolve();
        })
        .catch(error => reject("Impossible de récupérer les clocks <= " + error))
      });

      Promise.all([getStudentTimeplan, getClock])
      .then(
        data => {
          //Control
          if(false){
            let late = (sClock.filter(c => moment.duration(sClock.time).as('seconds') > moment.duration(sTimeplan.startOfDay).as('seconds')).length === 0)
            if(late){
              this.saveNewIncident(student._id, "Retard");
            }
          }
          resolve();
        }
      )
      .catch(error => reject(error))
    });
  }

exports.unallowedPresenceIncident = (student, clockId) => {
    return new Promise( (resolve,reject) => {
      let sTimeplan;
      let sHoliday;

      //getStudentWeek + timeplan
      let getStudentTimeplan = new Promise( (resolve, reject) => {
        let weekUrl = 'http://localhost:4000/api/admin-data-week/' + student.weekId;
        fetch(weekUrl)
        .then(res => res.json())
        .then(
          week => {
            switch (moment().day()) {
              case 0:
              timeplanId = week.sunday;
              break;
              case 1:
              timeplanId = week.monday;
              break;
              case 2:
              timeplanId = week.tuesday;
              break;
              case 3:
              timeplanId = week.wednesday;
              break;
              case 4:
              timeplanId = week.thursday;
              break;
              case 5:
              timeplanId = week.friday;
              break;
              case 6:
              timeplanId = week.saturday;
            }
            let url2 = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + timeplanId;
            return fetch(url2);
          }
        )
        .then(res => res.json())
        .then(timeplan => {
          sTimeplan = timeplan;
          resolve();
        })
        .catch(error => reject("Impossible de récupérer l'horaire <= " + error))
      });

      //getHoliday
      let getHoliday = new Promise( (resolve, reject) => {
        let holidayUrl = 'http://localhost:4000/api/admin-data-holiday/';
        fetch(holidayUrl)
        .then(res => res.json())
        .then(holiday => {
          sHoliday = holiday;
          resolve();
        })
        .catch(error => reject("Impossible de récupérer les jours fériés <= " + error))
      })

      Promise.all([getStudentTimeplan, getHoliday])
      .then(
        data => {
          //Control
          if(true){
            let now = moment();
            let time = moment.duration(now.format('HH:mm:ss')).asSeconds();
            let start = moment.duration(sTimeplan.startOfDay,"HH:mm:ss").asSeconds();
            let end = moment.duration(sTimeplan.endOfDay,"HH:mm:ss").asSeconds();
            let outsideSchedule = ( (time < start) || ( time > end) );
            let forbiddenDay = (sHoliday.filter(holiday => now.isBetween(moment(holiday.startDate,"YYYY/MM/DD").startOf('day'), moment(holiday.endDate,"YYYY/MM/DD").endOf('day'))).length > 0);
            if(false || forbiddenDay){
              this.saveNewIncident(student._id, "Présence non Autorisée");
            }
          }
          resolve();
        }
      )
      .catch(error => reject(error))
    });
}

//daily
exports.dailyTimeNotCompletedIncident = student => {
    return new Promise( (resolve,reject) => {
      let requiredDayTime = "8"; //récupérer heures à faire du daypPlan
      dayTimeService.getStudentDayTimeFromStudentHash(studentHash)
      .then(
        time => {
          if(time < requiredDayTime) {
            return module.exports.saveNewIncident(studentId, "Quota journalier insuffisant");
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

exports.hastyDepartureIncident = student => {
    return new Promise( (resolve,reject) => {
      let timeEnd = "16:00" // rechercher heure de fin dans shift
      clockService.getStudentClockFromHash(studentHash)
      .then(
        clocks => {
          if(clocks.length % 2 === 0) {
            if(clocks[clocks.length - 1].time < timeEnd) {
              return module.exports.saveNewIncident(studentId, "Départ en avance");
            }
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

exports.clockOversightIncident = student => {
      return new Promise( (resolve,reject) => {
        let date = moment().format('YYYY/MM/DD');
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

//weekly
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
