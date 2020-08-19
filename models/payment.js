const mongoose = require('mongoose');

let schema = mongoose.Schema({
	userId: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	address1: { type: String, required: true },
	address2: { type: String },
	city: { type: String, required: true },
	state: { type: String, required: true },
	zip: { type: String },
	country: { type: String, required: true },
	paymentDate: { type: Date, default: Date.now },
	location: {
		numberX: { type: Number },
		numberY: { type: Number },
	},
});

var Payment = mongoose.model('Payment', schema);

module.exports = Payment;
