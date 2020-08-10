require('dotenv').config();
const Users = require('./../models/Users');
const Business = require('./../models/Business');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateBusinessRegisterInput = require('./validation/registerBus');
const validateClinetRegisterInput = require('./validation/registerUser');
const validateLoginInput = require('./validation/login');
// Generate 8 digit unique id for user

// var fourdigit = Math.floor(1000000 + Math.random() * 9000000);
function fourdigit() {
	return Math.floor(1000000 + Math.random() * 9000000);
}

//var fivedigit = Math.floor(10000 + Math.random() * 90000);
function fivedigit() {
	return Math.floor(1000000 + Math.random() * 9000000);
}

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
							idBusiness: user.idBusiness,
							lastName: user.lastName,
						};
						// Sign token
						jwt.sign(
							payload,
							process.env.ACCESS_TOKEN_SECRET,
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
					userId: user.userId,
					lastName: user.lastName,
				};
				// Sign token
				jwt.sign(
					payload,
					process.env.ACCESS_TOKEN_SECRET,
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
	// if (!isValid) {
	//   return res.status(400).json(errors);
	// }
	try {
		Users.findOne({ email: req.body.email }).then((result) => {
			if (result === null) {
				bcrypt.hash('' + req.body.password, 10).then((hashedPassword) => {
					let User = new Users({
						userId: fourdigit(),
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
	const fivedigit1 = fivedigit();
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	try {
		Business.findOne({ email: req.body.email }).then((result) => {
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
						idBusiness: fivedigit1,
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
		idMeal: fourdigit(),
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
		},
		{ returnOriginal: true }
	)
		.then((res) => {
			res.send('Meal Add to user' + req.params.idBusiness);
		})
		.catch((err) => {
			res.send(err.massage);
		});
};

exports.PendingMealToBusiness = function (req, res) {
	var addMeal = {
		mealId: req.body.mealId,
		UserId: req.body.UserId,
		quantity: req.body.quantity,
	};
	Business.updateOne(
		{ idBusiness: req.params.idBusiness },
		{
			$push: {
				pending: addMeal,
			},
		},
		{ returnOriginal: true }
	)
		.then((res) => {
			res.send('Meal Add to Busnisees');
		})
		.catch((err) => {
			res.send(err.massage);
		});
};

exports.doneMealToBusiness = function (req, res) {
	var addMeal = {
		mealId: req.body.mealId,
		UserId: req.body.UserId,
		quantity: req.body.quantity,
	};
	Business.updateOne(
		{ idBusiness: req.params.idBusiness },
		{
			$push: {
				Done: addMeal,
			},
		},
		{ returnOriginal: true }
	)
		.then((res) => {
			res.send('Meal Add to Busnisees');
		})
		.catch((err) => {
			res.send(err.massage);
		});
};

exports.findMealInBusiness = function (req, res) {
	Business.findOne({ idBusiness: req.params.idBusiness })
		.then((result) => {
			res.send(result.meal);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.findMealInBusinessPending = async function (req, res) {
  try {
    var name = '';
    var phone = '';
    var arr = [];
    var business = await Business.findOne({
      idBusiness: req.params.idBusiness,
    });
    if (business) {
      var pending = business.pending;
      // console.log(pending);
      for (var i = 0; i < pending.length; i++) {
        var userId = pending[i].UserId;
        var client = await Users.findOne({ userId: userId });
        if (client) {
          name = client.firstName + '' + client.lastName;
          phone = client.phone;

          ////
          var mealId = pending[i].mealId;
          for (var x = 0; x < business.meal.length; x++) {
            if (business.meal[x].idMeal == mealId) {
              var obj = {
                name: name,
                phone: phone,
                meal: business.meal[x],
              };
              arr.push(obj);
              // obj.meal.push(business.meal[x]);
            }
          }
        }
      }
      res.send(arr);
    }
  } catch (error) {
    console.log(error, '==========FAILURE=======');
  }
};

exports.findMealInBusinessDone = function (req, res) {
	Business.findOne({ idBusiness: req.params.idBusiness })
		.then((result) => {
			res.send(result.Done);
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
    amount:req.body.amount,
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

exports.findOrderUser = async function (req, res) {
  var { userId } = req.params;
  userId = userId.toString();
  var arr = [];
  try {
    var user = await Users.findOne({ userId: userId });
    if (user) {
      var orderlist = user.orderList;
      for (var y = 0; y < orderlist.length; y++) {
        var resId = orderlist[y].resId.toString();
        var mealId = orderlist[y].mealId.toString();
        var amount = orderlist[y].amount;
        var restaurant = await Business.findOne({ idBusiness: resId });
        if (restaurant) {
          var meals = restaurant.meal;
          for (var i = 0; i < meals.length; i++) {
            if (meals[i].idMeal === mealId) {
              arr.push(meals[i]);
            }
          }
        } else {
          res.send('restaurant not fount');
        }
      }
      console.log(arr);
      res.send(arr);
    } else {
      res.send('user not found');
    }
  } catch (error) {
    res.send('faaaaaiiiiillll');
    console.log(error);
  }
};

exports.removeAllOrderUser = function (req, res) {
	Users.update({ userId: req.params.userId }, { $pullAll: orderList })
		.then((result) => {
			res.send(result.orderList);
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

// exports.findOrderUser = function (req, res) {
// 	Users.findOne({ userId: req.params.userId })
// 		.then((result) => {
// 			const resIds = [];
// 			const mealsIds = [];
// 			result.orderList.map((e) => {
// 				resIds.push(e['resId']);
// 				mealsIds.push(e['mealId']);
// 			});
// 			Business.find({ idBusiness: { $in: resIds } }, (err, result) => {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					var comm = com(result);
// 					var fi = final(mealsIds, comm);
// 					res.send(fi);
// 				}
// 			});
// 		})
// 		.catch((err) => {
// 			res.send(err.massage);
// 		});
// };

// function com(arr) {
// 	const array = [];
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i]['meal'].length >= 1) {
// 			const arrays = arr[i]['meal'];
// 			for (let e = 0; e < arrays.length; e++) {
// 				array.push(arrays[e]);
// 			}
// 		}
// 	}
// 	return array;
// }

// function final(array1, array2) {
// 	const result = [];
// 	for (let i = 0; i < array1.length; i++) {
// 		for (let e = 0; e < array2.length; e++) {
// 			if (array1[i] === array2[e]['idMeal']) {
// 				result.push(array2[e]);
// 			}
// 		}
// 	}
// 	return result;
// }
