const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;


if(process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://localhost/fakeuber');
}

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

module.exports = app;
