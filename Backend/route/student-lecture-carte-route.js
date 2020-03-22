const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const studentLectureCarteController = require('../controller/student-lecture-carte-controller');

//Routes
router.get('/:hash', studentLectureCarteController.checkAStudent);

module.exports = router;
