const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherSettingController = require('../controller/teacher-setting-controller');

//Routes
router.post('/password', auth, teacherSettingController.changePassword);
router.post('/notification', auth, teacherSettingController.updateClockMachineNotification);
router.post('/volume', auth, teacherSettingController.updateClockMachineVolume);
router.post('/timeplan', auth, teacherSettingController.updateClockMachineTimeplan);
router.post('/sound', auth, teacherSettingController.updateClockMachineSound);
router.get('/:clockMachineId', teacherSettingController.getClockMachine);

module.exports = router;
