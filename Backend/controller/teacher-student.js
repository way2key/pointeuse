const Student = require('../data-schematic/teacher-student');

exports.addStudent = (req, res)=>{
  delete req.body._id;
  const student = new Student({
    ...req.body
  });
  student.save()
  .then(() => res.status(201).json({ message: 'Student enregistré'}))
  .catch(error => res.status(400).json({error}));
}
