const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const clockSchema = mongoose.Schema({
  dayId: {type: String, required:true, unique: true},
  time: {type: String, required:true}
});
clockSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', clockSchema);
