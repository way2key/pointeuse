const express = require('express');
const router = express.Router();

const teacherStudentController = require('../controller/teacher-student-controller');

//Routes
router.get('/:id', teacherStudentController.getAStudent);
router.get('/', teacherStudentController.getAllStudents);

module.exports = router;
