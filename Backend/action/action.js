const testAction = require('./test.js');
const statusService = require('./status-service.js');
const dayService = require('./day-service.js');
const clockService = require('./clock-service.js');
const performedTimeService = require('./performedTime-service.js');
const studentService = require('./student-service.js');
const tokenService = require('./token-service.js');
const incidentService = require('./incident-service.js');

const action = {
  test: testAction.test,
  createDay: dayService.createDay,
  createDayForEachUser: dayService.createDayForEachUser,
  getStudentCurrentDay: dayService.getStudentCurrentDay,
  getTeacherFromToken: tokenService.getTeacherFromToken,
  checkStudentStatus: statusService.checkStudentStatus,
  checkClockStatus: statusService.checkClockStatus,
  getStudentClock: clockService.getStudentClock,
  getStudentInfo: studentService.getStudentInfo,
  updatePerformedTime: performedTimeService.updatePerformedTime,
  modifyPerformedTime: performedTimeService.modifyPerformedTime,
  getUntreatedIncident: incidentService.getUntreatedIncident,
  quotaTimeIncident: incidentService.quotaTimeIncident,
  latenessArrivalIncident: incidentService.latenessArrivalIncident,
  unallowedPresenceIncident: incidentService.unallowedPresenceIncident,
  dailyTimeNotCompletedIncident: incidentService.dailyTimeNotCompletedIncident,
  hastyDepartureIncident: incidentService.hastyDepartureIncident,
  clockOversightIncident: incidentService.clockOversightIncident,
  getTreatedIncident: incidentService.getTreatedIncident,
}


performedTimeService.updatePerformedTime();
module.exports = action;
