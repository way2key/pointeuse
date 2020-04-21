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
//action.createDayForEachUser();
// Crée les days tous les jours à 00:00:01s
cron.schedule('00 00 00 * * *', () => {
  action.createDayForEachUser();
});

// Crée les days tous les jours à 00:00:01s
cron.schedule('00 00 00 * * *', () => {
  action.dailyIncidentCheck();
});

// Contrôle chaque semaine à 00:00
cron.schedule('00 00 00 * * Sun', () => {
  action.weeklyIncidentCheck();
});

// test s'écrit toutes les heures
cron.schedule('00 00 */1 * * *', () => {
  action.test();
});
