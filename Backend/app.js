const express = require('express');
const bodyParser = require('body-parser');

const db = require('./database/db')

const teacherStudentRoute = require('./route/teacher-student-route.js');
const teacherAuthRoute = require('./route/teacher-auth-route.js');
const teacherSettingRoute = require('./route/teacher-setting-route.js');
const teacherDashboardRoute = require('./route/teacher-dashboard-route.js');
const studentMessageRoute = require('./route/student-message-route.js');
const serverRoute = require('./route/server-route.js');

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
app.use('/api/teacher-dashboard', teacherDashboardRoute);
app.use('/api/student', studentMessageRoute);
app.use('/api/student-message', studentMessageRoute);
app.use('/api/server', serverRoute);


module.exports = app;
