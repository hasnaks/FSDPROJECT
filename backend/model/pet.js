const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: String,
  address: String,
  phone: String,
  image: String,
  type: { type: String, required: true } // Required!
});

module.exports = mongoose.models.Pet || mongoose.model('Pet', petSchema);
