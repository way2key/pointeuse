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

// Crée les days tous les jours à 00:00:01s
cron.schedule('00 00 00 * * *', () => {
  action.createDay();
});

// Crée les days tous les jours à 00:00:01s
cron.schedule('00 00 00 * * *', () => {
  action.recordStudentHours();
});

// test s'écrit toutes les heures
cron.schedule('00 00 */1 * * *', () => {
  action.test();
});
