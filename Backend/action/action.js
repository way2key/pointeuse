const testAction = require('./test.js');
const createDayAction = require('./create-day.js');

const action = {
  test: testAction.test,
  createDay: createDayAction.createDay
}

module.exports = action;
