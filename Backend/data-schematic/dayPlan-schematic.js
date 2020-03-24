const mongoose = require('mongoose');

const dayPlanSchema = mongoose.Schema({
  startOfDay: {type: String, required:true},
  endOfDay:  {type: String, required:true},
  requiredTime: {type: Number, required:true},
  shift: {type: [String], required:true},

});

module.exports = mongoose.model('DayPlan', dayPlanSchema);
