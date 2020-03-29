const Day = require('../data-schematic/day-schematic');
const moment = require('moment');

exports.createDay = (req, res) => {

  delete req.body._id;
  delete req.body.date;

  const newDay = new Day({
    date: moment().format("YYYY MM DD"),
    present: req.body.present
  });

  newDay.save()
    .then(() => res.status(200).json({message: 'Day créé'}))
    .catch(error => res.status(400).json({error: error}));

};
