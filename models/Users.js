const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  other: { type: String },
  gender: { type: String },
  password: { type: String, required: true },
  paymentInfo: { type: Object },
  orderList: [
    {
      id: Number,
      name: String,
      discription: String,
      amount: Number,
      image: URL,
    },
  ],
  locations: [{ location: NUmber }],
  date: { type: Date, default: Date.now },
});

export default User = mongoose.model('Users', schema);
