const AdoptionRequest = require("../model/AdoptionRequest");

exports.submitAdoptionRequest = async (req, res) => {
  try {
    const newRequest = new AdoptionRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Application received!", data: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.getAllAdoptionRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests", error });
  }
};
