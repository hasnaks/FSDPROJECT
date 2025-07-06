const express = require("express");
const router = express.Router();
const Shelter = require("../model/shelter");

// Get all shelters
router.get("/", async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a shelter
router.post("/", async (req, res) => {
  const { name, address, contact, capacity } = req.body;
  const newShelter = new Shelter({ name, address, contact, capacity });

  try {
    const savedShelter = await newShelter.save();
    res.status(201).json(savedShelter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
