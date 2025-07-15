const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middlewares/authMiddleware');

// Get chat messages
router.get('/:chatId', auth, chatController.getMessages);
// Send message
router.post('/:chatId', auth, chatController.sendMessage);

module.exports = router; 