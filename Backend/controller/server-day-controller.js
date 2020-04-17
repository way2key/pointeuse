const Day = require('../data-schematic/day-schematic');
const moment = require('moment');
const action = require('../action/action.js');

exports.createDay = (req, res) => {
  action.createDay(req.body.hash);
  res.sendStatus(200);
}

exports.clockOversightIncident = (req, res) => {
  action.clockOversightIncident()
  .then(
    (message) => {
      res.status(200).json(message)
    }
  )
  .catch(
    (error) => {
      res.status(400).json(error)
    }
  )
}
