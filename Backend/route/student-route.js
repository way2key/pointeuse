const express = require('express');
const router = express.Router();

const studentController = require('../controller/student-controller');

//Routes
router.get('/status/:hash', studentController.getStudentStatus);
router.get('/:hash', studentController.getStudentInfo);
router.post('/', studentController.clockAStudent);

module.exports = router;
