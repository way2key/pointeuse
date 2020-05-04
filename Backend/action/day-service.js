const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const studentService = require('./student-service.js');

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
        }else {
          reject("Le jour n'existe pas dans l'utilisateur.");
        }
      }
    )
    .catch(
      error => reject(error)
    )
  });
}

exports.createDayForEachUser = () => {
  console.log('');
  console.log(moment().format("YYYY/MM/DD HH:mm:ss"));
  console.log("Création des jours pour chaque utilisateur:");
  User.find({type:0})
  .then(
    students => {
      for(let student of students){
        const newDay = new Day({
          date: moment().format("YYYY/MM/DD"),
          present: false
        });
        newDay.save();
        User.findOneAndUpdate({_id: student.id},{'$push':{data: newDay.id}})
        .then(
          () => {
            console.log(" Jours créés avec succès !");
          }
        );
      }
    }
  )
}

exports.createDay = (studentHash) => {
  studentService.getStudentFromHash(studentHash)
  .then(
    student => {
      const newDay = new Day({
        date: moment().format("YYYY/MM/DD"),
        present: false
      });
      newDay.save();
      User.findOneAndUpdate({_id: student.id},{'$push':{data: newDay.id}})
      .then(
        () => {
          console.log(" Jour ajouté à l'utilisateur");
        }
      );
    }
  )
  .catch(
    error => console.log("Impossible de créer un jour pour l'étudiant <= " + error)
  )
};

exports.getStudentSpecificDayId = (studentHash, date) => {
    const day = moment(date);
    const dayPlusOne = moment(date).add(1, 'day');
    const dayIdMin = (day.unix()).toString(16) +'0000000000000000';
    const dayIdMax = (dayPlusOne.unix()).toString(16) +'0000000000000000';
    let possibleDays = [];

    return new Promise( (resolve, reject) => {
      studentService.getStudentFromHash(studentHash)
      .then(
        (student) => {
          for(let d of student.data) {
            if(d >= dayIdMin && d < dayIdMax){

              //resolve(d);
              possibleDays.push(d);
            };
          };
          if(possibleDays.length === 1) {
            resolve(possibleDays[0]);
          } else {

            throw error;
          }
        }
      )
      .catch(
        (error) => {
          reject('Impossible de récupérer un jour spécifique <= ' + error);
        }
      )
  });
};
