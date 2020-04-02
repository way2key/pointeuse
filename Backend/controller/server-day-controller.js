const Day = require('../data-schematic/day-schematic');
const moment = require('moment');
const action = require('../action/action.js');

exports.createDay = (req, res) => {
  action.createDay(req.body.hash);
  res.sendStatus(200);
}
