const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const postsRoutes = require("./routes/posts");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use(morgan('dev'));



mongoose.connect('mongodb+srv://monia:C58SQkr6FxY9cw0Z@messageapp-x8hxs.mongodb.net/test?retryWrites=true&w=majority', () => {
  console.log('connected')
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});



app.use("/api/posts", postsRoutes);

module.exports = app;
