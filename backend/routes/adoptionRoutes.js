const express = require("express");
const router = express.Router();
const adoptionController = require("../controllers/adoptionController");
const AdoptionRequest = require("../model/AdoptionRequest"); // ✅ Add this line
router.put("/reply/:id", adoptionController.sendReply);
// User submits adoption request
router.post("/apply", adoptionController.submitAdoptionRequest);

// Admin fetches all adoption requests
router.get("/requests", adoptionController.getAllAdoptionRequests);

// Admin deletes a request
router.delete("/delete/:id", async (req, res) => {
  try {
    await AdoptionRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err });
  }
});
router.put("/reply/:id", adoptionController.sendReply);         // ✅ update reply
router.delete("/delete/:id", adoptionController.deleteAdoptionRequest); // ✅ delete
module.exports = router;
