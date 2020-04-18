const action = require('../action/action.js');

exports.createClockmachine = (req, res) => {
  action.createClockmachine(req.body)
  .then(
    (clockMachine) => res.status(200).json(clockMachine)
  )
  .catch(
    (error) => res.status(500).json("impossible de créer une pointeuse <="+error)
  )

}
