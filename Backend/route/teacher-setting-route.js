const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherSettingController = require('../controller/teacher-setting-controller');

//Routes
router.post('/', auth, teacherSettingController.changePassword);

module.exports = router;
