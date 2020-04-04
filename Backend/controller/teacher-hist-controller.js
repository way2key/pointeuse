const Log = require('../data-schematic/log-schematic');
const moment = require('moment');
const action = require('../action/action.js');

exports.getAllLog = (req, res) => {
  Log.find()
  .then(
    log => {
      if(log){
        res.sendStatus(200);
      }
      res.sendStatus(400).send("Aucun Log existant");
    }
  )
}
