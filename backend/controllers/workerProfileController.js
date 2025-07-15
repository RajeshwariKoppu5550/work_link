const WorkerProfile = require('../schemas/workerProfile');

exports.list = async (req, res) => {
    try {
        const profiles = await WorkerProfile.find();
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, skill, experience, pincode, expectedWage, description, mobile } = req.body;
        const profile = new WorkerProfile({
            userId: req.user.userId,
            name,
            skill,
            experience,
            pincode,
            expectedWage,
            description,
            mobile
        });
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const profile = await WorkerProfile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Not found' });
        if (profile.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const { name, skill, experience, pincode, expectedWage, description, mobile } = req.body;
        profile.name = name ?? profile.name;
        profile.skill = skill ?? profile.skill;
        profile.experience = experience ?? profile.experience;
        profile.pincode = pincode ?? profile.pincode;
        profile.expectedWage = expectedWage ?? profile.expectedWage;
        profile.description = description ?? profile.description;
        profile.mobile = mobile ?? profile.mobile;
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.remove = async (req, res) => {
    try {
        const profile = await WorkerProfile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Not found' });
        if (profile.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await profile.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}; 