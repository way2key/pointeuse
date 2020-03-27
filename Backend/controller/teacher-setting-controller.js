const User = require('../data-schematic/user-schematic');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');
const bcrypt = require('bcrypt');

exports.changePassword = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;

    bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => {
      return User.findOneAndUpdate({_id:userId},{$set:{password: hashedPassword}});
    })
    .then(res.status(200).json({message: 'Mot de passe changé'}))
    .catch(error => res.status(500).json({error}));
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}
