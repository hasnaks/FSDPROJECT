const express = require("express");
const router = express.Router();
const adoptionController = require("../controllers/adoptionController");

router.post("/apply", adoptionController.submitAdoptionRequest);
router.get("/requests", adoptionController.getAllAdoptionRequests); // Admin use

module.exports = router;
