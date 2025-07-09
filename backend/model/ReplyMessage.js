const mongoose = require('mongoose');

const replyMessageSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  message: { type: String, required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdoptionRequest' },
  petName: { type: String },       // 👈 added
  petType: { type: String },       // 👈 added
  petBreed: { type: String },      // 👈 added
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReplyMessage', replyMessageSchema);
