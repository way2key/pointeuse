const user = require('../data-schematic/user-schematic');

exports.addUser = (req, res)=>{
  delete req.body._id;
  const usr = new user({
    ...req.body
  });
  usr.save()
  .then(() => res.status(201).json({ message: 'Utilisateur enregistré'}))
  .catch(error => res.status(400).json({error}));
}

exports.getAllStudents = (req, res)=>{
  user.find()
  .then(students => res.status(200).json(students))
  .catch(error => res.status(400).json({error}));
}

exports.getAStudent = (req, res)=>{
  user.findOne({_id: req.params.id})
  .then(student => res.status(200).json(student))
  .catch(error => res.status(400).json({error}));
}
