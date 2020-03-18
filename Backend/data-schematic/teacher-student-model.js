const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  firstname: {type: String, required:true},
  lastname:  {type: String, required:true},
  hash: {type: String, required:true}
});

module.exports = mongoose.model('Student', studentSchema);
