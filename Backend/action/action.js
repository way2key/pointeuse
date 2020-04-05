const testAction = require('./test.js');
const statusService = require('./status-service.js');
const dayService = require('./day-service.js');
const clockService = require('./clock-service.js');
const performedTimeService = require('./performedTime-service.js');
const studentService = require('./student-service.js');
const tokenService = require('./token-service.js');

const action = {
  test: testAction.test,
  createDayForEachUser: dayService.createDayForEachUser,
  createDay: dayService.createDay,
  getStudentCurrentDay: dayService.getStudentCurrentDay,
  checkClockStatus: statusService.checkClockStatus,
  checkStudentStatus: statusService.checkStudentStatus,
  getStudentClock: clockService.getStudentClock,
  getStudentInfo: studentService.getStudentInfo,
  updatePerformedTime: performedTimeService.updatePerformedTime,
  modifyPerformedTime: performedTimeService.modifyPerformedTime,
  getTeacherFromToken: tokenService.getTeacherFromToken,
}


performedTimeService.updatePerformedTime();
module.exports = action;
