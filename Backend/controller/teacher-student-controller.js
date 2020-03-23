const User = require('../data-schematic/user-schematic');

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

exports.updateTime = (req, res) => {

}
