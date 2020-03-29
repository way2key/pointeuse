const moment = require('moment');
const db = require('../database/db');

const Day = require('../data-schematic/day-schematic');
const User = require('../data-schematic/user-schematic');

exports.createDay = () => {
  console.log('');
  console.log(moment().format("YYYY/MM/DD HH:mm:ss"));
  console.log("Création des jours pour chaque utilisateur:");
  User.find({type:0})
  .then(
    students => {
      for(let student of students){
        const newDay = new Day({
          date: moment().format("YYYY MM DD"),
          performedTime: 0,
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
