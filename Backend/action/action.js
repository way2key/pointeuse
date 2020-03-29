const testAction = require('./test.js');
const createDayAction = require('./create-day.js');
const statusChecker = require('./statusChecker.js');

if(statusChecker.checkClockStatus('5e80929c21855d3d940a0cdc')){
  console.log("IN");
}else{
  console.log("OUT");
}
const action = {
  test: testAction.test,
  createDay: createDayAction.createDay
}

module.exports = action;
