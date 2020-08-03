// const express = require('express');
var app = require('express').Router();
const controller = require('./controller');

app.route('/').get((req, res) => {
  res.send('This is Good');
});
app.route('/users').get(controller.findAllUser).post(controller.addUser);

app.route('/image').post(controller.saveImage);

module.exports = app;
