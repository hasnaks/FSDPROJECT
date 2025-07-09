const Shelter = require('../model/shelter');

exports.addShelter = async (req, res) => {
  try {
    const shelter = await Shelter.create(req.body);
    res.status(201).json(shelter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateShelter = async (req, res) => {
  try {
    const updated = await Shelter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteShelter = async (req, res) => {
  try {
    await Shelter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shelter deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
