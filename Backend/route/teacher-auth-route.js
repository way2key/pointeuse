const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherAuthController = require('../controller/teacher-auth-controller');

//Routes
router.post('/login', teacherAuthController.login);
router.post('/signup', auth, teacherAuthController.signup);

module.exports = router;
