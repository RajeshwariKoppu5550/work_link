const mongoose = require('mongoose');

const savedWorkerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workerProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkerProfile', required: true },
}, { timestamps: true });

module.exports = mongoose.model('SavedWorker', savedWorkerSchema); 