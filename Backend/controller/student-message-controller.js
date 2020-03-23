const User = require('../data-schematic/user-schematic');

exports.checkAStudent = (req, res)=>{
  User.findOne({hash: req.params.hash, type:0})
  .then(student => res.status(200).json(student))
  .catch(error => res.status(400).json({error: error}));
}
