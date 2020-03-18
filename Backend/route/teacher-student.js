const express = require('express');
const router = express.Router();
const teacherStudentControler = require('../controller/teacher-student.js');

//Post
router.post('/', teacherStudentControler.addStudent);

module.exports = router;
