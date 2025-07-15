const SavedJob = require('../schemas/savedJob');

exports.list = async (req, res) => {
    try {
        const jobs = await SavedJob.find({ userId: req.user.userId });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const { workPostId } = req.body;
        // Prevent duplicate
        const existing = await SavedJob.findOne({ userId: req.user.userId, workPostId });
        if (existing) return res.status(400).json({ message: 'Already saved' });
        const saved = new SavedJob({ userId: req.user.userId, workPostId });
        await saved.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.remove = async (req, res) => {
    try {
        const saved = await SavedJob.findById(req.params.id);
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