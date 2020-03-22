const express = require('express');
const router = express.Router();

const studentMessageController = require('../controller/student-message-controller');

//Routes
router.get('/:hash', studentMessageController.checkAStudent);

module.exports = router;
