const testAction = require('./test.js');
const statusService = require('./status-service.js');
const dayService = require('./day-service.js');
const clockService = require('./clock-service.js');
const performedTimeService = require('./performedTime-service.js');
const studentService = require('./student-service.js');
const tokenService = require('./token-service.js');
const incidentService = require('./incident-service.js');
const presenceService = require('./presence-service.js');
const dayTimeService = require('./dayTime-service.js');

const action = {
  test: testAction.test,
  createDay: dayService.createDay,
  createDayForEachUser: dayService.createDayForEachUser,
  getStudentCurrentDay: dayService.getStudentCurrentDay,
  getStudentSpecificDayId: dayService.getStudentSpecificDayId,
  getTeacherFromToken: tokenService.getTeacherFromToken,
  checkClockStatus: statusService.checkClockStatus,
  checkStudentStatus: statusService.checkStudentStatus,
  clockAStudent: clockService.clockAStudent,
  getStudentClockFromHash: clockService.getStudentClockFromHash,
  getStudentClockFromDayId: clockService.getStudentClockFromDayId,
  checkStudentPresence: presenceService.checkStudentPresence,
  getStudentInfo: studentService.getStudentInfo,
  getStudentMeal: studentService.getStudentMeal,
  getStudentBreather: studentService.getStudentBreather,
  updatePerformedTime: performedTimeService.updatePerformedTime,
  modifyPerformedTime: performedTimeService.modifyPerformedTime,
  checkIncident: incidentService.checkIncident,
  quotaTimeIncident: incidentService.quotaTimeIncident,
  getTreatedIncident: incidentService.getTreatedIncident,
  getUntreatedIncident: incidentService.getUntreatedIncident,
  hastyDepartureIncident: incidentService.hastyDepartureIncident,
  clockOversightIncident: incidentService.clockOversightIncident,
  latenessArrivalIncident: incidentService.latenessArrivalIncident,
  unallowedPresenceIncident: incidentService.unallowedPresenceIncident,
  dailyTimeNotCompletedIncident: incidentService.dailyTimeNotCompletedIncident,
  getStudentDayTimeFromStudentHash: dayTimeService.getStudentDayTimeFromStudentHash,
  getStudentDayTimeFromDayId: dayTimeService.getStudentDayTimeFromDayId,
}


performedTimeService.updatePerformedTime();
module.exports = action;
