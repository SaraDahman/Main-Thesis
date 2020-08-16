require('dotenv').config();
const Users = require('./../models/Users');
const Business = require('./../models/Business');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateBusinessRegisterInput = require('./validation/registerBus');
const validateClinetRegisterInput = require('./validation/registerUser');
const validateLoginInput = require('./validation/login');
const sendAuthEmail = require('./mail');
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
									confirmed: user.confirmed,
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
							confirmed: user.confirmed,
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
					const userId = User.userId;
					User.save().then(() => {
						console.log('this is in save user');
						// res.status(201).send('User Profile Created successfully !!!'); /// ------ Nasr
						res.status(201).send(userId);
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

exports.findUserById = async (req, res) => {
	var object = {};
	Users.findOne({ userId: req.params.userId })
		.then((information) => {
			object['UserId'] = information.userId;
			object['FullName'] = information.firstName + ' ' + information.lastName;
			object['Phone'] = information.phone;
			object['Location'] = information.location;
			res.send(object);
		})
		.catch(() => {
			res.send('There in somthing bad in findUserById');
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
					const idBusiness = Bus.idBusiness;
					Bus.save().then(() => {
						res.send(idBusiness); // Nasr
						// res.send('We save it to database');
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
		resId: req.params.idBusiness,
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
			console.log('meal added to pending');
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

// exports.findMealInBusinessPending = async function (req, res) {
// 	try {
// 		var name = '';
// 		var phone = '';
// 		var arr = [];
// 		var business = await Business.findOne({
// 			idBusiness: req.params.idBusiness,
// 		});
// 		if (business) {
// 			var pending = business.pending;
// 			// console.log(pending);
// 			for (var i = 0; i < pending.length; i++) {
// 				var userId = pending[i].UserId;
// 				var client = await Users.findOne({ userId: userId });
// 				if (client) {
// 					name = client.firstName + '' + client.lastName;
// 					phone = client.phone;

// 					////
// 					var mealId = pending[i].mealId;
// 					var quantity = pending[i].quantity;
// 					for (var x = 0; x < business.meal.length; x++) {
// 						if (business.meal[x].idMeal == mealId) {
// 							var obj = {
// 								name: name,
// 								phone: phone,
// 								meal: business.meal[x],
// 								quantity: quantity,
// 							};
// 							arr.push(obj);
// 							// obj.meal.push(business.meal[x]);
// 						}
// 					}
// 				}
// 			}
// 			res.send(arr);
// 		}
// 	} catch (error) {
// 		console.log(error, '==========FAILURE=======');
// 	}
// };

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
		amount: req.body.amount,
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

// exports.findOrderUser = async function (req, res) {
// 	var { userId } = req.params;
// 	userId = userId.toString();
// 	var arr = [];
// 	try {
// 		var user = await Users.findOne({ userId: userId });
// 		if (user) {
// 			var orderlist = user.orderList;
// 			for (var y = 0; y < orderlist.length; y++) {
// 				var resId = orderlist[y].resId.toString();
// 				var mealId = orderlist[y].mealId.toString();
// 				var restaurant = await Business.findOne({ idBusiness: resId });
// 				if (restaurant) {
// 					var meals = restaurant.meal;
// 					for (var i = 0; i < meals.length; i++) {
// 						if (meals[i].idMeal === mealId) {
// 							arr.push(meals[i]);
// 						}
// 					}
// 				} else {
// 					res.send('restaurant not fount');
// 				}
// 			}
// 			res.send(arr);
// 		} else {
// 			res.send('user not found');
// 		}
// 	} catch (error) {
// 		res.send('faaaaaiiiiillll');
// 		console.log(error);
// 	}
// };

exports.removeAllOrderUser = function (req, res) {
	console.log(req.params.userId);
	Users.updateOne({ userId: req.params.userId }, { $set: { orderList: [] } })
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
			res.send('Meal Delete from user : ' + req.params.userId);
		})
		.catch((err) => {
			res.send(err.massage);
		});
};

exports.PendinngMealInBusiness = function (req, res) {
	Business.findOne(
		{ idBusiness: req.params.idBusiness },
		{ meal: { $elemMatch: { idMeal: req.body.mealId } } }
	)
		.then((data) => {
			const amount = data.meal[0].mealAmount;
			if (amount + req.body.mealAmount > 0) {
				console.log(amount - req.body.mealAmount);
				Business.update(
					{
						idBusiness: req.params.idBusiness,
						meal: { $elemMatch: { idMeal: { $lte: req.body.mealId } } },
					},
					{
						$inc: {
							'meal.$.mealAmount': req.body.mealAmount,
						},
					}
				).then((result) => {
					if (result.n >= 1) {
						res.send('Meal updated from user : ' + req.params.idBusiness);
					} else {
						res.end('Meal not updated from user');
					}
				});
			} else if (amount + req.body.mealAmount < 0) {
				console.log('check the amout of your order');
				res.send('check the amout of your order');
			} else if (amount + req.body.mealAmount === 0) {
				var addMeal = {
					idMeal: req.body.mealId,
				};
				Business.updateOne(
					{ idBusiness: req.params.idBusiness },
					{
						$pull: {
							meal: addMeal,
						},
					}
				).then((res) => {
					res.end('we meal is alearddy buy alll of itt');
				});
			}
		})
		.catch((err) => {
			res.send(err);
		});
};

// exports.removePendinngMealInBusiness = function (req, res) {
// 	var addMeal = {
// 		mealId: req.body.mealId,
// 	};
// 	Business.updateOne(
// 		{ idBusiness: req.params.idBusiness },
// 		{
// 			$pull: {
// 				pending: addMeal,
// 			},
// 		}
// 	)
// 		.then((res) => {
// 			res.send('Meal Delete from Busniss Pending : ' + req.params.idBusiness);
// 		})
// 		.catch((err) => {
// 			res.send(err.massage);
// 		});
// };

exports.removePendinngMealInBusiness = function (req, res) {
	console.log(req.body.idMeal, req.body.UserId);
	Business.update(
		{ idBusiness: req.params.idBusiness },
		{
			$pull: {
				pending: {
					$elemMatch: { idMeal: req.body.idMeal, UserId: req.body.UserId },
				},
			},
		}
	)
		.then((result) => {
			console.log(result);
			console.log('this is inside the theb in remove');
			res.send('Meal Delete from Busniss Pending : ' + req.params.idBusiness);
		})
		.catch((err) => {
			res.send(err.massage);
		});
};

exports.saveImage = function (req, res) {
	console.log('This is out inage', req.body.url);
};

exports.removeBusOrderUser = function (req, res) {
	console.log('ew are in remove');
	Users.updateOne(
		{ userId: req.params.userId },
		{ $pull: { orderList: { resId: req.body.resId } } },
		{ multi: true }
	)
		.then((result) => {
			console.log(result);
			console.log('delete the order');
			res.send(`delete all meal mach the resId  : ${req.body.resId}`);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
};

exports.findOrderUser = function (req, res) {
	Users.findOne({ userId: req.params.userId })
		.then((result) => {
			const resIds = [];
			const mealsIds = [];
			result.orderList.map((e) => {
				resIds.push(e['resId']);
				mealsIds.push(e['mealId']);
			});
			Business.find({ idBusiness: { $in: resIds } }, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					var comm = com(data);
					var fi = final(mealsIds, comm);
					addAmount(result.orderList, fi);
					var man = makeObject(fi, resIds);
					res.send(man);
				}
			});
		})
		.catch((err) => {
			res.send(err.massage);
		});
};
//------------ Nasr
exports.confirmEmail = (req, res) => {
	const { userId, email } = req.body;
	sendAuthEmail(email, userId);
};

exports.emailConfirmation = (req, res) => {
	// console.log(req.method);
	const { userId } = req.params;
	const id = userId.substring(1);
	console.log(userId, '---- userId ----');
	console.log(req.params, 'req.params ----- ');
	Business.updateOne(
		{ idBusiness: id },
		{
			confirmed: true,
		}
	)
		.then(() => {
			console.log('status changed !!');
		})
		.catch((err) => {
			console.log('Error in updating status', err);
		});
	Users.updateOne(
		{ userId: id },
		{
			confirmed: true,
		}
	)
		.then((data) => {
			if (data.nModified === 0) {
				console.log('user not found in clients !!');
			}
			console.log('user "confirmed" status updated !');
			// console.log(data, "----data --");
			res.end();
		})
		.catch((err) => {
			console.log('Error in updating status', err);
		});
};
//----

exports.findMealInBusinessPending = async (req, res) => {
	Business.findOne({ idBusiness: req.params.idBusiness })
		.then((result) => {
			const UserId = [];
			const mealsIds = [];
			result.pending.map((e) => {
				UserId.push(e['UserId']);
				mealsIds.push(e['mealId']);
			});
			Users.find({ userId: { $in: UserId } }, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					var man = dateToUser(data); //object of user and array
					var man2 = fromPendignToMeal(result, man);
					res.send(man2);
				}
			});
		})
		.catch((err) => {
			res.send(err.massage);
		});
};

// exports.findMealInBusinessPending = async (req, res) => {
// 	Business.findOne({ idBusiness: req.params.idBusiness })
// 		.then((result) => {
// 			const UserId = [];
// 			const mealsIds = [];
// 			result.pending.map((e) => {
// 				UserId.push(e['UserId']);
// 				mealsIds.push(e['mealId']);
// 			});
// 			Users.find({ userId: { $in: UserId } }, (err, data) => {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					var man = dateToUser(data);
// 					console.log(result.pending);
// 					var woman = removeduplicats(result.pending);
// 					// console.log(woman);
// 					// var man2 = fromPendignToMeal(woman, man);
// 					res.send(result.pending);
// 				}
// 			});
// 		})
// 		.catch((err) => {
// 			res.send(err.massage);
// 		});
// };

function fromPendignToMeal(data, object) {
	var object2 = object;
	data.pending = removeduplicats(data.pending);
	for (let i = 0; i < data.pending.length; i++) {
		for (let e = 0; e < data.meal.length; e++) {
			var one = data.pending[i].mealId + '';
			var two = data.meal[e].idMeal + '';
			if (one === two) {
				object2[data.pending[i].UserId].push(data.meal[e]);
			}
		}
	}
	for (var key in object2) {
		for (let i = 0; i < object2[key].length; i++) {
			object2[key][i].mealAmount = 0;
		}
	}

	for (var key in object2) {
		for (let i = 0; i < object2[key].length; i++) {
			for (let e = 0; e < data.pending.length; e++) {
				if (
					data.pending[e].UserId == key &&
					data.pending[e].mealId == object2[key][i].idMeal
				) {
					object2[key][i]['mealAmount'] += data.pending[e].quantity;
				}
			}
		}
	}
	return object2;
}

function removeduplicats(data) {
	var array = [];
	var array2 = [];
	for (let i = 0; i < data.length; i++) {
		for (let e = i + 1; e < data.length; e++) {
			if (
				data[i].mealId === data[e].mealId &&
				data[i].UserId === data[e].UserId
			) {
				data[i].quantity += data[e].quantity;
				data[e].mealId = 123;
				data[e].UserId = 123;
			}
		}
		array.push(data[i]);
	}
	for (var i = 0; i < array.length; i++) {
		if (array[i]['mealId'] === 123 || array[i]['UserId'] === 123) {
		} else {
			array2.push(array[i]);
		}
	}
	return array2;
}

// function removeduplicats(data) {
// 	var array = [];
// 	for (let i = 0; i < data.length; i++) {
// 		for (let e = i + 1; e < data.length; e++) {
// 			if (
// 				data[i].mealId === data[e].mealId &&
// 				data[i].UserId === data[e].UserId
// 			) {
// 				data[i].quantity += data[e].quantity;
// 				data.splice(e, 1);
// 			}
// 		}
// 		array.push(data[i]);
// 	}
// 	return array;
// }

// function fromPendignToMeal(data, object) {
// 	var object2 = object;
// 	for (let i = 0; i < data.length; i++) {
// 		object2[data[i].UserId].push(data[i]);
// 	}
// 	return object2;
// }

function dateToUser(data) {
	const object = {};
	for (let index = 0; index < data.length; index++) {
		object[data[index].userId] = [];
	}
	return object;
}

function addAmount(array1, array2) {
	const result = [];
	for (let i = 0; i < array1.length; i++) {
		for (let e = 0; e < array2.length; e++) {
			if (array1[i].mealId === array2[e].idMeal) {
				console.log();
				array2[e]['mealAmount'] = array1[i]['amount'];
				console.log(array2[e]['Amount']);
			}
		}
	}
	return array2;
}

function makeObject(arr, resId) {
	const object = {};
	for (let i = 0; i < resId.length; i++) {
		object[resId[i]] = [];
	}
	for (let i = 0; i < arr.length; i++) {
		object[arr[i].resId].push(arr[i]);
	}
	return object;
}

function com(arr) {
	const array = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]['meal'].length >= 1) {
			const arrays = arr[i]['meal'];
			for (let e = 0; e < arrays.length; e++) {
				array.push(arrays[e]);
			}
		}
	}
	return array;
}

function final(array1, array2) {
	const result = [];
	for (let i = 0; i < array1.length; i++) {
		for (let e = 0; e < array2.length; e++) {
			if (array1[i] === array2[e]['idMeal']) {
				result.push(array2[e]);
			}
		}
	}
	return result;
}
