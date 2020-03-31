const testAction = require('./test.js');
const createDayAction = require('./create-day.js');
const statusChecker = require('./statusChecker.js');

const action = {
  test: testAction.test,
  createDay: createDayAction.createDay,
  checkClockStatus: statusChecker.checkClockStatus,
  checkStudentStatus: statusChecker.checkStudentStatus
}

/*
action.checkClockStatus('5e82ef8c78f86a1b08275b46').then(
  answer => {
    console.log(answer);
  }
)*/

module.exports = action;
