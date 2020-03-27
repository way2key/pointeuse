const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstname: {type: String, required:true},
  lastname:  {type: String, required:true},
  hash: {type: String, required:false, unique:true, sparse: true},
  password: {type: String, required:false, unique:true, sparse: true},
  type: {type: Number, required:true},
  data: {type: [String], required:false},
  dayPlanId: {type: String, required:true, unique:true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
