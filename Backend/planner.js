const cron = require('node-cron');
const action = require('./action/action');



/*
 Utilisation du planificateur:

 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *

 https://www.npmjs.com/package/node-cron
*/

cron.schedule('*/2 * * * * *', () => {
  action.test();
});
