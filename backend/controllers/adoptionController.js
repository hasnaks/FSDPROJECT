const AdoptionRequest = require("../model/AdoptionRequest");

// Submit a new adoption request
exports.submitAdoptionRequest = async (req, res) => {
  try {
    const newRequest = new AdoptionRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Application received!", data: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get all adoption requests (for admin)
exports.getAllAdoptionRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests", error });
  }
};

// ✅ Send reply to a specific request
exports.sendReply = async (req, res) => {
  try {
    const { reply } = req.body;
    const updatedRequest = await AdoptionRequest.findByIdAndUpdate(
      req.params.id,
      { reply },
      { new: true }
    );
    res.status(200).json({ message: "Reply sent", data: updatedRequest });
  } catch (err) {
    res.status(500).json({ message: "Failed to send reply", error: err });
  }
};

// ✅ Optional: Delete a request
exports.deleteAdoptionRequest = async (req, res) => {
  try {
    await AdoptionRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err });
  }
};
// DELETE adoption request by ID (user-side or admin-side)
exports.deleteAdoptionRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await AdoptionRequest.findByIdAndDelete(id);
    res.status(200).json({ message: 'Request deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete request', error });
  }
};
