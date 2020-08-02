const mongoose = require('mongoose');

let schema = {
  id: { type: String, unique: true, required: true },
  BusinessName: { type: String, required: true },
  phone: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  type: { type: String, required: true },
  password: { type: String, required: true },
  pending: [{ mealId: Number, UserId: Number, quantity: Number }],
  Done: [{ mealId: Number, UserId: Number, quantity: Number }],
  location: { type: String, required: true },
  meal: [
    {
      idMeal: Number,
      mealName: String,
      discription: String,
      mealAmount: Number,
      image: String,
    },
  ],
  signUpDate: { type: Date, default: Date.now },
};

var Business = mongoose.model('Businesss', schema);
module.exports = Business;
