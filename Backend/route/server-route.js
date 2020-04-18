const express = require('express');
const router = express.Router();

const serverDayController = require('../controller/server-day-controller');
const serverClockMachineController = require('../controller/server-clock-machine-controller');
//Routes
router.post('/', serverDayController.createDay);
router.get('/', serverDayController.unallowedPresenceIncident)
router.post('/clock-machine', serverClockMachineController.createClockmachine);

module.exports = router;
