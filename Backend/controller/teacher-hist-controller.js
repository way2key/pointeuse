const Log = require('../data-schematic/log-schematic');
const moment = require('moment');
const action = require('../action/action.js');

exports.getAllLog = (req, res) => {
  Log.find()
  .then(students => res.status(200).json(students))
  .catch(error => res.status(400).json({error}));
}

exports.getAllIncident = (req, res) => {
  action.getTreatedIncident().
  then(
    incidents => {
      res.status(200).json(incidents);
    }
  )
  .catch(
    error => res.status(500).json({error})
  )
}

exports.getStudentClocksSpecificDay = (req, res) => {
  action.getStudentSpecificDayId(req.body.hash, req.body.date)
  .then(
    (dayId) => {
      return action.getStudentClockFromDayId(dayId);
    }
  )
  .then(
    (clocks) => {
      let out = [];
      for(let clock of clocks){
        out.push(moment.duration(clock.time).asHours());
      }
      res.status(200).send(out);
    }
  )
  .catch(
    (error) => {
      res.status(500).json({error});
    }
  )
}

exports.getStudentDayTime = (req, res) => {
  action.getStudentSpecificDayId(req.body.hash, req.body.date)
  .then(
    (dayId) => {
      return action.getStudentDayTimeFromDayId(dayId);
    }
  )
  .then(
    time => {
      res.status(200).json(time);
    }
  )
  .catch(
    error => res.status(400).json(error)
  )
}
