const mongoose = require('mongoose');

const shiftSchema = mongoose.Schema({
  timeStart: {type: String, required:true},
  timeEnd:  {type: String, required:true},
});

module.exports = mongoose.model('user', shiftSchema);
