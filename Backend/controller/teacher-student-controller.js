const User = require('../data-schematic/user-schematic');
const performedTimeService = require('../action/performedTime-service.js');

exports.getAllStudents = (req, res)=>{
  User.find({type:0})
  .then(students => res.status(200).json(students))
  .catch(error => res.status(400).json({error}));
}

exports.getAStudent = (req, res)=>{
  User.findOne({_id: req.params.id, type:0})
  .then(student => res.status(200).json(student))
  .catch(error => res.status(400).json({error}));
}

exports.modifyPerformedTime = (req, res) => {
  console.log('this is the time : ', req.body.time);
  performedTimeService.modifyPerformedTime(req.body.time,req.body.hash)
  .then( response => res.status(200).json({response}))
  .catch( error => res.status(500).json({error}));
}
