const user = require('../data-schematic/user-schematic');

exports.getAllStudents = (req, res)=>{
  user.find({type:0})
  .then(students => res.status(200).json(students))
  .catch(error => res.status(400).json({error}));
}

exports.getAStudent = (req, res)=>{
  user.findOne({_id: req.params.id})
  .then(student => res.status(200).json(student))
  .catch(error => res.status(400).json({error}));
}
