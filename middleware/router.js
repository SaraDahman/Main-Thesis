// const express = require('express');
var app = require('express').Router();
const controller = require('./controller');

app.route('/').get((req, res) => {
  res.send('This is Good');
});

app.route('/user/signup').post(controller.addUser);

app.route('/user').get(controller.findAllUser);

app.route('/user/:idUser').get(controller.findUser);

app.route('/order/add/:userId').post(controller.addOrderUser);

app.route('/order/remove/:userId').post(controller.removeOrderUser);

app.route('/business').get(controller.findAllBusiness);

app.route('/business/signup').post(controller.addBusiness);

app.route('/meal/add/:idBusiness').post(controller.addMealToBusiness);

app.route('/meal/remove/:idBusiness').post(controller.removeMealBusiness);

app.route('/business/:idBusiness').get(controller.findBusiness);

app.route('/image').post(controller.saveImage);

module.exports = app;
