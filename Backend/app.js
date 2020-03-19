const express = require('express');
const bodyParser = require('body-parser');

const db = require('./database/db')
const teacherStudentRoute = require('./route/teacher-student-route.js');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/teacher-student', teacherStudentRoute);


module.exports = app;
