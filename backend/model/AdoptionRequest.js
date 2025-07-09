const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  reason: String,
  petId: String,
  petName: String,
  petType: String,
  petBreed: String,
   reply: String, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AdoptionRequest", adoptionSchema);
