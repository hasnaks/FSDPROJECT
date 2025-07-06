const mongoose = require("mongoose");
const Shelter = require("./model/shelter");
require("dotenv").config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://user:user@cluster0.gwcd3ct.mongodb.net/petadoption?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Sample shelter data
const shelters = [
  { name: "Green Paw Shelter", address: "Kochi, Kerala", contact: "9876543201", capacity: 50 },
  { name: "Safe Haven Animal Center", address: "Thrissur, Kerala", contact: "9876543202", capacity: 40 },
  { name: "Little Tails Shelter", address: "Ernakulam, Kerala", contact: "9876543203", capacity: 30 },
  { name: "Kind Heart Rescue", address: "Palakkad, Kerala", contact: "9876543204", capacity: 25 },
  { name: "Joyful Paws Foundation", address: "Trivandrum, Kerala", contact: "9876543205", capacity: 60 },
  { name: "Helping Hands Shelter", address: "Kannur, Kerala", contact: "9876543206", capacity: 35 },
  { name: "Whiskers & Woofs Home", address: "Calicut, Kerala", contact: "9876543207", capacity: 20 },
  { name: "Purrfect Rescue Home", address: "Kollam, Kerala", contact: "9876543208", capacity: 45 },
  { name: "Bright Future Shelter", address: "Malappuram, Kerala", contact: "9876543209", capacity: 55 },
  { name: "Hope for Paws Kerala", address: "Pathanamthitta, Kerala", contact: "9876543210", capacity: 70 },
];

// Avoid inserting duplicates
Shelter.insertMany(shelters, { ordered: false })
  .then(() => {
    console.log("✅ Shelters inserted successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("⚠️ Some shelter insertions failed (possibly due to duplicates).");
    mongoose.disconnect();
  });
