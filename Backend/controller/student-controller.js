const User = require('../data-schematic/user-schematic');
const Clock = require('../data-schematic/clock-schematic');
const Day = require('../data-schematic/day-schematic');
const action = require('../action/action');
const moment = require('moment');

exports.getStudentInfo = (req, res) => {
  action.getStudentInfo(req.params.hash)
  .then(
    student => {
      res.status(200).json(student);
    }
  )
  .catch(
    error => {
      res.status(400).json({error});
    }
  )
}

exports.getStudentStatus = (req, res) => {
  action.checkStudentStatus(req.params.hash)
  .then(
    status => {
      res.status(200).json(status);
    }
  )
  .catch(
    error => res.status(400).json({error})
  )
}

exports.getStudentClock = (req, res) => {
  action.getStudentClock(req.params.hash)
  .then(
    clocks => {
      let out = [];
      for(let clock of clocks){
        out.push(moment.duration(clock.time).asHours());
      }
      res.status(200).send(out);
    }
  )
  .catch((error) => res.status(400).json({error: 'Erreur Récupération Clock'}));
}

exports.clockAStudent = (req, res) => {
  action.getStudentCurrentDay(req.body.hash)
  .then(
    dayId => {
      const newClock = new Clock({
        dayId: dayId,
        time: moment().format("HH:mm:ss")
      });
      return newClock.save();
    }
  )
  .then(() => res.status(201).json({message: 'Clock créé'}))
  .catch((error) => res.status(400).json({error: 'Erreur création clock'}));
}
