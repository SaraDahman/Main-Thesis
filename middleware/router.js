var app = require("express").Router();
const controller = require("./controller");

<<<<<<< HEAD
app.route('/').get((req, res) => {
	res.send('This is Good');
=======
app.route("/").get((req, res) => {
  res.send("This is Good");
>>>>>>> dd06d4d69659e24072c7b5699c1dd7d1050e4f27
});

app.route("/user/signup").post(controller.addUser);

app.route("/user").get(controller.findAllUser);

<<<<<<< HEAD
app.route('/login').post(controller.login);

app.route('/logout').post(controller.logout);
=======
app.route("/login").post(controller.login);

app.route("/logout").post(controller.logout);
>>>>>>> dd06d4d69659e24072c7b5699c1dd7d1050e4f27

app.route("/user/login/:userId").post(controller.findUser);

app.route("/order/add/:userId").post(controller.addOrderUser);

app.route("/order/remove/:userId").post(controller.removeOrderUser);

app.route("/business/signup").post(controller.addBusiness);

app.route("/business").get(controller.findAllBusiness);

app.route("/business/:idBusiness").post(controller.findBusiness);

app.route("/meal/add/:idBusiness").post(controller.addMealToBusiness);

app.route("/business/meal/:idBusiness").get(controller.findMealInBusiness);

app.route("/meal/remove/:idBusiness").post(controller.removeMealBusiness);

app.route("/image").post(controller.saveImage);

module.exports = app;
