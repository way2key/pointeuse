const express = require('express');
const router = express.Router();

const studentMessageController = require('../controller/student-message-controller');

//Routes
router.get('/:hash', studentMessageController.checkAStudent);
router.post('/:hash', studentMessageController.createClock);

module.exports = router;
