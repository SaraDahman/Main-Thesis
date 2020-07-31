const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  paymentInfo: [
    {
      idCard: Number,
      firstName: String,
      lastName: String,
      csv: Number,
      month: Number,
      year: Number,
    },
  ],
  orderList: [
    {
      mealId: Number,
      resId: Number,
    },
  ],
  locations: [{ type: Number }],
  date: { type: Date, default: Date.now },
});

export default Users = mongoose.model('Users', schema);
