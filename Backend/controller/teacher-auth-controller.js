const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');

exports.login = (req, res, next) => {
  User.findOne({firstname: req.body.username})
  .then(usr =>{
    if(!usr){
      return res.status(401).json({error: "Utilisateur inexistant ou Mot de passe incorrect"});
    }
    bcrypt.compare(req.body.password, usr.password)
    .then(valid =>{
      if(!valid){
        return res.status(401).json({error: "Utilisateur inexistant ou Mot de passe incorrect"});
      }
      res.status(200).json({
        userId: usr._id,
        token: jwt.sign(
          {userId: usr._id},
          secret,
          { expiresIn: '24h'}
        )
      });
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
}

exports.signupAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(
    cryptedPassword => {const usr = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        hash: req.body.hash,
        password: cryptedPassword,
        type: 0,
        dayPlanId: req.body.dayPlanId
    });
    usr.save()
    .then(() => res.status(201).json({message: 'Administrateur enregistré'}))
    .catch(error => res.status(400).json({error}));
    })
  .catch(error => res.status(500).json({error}));
}

exports.signupUser = (req, res, next) => {
  delete req.body._id;
  const usr = new User({
    ...req.body
  });
  usr.save()
  .then(() => res.status(201).json({ message: 'Utilisateur enregistré'}))
  .catch(error => res.status(400).json({error}));
}

exports.getUser = (req, res, next) => {
  console.log(req);
}

exports.verifyToken = (req, res, next) => {
  try{
    verifiedJwt = jwt.verify(req.params.token, secret);
    let userId= verifiedJwt.userId;
    User.findOne({_id: userId})
    .then(() => res.status(200).send('true'))
    .catch(error => res.status(200).send('false'));
  }
  catch(e){
    res.status(200).send('false');
  }
}
