const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherSettingController = require('../controller/teacher-setting-controller');

//Routes
router.post('/password', auth, teacherSettingController.changePassword);
router.post('/notification', auth, teacherSettingController.updateClockMachineNotification);
router.post('/volume', auth, teacherSettingController.updateClockMachineVolume);
router.post('/dayplan', auth, teacherSettingController.updateTimeplan);
router.get('/:clockMachineId', auth, teacherSettingController.getClockMachine);

module.exports = router;
