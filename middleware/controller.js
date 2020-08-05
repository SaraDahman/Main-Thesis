const Users = require('./../models/Users');
const Business = require('./../models/Business');

// Generate 8 digit unique id for user
var fourdigit = Math.floor(1000 + Math.random() * 9000);

// Use this function to add user to database in Users
exports.addUser = function (req, res) {
  Users.findOne({ email: req.body.email })
    .then((result) => {
      if (result === null) {
        let User = new Users({
          userId: fourdigit,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          locations: [{ number: req.body.location }],
        });
        User.save().then(() => {
          res.send('User Profile Created successfully !!!');
        });
      } else {
        res.send('Eamil is exits');
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

// Use this funciton to find a user from database
exports.findUser = function (req, res) {
  Users.findOne({ number: req.params.idUser }, function (err, information) {
    if (err) {
      return res.send(err);
    }
    res.send(information);
  });
};

// Use this function to find all users from datebase
exports.findAllUser = function (req, res) {
  Users.find({}, function (err, information) {
    if (err) {
      return res.send(err);
    }
    res.send(information);
  });
};

// use this function to add a new business to database at Business
exports.addBusiness = function (req, res) {
  const {
    BusinessName,
    phone,
    email,
    type,
    password,
    location,
    BusinessImage,
  } = req.body;
  let Bus = new Business({
    idBusiness: fourdigit,
    BusinessName,
    phone,
    email,
    type,
    password,
    location,
    BusinessImage,
  });
  Bus.save()
    .then(() => {
      res.send('We save it to database');
    })
    .catch((err) => {
      res.send(err);
    });
};

// Use this function to add meal to specific Business at dataBase
exports.addMealToBusiness = function (req, res) {
  var addMeal = {
    idMeal: fourdigit,
    mealName: req.body.mealName,
    discription: req.body.mealDiscription,
    mealAmount: req.body.mealAmount,
    image: req.body.mealURL,
  };
  Business.updateOne(
    { idBusiness: req.params.idBusiness },
    {
      $push: {
        meal: addMeal,
      },
    }
  )
    .then((res) => {
      console.log('this os then');
      res.send('Meal Add to user' + req.params.idBusiness);
    })
    .catch((err) => {
      res.send(err.massage);
    });
};

// Use this function to remove a meal from a Businesse profile
exports.removeMealBusiness = function (req, res) {
  var addMeal = {
    idMeal: req.body.idMeal,
  };
  Business.updateOne(
    { idBusiness: req.params.idBusiness },
    {
      $pull: {
        meal: addMeal,
      },
    }
  )
    .then((res) => {
      res.send('Meal Delete from user : ' + req.params.idBusiness);
    })
    .catch((err) => {
      res.send(err.massage);
    });
};

// Use this function to find a User inside the database
exports.findBusiness = function (req, res) {
  Business.findOne({ idBusiness: req.params.idBusiness })
    .then((result) => {
      if (!result) throw new Error('not exist');
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
};

// Use this function to find all user in the database
exports.findAllBusiness = function (req, res) {
  Business.find({}, function (err, information) {
    if (err) {
      return res.send(err);
    }
    res.send(information);
  });
};

// Use this function to add order to a User
exports.addOrderUser = function (req, res) {
  var addMeal = {
    mealId: req.body.mealId,
    resId: req.body.resId,
    userId: req.params.userId,
  };
  Users.updateOne(
    { userId: req.params.userId },
    {
      $push: {
        orderList: addMeal,
      },
    }
  )
    .then((res) => {
      res.send('Meal Add to user' + req.params.idBusiness);
    })
    .catch((err) => {
      res.send(err.massage);
    });
};

// Use this function to delete an order from User's Order
exports.removeOrderUser = function (req, res) {
  var addMeal = {
    mealId: req.body.mealId,
  };
  Users.updateOne(
    { userId: req.params.userId },
    {
      $pull: {
        orderList: addMeal,
      },
    }
  )
    .then((res) => {
      res.send('Meal Delete from user : ' + req.params.idBusiness);
    })
    .catch((err) => {
      res.send(err.massage);
    });
};

exports.saveImage = function (req, res) {
  console.log('This is out inage', req.body.url);
};
