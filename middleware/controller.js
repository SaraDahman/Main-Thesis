const Users = require('./../models/Users');
const Business = require('./../models/Business');

// Generate 8 digit unique id for user
var fourdigit = Math.floor(1000 + Math.random() * 9000);

exports.addUser = function (req, res) {
  let User = new Users({
    userId: fourdigit,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    // paymentInfo: [
    //   {
    //     idCard: req.body.idCard,
    //     firstNameCard: req.body.firstNameCard,
    //     lastNameCard: req.body.lastNameCard,
    //     cvv: req.body.css,
    //     month: req.body.month,
    //     year: req.body.year,
    //   },
    // ],
    locations: [{ number: req.body.location }],
  });
  User.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.send('User Profile Created successfully');
  });
};

exports.findUser = function (req, res) {
  Users.findOne({ number: req.params.id }, function (err, information) {
    if (err) {
      return res.send(err);
    }
    res.send(information);
  });
};

exports.findAllUser = function (req, res) {
  Users.find({}, function (err, information) {
    if (err) {
      return res.send(err);
    }
    res.send(information);
  });
};

exports.addBusiness = function (req, res) {
  let Bus = new Business({
    idBusiness: fourdigit,
    BusinessName: req.body.BusinessName,
    phone: req.body.phone,
    email: req.body.email,
    type: req.body.type,
    password: req.body.password,
    location: req.body.location,
  });
  Bus.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.send('Business Profile Created successfully');
  });
};

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
        meal: {
          idMeal: fourdigit,
          mealName: req.body.mealName,
          discription: req.body.mealDiscription,
          mealAmount: req.body.mealAmount,
          image: req.body.mealURL,
        },
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

exports.findBusiness = function (req, res) {
  Business.findOne({ number: req.params.idBusiness }, function (
    err,
    information
  ) {
    if (err) {
      return res.send(err);
    }
    res.send(information);
  });
};

exports.findAllBusiness = function (req, res) {
  Business.find({}, function (err, information) {
    if (err) {
      return res.send(err);
    }
    res.send(information);
  });
};

exports.addOrderUser = function (req, res) {
  var result;
  Users.findOne({ number: req.params.id }, (err, information) => {
    if (err) {
      return res.send(err);
    }
    result = information;
    res.send(information);
  });
  Users.findOneAndUpdate({ number: req.params.id }, () => {});
};

exports.deleteOne = function (req, res) {
  Pokemon.findOneAndRemove(req.params.id, function (err) {
    if (err) return res.send(err);
    res.send('Deleted successfully!');
  });
};

exports.saveImage = function (req, res) {
  console.log('This is out inage', req.body.url);
};
