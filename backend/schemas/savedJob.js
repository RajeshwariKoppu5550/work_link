const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workPostId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkPost', required: true },
}, { timestamps: true });

module.exports = mongoose.model('SavedJob', savedJobSchema); 