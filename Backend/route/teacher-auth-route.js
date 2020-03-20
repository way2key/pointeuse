const express = require('express');
const router = express.Router();

const teacherAuthController = require('../controller/teacher-auth-controller');

//Routes
router.post('/login', teacherAuthController.login);
router.post('/signup', teacherAuthController.signup);

module.exports = router;
