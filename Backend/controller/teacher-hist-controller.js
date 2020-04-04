const Log = require('../data-schematic/log-schematic');
const moment = require('moment');
const action = require('../action/action.js');

exports.getAllLog = (req, res) => {
  Log.find()
  .then(students => res.status(200).json(students))
  .catch(error => res.status(400).json({error}));
}
