const testAction = require('./test.js');
const statusService = require('./status-service.js');
const dayService = require('./day-service.js');
const clockService = require('./clock-service.js');
const performedTimeService = require('./performedTime-service.js');
const studentService = require('./student-service.js');

const action = {
  test: testAction.test,
  createDay: dayService.createDay,
  checkClockStatus: statusService.checkClockStatus,
  checkStudentStatus: statusService.checkStudentStatus,
  getStudentCurrentDay: dayService.getStudentCurrentDay,
  getStudentClock: clockService.getStudentClock,
  getStudentInfo: studentService.getStudentInfo,
  updatePerformedTime: performedTimeService.updatePerformedTime
}


performedTimeService.updatePerformedTime();
module.exports = action;
