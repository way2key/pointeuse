const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  date: {type: String, required:true},
  performedTime:  {type: Number, required:false},
  present: {type: Boolean, required:true}
});

module.exports = mongoose.model('Day', daySchema);
