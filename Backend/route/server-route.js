const express = require('express');
const router = express.Router();

const serverDayController = require('../controller/server-day-controller');

//Routes
router.post('/', serverDayController.createDay);

module.exports = router;
