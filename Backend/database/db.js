const express = require('express');
const db = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/student',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = db;
