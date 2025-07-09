const express = require('express');
const router = express.Router();
const {
  addOtherPet,
  updateOtherPet,
  deleteOtherPet
} = require('../controllers/adminOtherPetController');

// Add new other pet
router.post('/add', addOtherPet);

// Update existing other pet by ID
router.put('/edit/:id', updateOtherPet);

// Delete other pet by ID
router.delete('/delete/:id', deleteOtherPet);

module.exports = router;
