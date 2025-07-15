const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    senderName: { type: String, required: true },
    receiverName: { type: String, required: true },
    type: { type: String, enum: ['worker_to_contractor'], required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    workPostId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkPost', required: true },
    workPostTitle: { type: String, required: true },
    jobDetails: {
        title: String,
        workType: String,
        location: String,
        budget: String
    }
}, { timestamps: true });

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema); 