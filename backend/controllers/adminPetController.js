const Pet = require('../model/pet');

exports.addPet = async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    const saved = await newPet.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error adding pet:", err);
    res.status(500).json({ message: "Failed to add pet", error: err.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update pet", error: err.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete pet", error: err.message });
  }
};
