const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherStudentController = require('../controller/teacher-student-controller');

//Routes
router.get('/presence/:hash', teacherStudentController.getStudentPresence);
router.get('/teacher', auth, teacherStudentController.getATeacher);
router.get('/:id', auth, teacherStudentController.getAStudent);
router.get('/', auth, teacherStudentController.getAllStudents);
router.post('/time', auth, teacherStudentController.modifyPerformedTime);
router.post('/log', auth, teacherStudentController.createLog);
router.post('/timeplan', auth, teacherStudentController.updateStudentTimeplan);
router.post('/hash', auth, teacherStudentController.updateStudentHash);
router.put('/presence', auth, teacherStudentController.modifyPresence);

module.exports = router;
