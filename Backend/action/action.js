const testAction = require('./test.js');
const statusService = require('./status-service.js');
const dayService = require('./day-service.js');
const clockService = require('./clock-service.js');
const performedTimeService = require('./performedTime-service.js');
const studentService = require('./student-service.js');
const tokenService = require('./token-service.js');
const incidentService = require('./incident-service.js');
const presenceService = require('./presence-service.js');

const action = {
  test: testAction.test,
  createDay: dayService.createDay,
  createDayForEachUser: dayService.createDayForEachUser,
  getStudentCurrentDay: dayService.getStudentCurrentDay,
  getTeacherFromToken: tokenService.getTeacherFromToken,
  checkStudentStatus: statusService.checkStudentStatus,
  checkClockStatus: statusService.checkClockStatus,
  getStudentClock: clockService.getStudentClockFromHash,
  clockAStudent: clockService.clockAStudent,
  getStudentInfo: studentService.getStudentInfo,
  getStudentMeal: studentService.getStudentMeal,
  getStudentBreather: studentService.getStudentBreather,
  updatePerformedTime: performedTimeService.updatePerformedTime,
  modifyPerformedTime: performedTimeService.modifyPerformedTime,
  checkStudentPresence: presenceService.checkStudentPresence,
  getUntreatedIncident: incidentService.getUntreatedIncident,
  quotaTimeIncident: incidentService.quotaTimeIncident,
  latenessArrivalIncident: incidentService.latenessArrivalIncident,
  unallowedPresenceIncident: incidentService.unallowedPresenceIncident,
  dailyTimeNotCompletedIncident: incidentService.dailyTimeNotCompletedIncident,
  hastyDepartureIncident: incidentService.hastyDepartureIncident,
  clockOversightIncident: incidentService.clockOversightIncident,
  getTreatedIncident: incidentService.getTreatedIncident,
  checkIncident: incidentService.checkIncident,
}


performedTimeService.updatePerformedTime();
module.exports = action;
