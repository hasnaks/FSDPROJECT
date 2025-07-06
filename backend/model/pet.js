const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number,
  address: String,
  image: String,
  phone: String,
});

module.exports = mongoose.model('Pet', petSchema);
