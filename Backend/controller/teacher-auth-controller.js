const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');

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
        token: 'TOKEN'
      });
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.signup = (req, res, next) => {
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
    .then(() => res.status(201).json({message: 'Utilisateur enregistré'}))
    .catch(error => res.status(400).json({error}));
    })
  .catch(error => res.status(500).json({error}));
};

/*
delete req.body._id;
const usr = new user({
  ...req.body
});
usr.save()
.then(() => res.status(201).json({ message: 'Utilisateur enregistré'}))
.catch(error => res.status(400).json({error}));
*/
