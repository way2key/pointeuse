const User = require('../data-schematic/user-schematic');
const Log = require('../data-schematic/log-schematic');
const performedTimeService = require('../action/performedTime-service.js');
const action = require('../action/action');
const moment = require('moment');

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
  performedTimeService.modifyPerformedTime(req.body.time,req.body.hash)
  .then( response => res.status(200).json({response}))
  .catch( error => res.status(500).json({error}));
}

exports.createLog = (req, res) => {
  const newLog = new Log({
    date: moment().format("YYYY/MM/DD"),
    teacher: req.body.teacher,
    message: req.body.message,
    studentId: req.body.studentId,
    operation: req.body.operation,
  });
  newLog.save()
  .then(
    response => res.status(201).json({response})
  )
  .catch(
    error => res.status(400).json({error})
  );
}

exports.getATeacher = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  action.getTeacherFromToken(token)
  .then(
    (teacher) => res.status(200).json(teacher)
  )
  .catch(
    (error) => res.status(500).json({error})
  )

}
