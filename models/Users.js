const mongoose = require('mongoose');

let schema = mongoose.Schema({
	userId: { type: String, unique: true, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phone: { type: Number, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	orderList: [
		{
			mealId: { type: String, required: true },
			resId: { type: String, required: true },
			userId: { type: String, required: true },
			amount: { type: Number, required: true },
			addDate: { type: Date, default: Date.now },
		},
	],
	signUpDate: { type: Date, default: Date.now },
	confirmed: {type: Boolean, default: false}
});

var Users = mongoose.model('Users', schema);

module.exports = Users;
