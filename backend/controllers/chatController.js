const Chat = require('../schemas/chat');
const User = require('../schemas/user');

exports.getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findOne({ chatId });
        if (!chat) return res.json([]);
        // Only allow participants
        if (!chat.participants.some(id => id.toString() === req.user.userId)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.json(chat.messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { message, receiverId } = req.body;
        if (!message || !receiverId) return res.status(400).json({ message: 'Message and receiverId required' });
        let chat = await Chat.findOne({ chatId });
        if (!chat) {
            chat = new Chat({
                chatId,
                participants: [req.user.userId, receiverId],
                messages: []
            });
        }
        // Only allow participants
        if (!chat.participants.some(id => id.toString() === req.user.userId)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const sender = await User.findById(req.user.userId);
        chat.messages.push({
            senderId: req.user.userId,
            senderName: sender.name,
            message,
            read: false
        });
        await chat.save();
        res.status(201).json(chat.messages[chat.messages.length - 1]);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}; 