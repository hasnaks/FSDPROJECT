const OtherPet = require('../model/otherPet');

// Add a new other pet
exports.addOtherPet = async (req, res) => {
  try {
    const newPet = await OtherPet.create(req.body);
    res.status(201).json(newPet);
  } catch (err) {
    console.error('Error adding other pet:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all other pets
exports.getAllOtherPets = async (req, res) => {
  try {
    const pets = await OtherPet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update other pet
exports.updateOtherPet = async (req, res) => {
  try {
    const updated = await OtherPet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Error updating other pet:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete other pet
exports.deleteOtherPet = async (req, res) => {
  try {
    await OtherPet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Other pet deleted' });
  } catch (err) {
    console.error('Error deleting other pet:', err);
    res.status(500).json({ message: err.message });
  }
};
