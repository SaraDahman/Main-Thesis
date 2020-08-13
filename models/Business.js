const mongoose = require('mongoose');

let schema = {
	idBusiness: { type: String, unique: true, required: true },
	BusinessName: { type: String, required: true },
	phone: { type: Number, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	type: { type: String, required: true },
	password: { type: String, required: true },
	pending: [{ mealId: Number, UserId: Number, quantity: Number }],
	newPending: [
		{
			UserId: { type: Number, required: true },
			order: [
				{
					mealId: { type: Number, required: true },
					resId: { type: Number, required: true },
					quantity: { type: Number, required: true },
				},
			],
		},
	],
	Done: [{ mealId: Number, UserId: Number, quantity: Number }],
	location: [
		{
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
	],
	BusinessImage: { type: String, required: true },
	meal: [
		{
			idMeal: { type: String, required: true },
			mealName: { type: String, required: true },
			discription: String,
			mealAmount: { type: Number, required: true },
			price: { type: Number, required: true },
			image: { type: String, required: true },
			date: { type: Date, default: Date.now },
			resId: { type: String, required: true },
		},
	],
	signUpDate: { type: Date, default: Date.now },
};

var Business = mongoose.model('Businesss', schema);
module.exports = Business;
