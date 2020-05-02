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
const clockMachineService = require("./clock-machine-service.js");
const authService = require("./auth-service");
const soundService = require("./sound-service");
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
  getStudentFromHash: studentService.getStudentFromHash,
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
  createClockMachine: clockMachineService.createClockMachine,
  getClockMachine: clockMachineService.getClockMachine,
  updateClockMachineSound: clockMachineService.updateClockMachineSound,
  updateClockMachineVolume: clockMachineService.updateClockMachineVolume,
  updateClockMachineTimeplan: clockMachineService.updateClockMachineTimeplan,
  updateClockMachineNotification: clockMachineService.updateClockMachineNotification,
  dailyIncidentCheck: incidentService.dailyIncidentCheck,
  weeklyIncidentCheck: incidentService.weeklyIncidentCheck,
  isAuthenticatedOnServer: authService.isAuthenticatedOnServer,
  getSound: soundService.getSound,
}


performedTimeService.updatePerformedTime();
module.exports = action;
