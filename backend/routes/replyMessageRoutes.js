const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');

router.post('/send', replyController.sendReply);           // Admin sends reply
router.get('/:email', replyController.getRepliesByEmail);  // User sees replies
router.delete('/delete/:id', replyController.deleteReply); // ✅ User deletes their reply

module.exports = router;
