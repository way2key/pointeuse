const User = require('../data-schematic/user-schematic');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');
const bcrypt = require('bcrypt');

exports.changePassword = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    console.log(req.body.password);
    bcrypt.hash(req.body.password, 10)
    .then(hashedPassword =>
      User.findOneAndUpdate({_id:userId},{$set:{password: hashedPassword}})
      .then(res.sendStatus(200))
      .catch(error => res.status(500).json({error}))
    )
    .catch(error => res.status(500).json({error}));
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}
