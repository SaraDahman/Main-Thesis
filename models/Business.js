const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  idBusiness: { type: String, unique: true, required: true },
  BusinessName: { type: String, required: true },
  phone: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  type: { type: String, required: true },
  password: { type: String, required: true },
  pending: [{ mealId: Number, UserId: Number, quantity: Number }],
  Done: [{ mealId: Number, UserId: Number, quantity: Number }],
  location: { type: Array, required: true },
  // BusinessImage: { type: String, required: false },
  meal: [
    {
      idMeal: Number,
      mealName: String,
      discription: String,
      mealAmount: Number,
      image: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  signUpDate: { type: Date, default: Date.now },
});

var Business = mongoose.model('Businesss', Schema);
module.exports = Business;