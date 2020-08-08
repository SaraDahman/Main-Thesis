const mongoose = require('mongoose');

let schema = {
	idBusiness: { type: String, unique: true, required: true },
	BusinessName: { type: String, required: true },
	phone: { type: Number, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	type: { type: String, required: true },
	password: { type: String, required: true },
	pending: [{ mealId: Number, UserId: Number, quantity: Number }],
	Done: [{ mealId: Number, UserId: Number, quantity: Number }],
	location: [
		{
			x: { type: Number, required: true },
			y: { type: Number, required: true },
		},
	],
	BusinessImage: { type: String, required: true },
	meal: [
		{
			idMeal: Number,
			mealName: { type: String, required: true },
			discription: String,
			mealAmount: { type: Number, required: true },
			price: { type: Number, required: true },
			image: { type: String, required: true },
			date: { type: Date, default: Date.now },
		},
	],
	signUpDate: { type: Date, default: Date.now },
};

var Business = mongoose.model('Businesss', schema);
module.exports = Business;
