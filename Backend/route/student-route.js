const express = require('express');
const router = express.Router();

const studentController = require('../controller/student-controller');

//Routes
router.get('/:hash', studentController.getStudentInfo);
router.post('/', studentController.clockAStudent);

module.exports = router;
