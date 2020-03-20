const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherStudentController = require('../controller/teacher-student-controller');

//Routes
router.get('/:id', auth, teacherStudentController.getAStudent);
router.get('/', auth, teacherStudentController.getAllStudents);

module.exports = router;
