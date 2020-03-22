const user = require('../data-schematic/user-schematic');

exports.checkAStudent = (req, res)=>{
  user.findOne({hash: req.params.hash})
  .then(student => res.status(200).json(student))
  .catch(error => res.status(400).json({error: error}));
}
