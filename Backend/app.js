const express = require('express');
const bodyParser = require('body-parser');

const db = require('./database/db')

const teacherStudentRoute = require('./route/teacher-student-route.js');
const teacherAuthRoute = require('./route/teacher-auth-route.js');
const teacherSettingRoute = require('./route/teacher-setting-route.js');
const studentLectureCarteRoute = require('./route/student-lecture-carte-route.js');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/teacher-student', teacherStudentRoute);
app.use('/api/teacher-auth', teacherAuthRoute);
app.use('/api/teacher-setting', teacherSettingRoute);
app.use('/api/student', studentLectureCarteRoute);


module.exports = app;
