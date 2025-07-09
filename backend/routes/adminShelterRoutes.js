const express = require('express');
const router = express.Router();
const { addShelter, updateShelter, deleteShelter } = require('../controllers/adminShelterController');

router.post('/add', addShelter);
router.put('/edit/:id', updateShelter);
router.delete('/delete/:id', deleteShelter);

module.exports = router;
