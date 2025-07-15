const ConnectionRequest = require('../schemas/connectionRequest');
const WorkPost = require('../schemas/workPost');
const User = require('../schemas/user');

exports.list = async (req, res) => {
    try {
        // List requests where user is sender or receiver
        const requests = await ConnectionRequest.find({
            $or: [
                { senderId: req.user.userId },
                { receiverId: req.user.userId }
            ]
        });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const { workPostId } = req.body;
        const workPost = await WorkPost.findById(workPostId);
        if (!workPost) return res.status(404).json({ message: 'Work post not found' });
        // Prevent duplicate pending requests
        const existing = await ConnectionRequest.findOne({
            senderId: req.user.userId,
            workPostId,
            status: 'pending'
        });
        if (existing) return res.status(400).json({ message: 'Already applied' });
        const contractor = await User.findById(workPost.contractorId);
        const request = new ConnectionRequest({
            senderId: req.user.userId,
            receiverId: workPost.contractorId,
            senderName: req.user.name,
            receiverName: contractor.name,
            type: 'worker_to_contractor',
            status: 'pending',
            workPostId,
            workPostTitle: workPost.title,
            jobDetails: {
                title: workPost.title,
                workType: workPost.workType,
                location: workPost.pincode,
                budget: workPost.budget
            }
        });
        await request.save();
        res.status(201).json(request);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const { status } = req.body; // 'accepted' or 'declined'
        const request = await ConnectionRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Not found' });
        if (request.receiverId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (!['accepted', 'declined'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        request.status = status;
        await request.save();
        res.json(request);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}; 