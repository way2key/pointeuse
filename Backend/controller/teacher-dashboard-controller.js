const action = require('../action/action.js');

exports.getATeacher = (req, res)=>{
  const token = req.headers.authorization.split(' ')[1];
  action.getTeacherFromToken(token)
  .then(
    (teacher) => res.status(200).json(teacher)
  )
  .catch(
    (error) => res.status(500).json({error})
  )

}
