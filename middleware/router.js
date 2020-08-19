var app = require('express').Router();
const controller = require('./controller');

app.route('/').get((req, res) => {
  res.send('This is Good');
});

app.route('/user/signup').post(controller.addUser);

app.route('/user').get(controller.findAllUser);

app.route('/login').post(controller.login);

app.route('/logout').post(controller.logout);

app
  .route('/user/login/:userId')
  .post(controller.findUser)
  .get(controller.findUserById);

app.route('/order/add/:userId').post(controller.addOrderUser);

app
  .route('/order/remove/:userId')
  .post(controller.removeOrderUser)
  .put(controller.removeBusOrderUser);

app.route('/order/find/:userId').get(controller.findOrderUser);

app.route('/order/removeall/:userId').get(controller.removeAllOrderUser);

app.route('/business/signup').post(controller.addBusiness);

app.route('/business').get(controller.findAllBusiness);

app.route('/business/:idBusiness').post(controller.findBusiness);

app.route('/meal/add/:idBusiness').post(controller.addMealToBusiness);
//nasr
app.route('/confirmEmail').post(controller.confirmEmail);
app.route('/emailConfirmation/:userId').get(controller.emailConfirmation);
//----
//-------- Payment -------
app.route('/stripeCheckout').get(controller.stripeCheckoutGet);
app.route('/stripeCheckout').post(controller.stripeCheckoutPost);

//------------------------
app
  .route('/meal/pending/:idBusiness')
  .post(controller.PendingMealToBusiness)
  .get(controller.findMealInBusinessPending);

app
  .route('/meal/done/:idBusiness')
  .post(controller.doneMealToBusiness)
  .get(controller.findMealInBusinessDone);

app
  .route('/business/meal/pending/:idBusiness')
  .post(controller.removePendinngMealInBusiness)
  .put(controller.removeAllFromPending);

app
  .route('/business/meal/pendingOne/:idBusiness')
  .post(controller.PendinngMealInBusiness);

app.route('/business/meal/:idBusiness').get(controller.findMealInBusiness);

app.route('/meal/remove/:idBusiness').post(controller.removeMealBusiness);

app.route('/image').post(controller.saveImage);

module.exports = app;
