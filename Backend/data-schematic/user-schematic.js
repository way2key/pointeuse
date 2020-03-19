const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: {type: String, required:true},
  lastname:  {type: String, required:true},
  hash: {type: String, required:true},
  password: {type: String, required:true},
  type: {type: Number, required:true},
  data: {type: [String], required:false},
});

module.exports = mongoose.model('user', userSchema);
