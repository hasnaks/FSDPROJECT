const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contact: String,
  capacity: Number,
});

module.exports = mongoose.model("Shelter", shelterSchema);
