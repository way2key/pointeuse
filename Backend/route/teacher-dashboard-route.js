const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherDashboardController = require('../controller/teacher-dashboard-controller');

//Routes
router.get('/', auth, teacherDashboardController.getATeacher);



module.exports = router;
