const mongoose = require('mongoose');

const workPostSchema = new mongoose.Schema({
    contractorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contractorName: { type: String, required: true },
    title: { type: String, required: true },
    workType: { type: String, required: true },
    pincode: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: String, required: true },
    startDate: { type: String },
    endDate: { type: String },
    request: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkerProfile' }],
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('WorkPost', workPostSchema); 