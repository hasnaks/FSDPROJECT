// routes/adminPetRoutes.js
const express = require('express');
const router = express.Router();
const { addPet, updatePet, deletePet } = require('../controllers/adminPetController');

router.post('/add', addPet);
router.put('/edit/:id', updatePet);
router.delete('/delete/:id', deletePet);

module.exports = router;
