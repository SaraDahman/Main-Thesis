const mongoose = require('mongoose');

let schema = {
  id: { type: String, unique: true, required: true },
  BusinessName: { type: String, required: true },
  phone: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  other: { type: String },
  type: { type: String, required: true },
  password: { type: String, required: true },
  pendding: [],
  Done: [],
  location: { type: String, required: true },
  contactInfo: { name: String, number: Number, email: String },
  meal: [
    {
      id: Number,
      name: String,
      discription: String,
      amount: Number,
      image: URL,
    },
  ],
};

export default Business = mongoose.model('Users', schema);
