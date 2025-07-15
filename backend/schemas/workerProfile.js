const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    skill: { type: String, required: true },
    experience: { type: String, required: true },
    pincode: { type: String, required: true },
    expectedWage: { type: String, required: true },
    description: { type: String },
    mobile: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('WorkerProfile', workerProfileSchema); 