const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  users: {type: [String], required:true}
});

module.exports = mongoose.model('user', logSchema);
