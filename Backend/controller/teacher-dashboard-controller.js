const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');

exports.getATeacher = (req, res)=>{
  try{
    verifiedJwt = jwt.verify(req.params.token, secret);
    let userId= verifiedJwt.userId;
    User.findOne({_id: userId, type:1})
    .then((teacher) => res.status(200).json(teacher))
    .catch(error => res.status(200).json({error}));
  }
  catch(error){
    res.status(500).json({error});
  }
}
