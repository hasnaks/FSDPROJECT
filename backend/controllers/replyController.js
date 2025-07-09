const ReplyMessage = require('../model/ReplyMessage');
const AdoptionRequest = require('../model/AdoptionRequest');

// ✅ POST: Admin sends a reply (with pet details)
exports.sendReply = async (req, res) => {
  try {
    const { userEmail, message, requestId } = req.body;

    // Fetch the adoption request for pet details
    const adoptionRequest = await AdoptionRequest.findById(requestId);
    if (!adoptionRequest) {
      return res.status(404).json({ message: 'Adoption request not found' });
    }

    const newReply = new ReplyMessage({
      userEmail,
      message,
      requestId,
      petName: adoptionRequest.petName,
      petType: adoptionRequest.petType,
      petBreed: adoptionRequest.petBreed,
    });

    await newReply.save();
    res.status(201).json({ message: 'Reply sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send reply', error });
  }
};

// ✅ GET: User fetches all replies sent to their email
exports.getRepliesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const replies = await ReplyMessage.find({ userEmail: email }).sort({ sentAt: -1 });
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error });
  }
};

// ✅ DELETE: User deletes their reply
exports.deleteReply = async (req, res) => {
  try {
    await ReplyMessage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete reply', error: err });
  }
};
