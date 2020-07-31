const Users = require('./../models/Users');
const Business = require('./../models/Business');

// Generate 8 digit unique id for user
var eightdigit = Math.floor(10000000 + Math.random() * 90000000);

exports.addUser = function (req, res) {
  let User = new schema({
    id: eightdigit,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    other: req.body.other,
    gender: req.body.gender,
    password: req.body.password,
    paymentInfo: req.body,
    orderList: [
      {
        id: Number,
        name: String,
        discription: String,
        amount: Number,
        image: URL,
      },
    ],
    locations: [{ type: Number }],
  });
  User.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.send('User Profile Created successfully');
  });
};
exports.addMeal = function (req, res) {
  let Meal = new schema({
    id: Number,
    name: String,
    discription: String,
    amount: Number,
    image: URL,
  });
  Meal.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.send('Meal add Successfully');
  });
};

exports.retrieve = function (req, res) {
  Pokemon.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.retrieveOne = function (req, res) {
  Pokemon.findOne({ number: req.params.number }, function (err, pokemon) {
    if (err) {
      return res.send(err);
    }
    res.send(pokemon);
  });
};

exports.updateOne = function (req, res) {
  Pokemon.findOneAndUpdate(req.params.name, { $set: req.body }, function (
    err,
    pokemon
  ) {
    if (err) return res.send(err);
    res.send('Pokemon udpated.');
  });
};

exports.delete = function (req, res) {
  Pokemon.remove({});
};

exports.deleteOne = function (req, res) {
  Pokemon.findOneAndRemove(req.params.name, function (err) {
    if (err) return res.send(err);
    res.send('Deleted successfully!');
  });
};
