// models/otherpet.js
const mongoose = require('mongoose');

const otherPetSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number,
  address: String,
  image: String,
  phone: String
});

module.exports = mongoose.model('OtherPet', otherPetSchema);
