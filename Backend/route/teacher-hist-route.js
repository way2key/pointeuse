const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherHistController = require('../controller/teacher-hist-controller');

//Routes
router.get('/incident', teacherHistController.getAllIncident);
router.get('/log', auth, teacherHistController.getAllLog);
router.get('/stat', teacherHistController.getStudentClocksSpecificDay);


module.exports = router;
