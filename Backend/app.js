const express = require('express');
const bodyParser = require('body-parser');
const Student = require('./model/student');

const db = require('./database/db')

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());


//Post
app.post('/api/student', (req, res)=>{
  delete req.body._id;
  const student = new Student({
    ...req.body
  });
  student.save()
  .then(() => res.status(201).json({ message: 'Student enregistré'}))
  .catch(error => res.status(400).json({error}));
})

module.exports = app;
