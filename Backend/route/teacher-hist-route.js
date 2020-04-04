const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherHistController = require('../controller/teacher-hist-controller');

//Routes
router.get('/log', teacherHistController.getAllLog);
router.get('/', auth, teacherHistController.getAllLog);


module.exports = router;
