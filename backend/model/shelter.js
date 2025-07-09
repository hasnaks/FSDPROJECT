const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }, // ✅ changed from location to address
  contact: { type: String, required: true },
  capacity: { type: Number, required: true }
});

module.exports = mongoose.models.Shelter || mongoose.model("Shelter", shelterSchema);

