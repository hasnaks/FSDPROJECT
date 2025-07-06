// routes/otherPetRoutes.js
const express = require('express');
const router = express.Router();
const OtherPet = require('../model/otherpet');

// GET all other pets
router.get('/', async (req, res) => {
  try {
    const otherPets = await OtherPet.find();
    res.json(otherPets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
