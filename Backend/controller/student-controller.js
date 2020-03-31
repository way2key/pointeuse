const User = require('../data-schematic/user-schematic');
const Clock = require('../data-schematic/clock-schematic');
const Day = require('../data-schematic/day-schematic');
const moment = require('moment');


exports.getStudentStatus = (req, res)=>{
  res.status(200).json(true);
}

exports.getStudentInfo = (req, res)=>{
  User.findOne({hash: req.params.hash})
  .then(
    student => {
      if(!student){
        res.status(400).json({error});
      }
      res.status(200).json(student);
    }
  )
  .catch(error => res.status(400).json({error}));
}

exports.clockAStudent = (req, res) => {
  let dateId = [];
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let today = ((new Date(year, month, day)).getTime()/1000);
  let todayId = today.toString(16) +'0000000000000000';
  User.findOne({hash: req.body.hash})
    .then((student) => {
      for(day of student.data) {
        if(day >= todayId) {
          dateId.push(day);
        }
      }
      if(dateId.length != 1) {
        reject();
      } else {
        const newClock = new Clock({
          dayId: dateId[0],
          time: moment().format("HH:mm:ss")
        });
        return newClock.save();
      }
    })
    .then(() => res.status(201).json({message: 'Clock créé'}))
    .catch((error) => res.status(400).json({error: 'Erreur création clock'}));
}

exports.getStudentClock = (req, res)=>{
  let dateId = [];
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let today = ((new Date(year, month, day)).getTime()/1000);
  let todayId = today.toString(16) +'0000000000000000';
  User.findOne({hash: req.params.hash})
    .then((student) => {
      for(day of student.data) {
        if(day >= todayId) {
          dateId.push(day);
        }
      }
      if(dateId.length != 1) {
        reject();
      } else {
        Clock.find({dayId:dateId[0]})
        .then(
          clocks => {
            let out=[];
            for(let clock of clocks){
              out.push(moment.duration(clock.time).asHours());
            }
            res.status(200).send(out)
          }
        )
      }
    })
    .then()
    .catch((error) => res.status(400).json({error: 'Erreur création clock'}));

}
