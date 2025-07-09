const mongoose = require("mongoose");

const otherPetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Bird, Rabbit, etc.
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.models.OtherPet || mongoose.model("OtherPet", otherPetSchema);


