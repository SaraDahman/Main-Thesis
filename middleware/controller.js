require('dotenv').config();
const Users = require('./../models/Users');
const Business = require('./../models/Business');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateBusinessRegisterInput = require('./validation/register');
const validateClinetRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');

// Generate 8 digit unique id for user
var fourdigit = Math.floor(1000 + Math.random() * 9000);
var fivedigit = Math.floor(10000 + Math.random() * 90000);

exports.login = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Users.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      // return res
      // 	.status(404)
      // 	.json({ emailnotfound: 'Email not found in Users' });
      Business.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ emailnotfound: 'Email not found' });
        }
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              lastName: user.lastName,
            };
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: 'Password incorrect' });
          }
        });
      });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          lastName: user.lastName,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
};

exports.logout = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

// Use this function to add user to database in Users with auth
exports.addUser = async (req, res) => {
  const { errors, isValid } = validateClinetRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    Users.findOne({ email: req.body.email }).then((result) => {
      if (result === null) {
        bcrypt.hash('' + req.body.password, 10).then((hashedPassword) => {
          let User = new Users({
            userId: fourdigit,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPassword,
            locations: [{ number: req.body.location }],
          });
          User.save().then(() => {
            console.log('this is in save user');
            res.status(201).send('User Profile Created successfully !!!');
          });
        });
      } else {
        res.send('Eamil is exits');
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Use this funciton to find a user from database
exports.findUser = async (req, res) => {
  Users.findOne({ userId: req.params.userId })
    .then((information) => {
      if (information == null) {
        return res.status(400).send('Cannot find user');
      }
      bcrypt.compare(req.body.password, information.password).then((result) => {
        if (result) {
          res.send('Success');
        } else {
          res.send('Not Allowed');
        }
      });
    })
    .catch(() => {
      res.status(501).send('there something bad in findUser');
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
exports.addBusiness = async (req, res) => {
  const { errors, isValid } = validateBusinessRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    Business.findOne({ email: req.params.email }).then((result) => {
      if (!result) {
        bcrypt.hash('' + req.body.password, 10).then((hashedPassword) => {
          const {
            BusinessName,
            phone,
            email,
            type,
            location,
            BusinessImage,
          } = req.body;
          let Bus = new Business({
            idBusiness: fivedigit,
            BusinessName,
            phone,
            email,
            type,
            password: hashedPassword,
            location,
            BusinessImage,
          });
          Bus.save().then(() => {
            res.send('We save it to database');
          });
        });
      } else {
        res.send('Email is already exist');
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};

// Use this function to add meal to specific Business at dataBase
exports.addMealToBusiness = function (req, res) {
  var addMeal = {
    idMeal: fourdigit,
    mealName: req.body.mealName,
    discription: req.body.mealDiscription,
    mealAmount: req.body.mealAmount,
    image: req.body.mealURL,
    price: req.body.price,
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

exports.findMealInBusiness = function (req, res) {
  console.log('ibsdf');
  Business.findOne({ idBusiness: req.params.idBusiness })
    .then((result) => {
      res.send(result.meal);
    })
    .catch((err) => {
      res.send(err);
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
      if (result == null) {
        return res.status(400).send('Cannot find Business');
      }
      bcrypt.compare(req.body.password, result.password).then((result) => {
        if (result) {
          res.send('Success');
        } else {
          res.send('Not Allowed');
        }
      });
    })
    .catch((err) => {
      res.status(501).send('Nothing to find in businsess');
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
