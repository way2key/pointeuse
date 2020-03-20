const user = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {

};

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(
    cryptedPassword => {const usr = new user({
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
