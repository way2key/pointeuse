const User = require('../data-schematic/user-schematic');
const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');

exports.checkAStudent = (req, res)=>{
  User.findOne({hash: req.params.hash})
  .then(student => res.status(200).json(student))
  .catch(error => res.status(400).json({error: error}));
}

exports.updateStudentTime = (req, res) => {
  delete req.body._id;
  const newDay = new Day({
    date: req.body.data[req.body.data.length-1].date,
    performedTime: req.body.data[req.body.data.length-1].performedTime,
    presence: req.body.data[req.body.data.length-1].presence,
  })
  console.error(req.body);
  console.error(newDay._id);

  User.updateOne({hash: req.params.hash}, {...req.body, hash: req.params.hash})
    .then(student => res.status(200).json(student))
    .catch(error => res.status(403).json({error: error}));

  newDay.save().then();
}

exports.createClock = (req, res) => {
  //delete req.body_id;
  const newClock = new Clock({
    ...req.body
  })
  newClock.save()
  .then(newClock => res.status(200).json(newClock._id))
  .catch(error => res.status(405).json(error));

  console.error(newClock._id);

}
