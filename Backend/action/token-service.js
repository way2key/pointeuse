const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');

exports.getTeacherFromToken = (token) => {
  return new Promise( (resolve, reject) => {
    verifiedJwt = jwt.verify(token, secret);
    let userId= verifiedJwt.userId;
    User.findOne({_id: userId, type:1})
    .then((teacher) => resolve(teacher))
    .catch(error => reject(teacher));
  })
}
