const SavedWorker = require('../schemas/savedWorker');

exports.list = async (req, res) => {
    try {
        const workers = await SavedWorker.find({ userId: req.user.userId });
        res.json(workers);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const { workerProfileId } = req.body;
        // Prevent duplicate
        const existing = await SavedWorker.findOne({ userId: req.user.userId, workerProfileId });
        if (existing) return res.status(400).json({ message: 'Already saved' });
        const saved = new SavedWorker({ userId: req.user.userId, workerProfileId });
        await saved.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.remove = async (req, res) => {
    try {
        const saved = await SavedWorker.findById(req.params.id);
        if (!saved) return res.status(404).json({ message: 'Not found' });
        if (saved.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await saved.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}; 