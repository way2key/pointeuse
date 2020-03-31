const testAction = require('./test.js');
const createDayAction = require('./create-day.js');
const statusChecker = require('./statusChecker.js');
const dayService = require('./getStudentCurrentDay.js');
const clockService = require('./getStudentClock.js');

const action = {
  test: testAction.test,
  createDay: createDayAction.createDay,
  checkClockStatus: statusChecker.checkClockStatus,
  checkStudentStatus: statusChecker.checkStudentStatus,
  getStudentCurrentDay: dayService.getStudentCurrentDay,
  getStudentClock: clockService.getStudentClock
}

module.exports = action;
