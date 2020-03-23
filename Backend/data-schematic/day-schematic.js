const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  date: {type: String, required:true},
  performedTime:  {type: Number, required:false},
  presence: {type: Boolean, required:true}
});

module.exports = mongoose.model('user', daySchema);
