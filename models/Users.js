const mongoose = require('mongoose');
let schema = mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  paymentInfo: [
    {
      idCard: Number,
      firstNameCard: String,
      lastNameCard: String,
      cvv: Number,
      month: Number,
      year: Number,
    },
  ],
  orderList: [
    {
      mealId: Number,
      resId: Number,
      userId: Number,
    },
  ],
  signUpDate: { type: Date, default: Date.now },
});

var Users = mongoose.model('Users', schema);

module.exports = Users;
