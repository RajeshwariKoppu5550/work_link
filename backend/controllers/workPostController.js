const WorkPost = require('../schemas/workPost');

exports.list = async (req, res) => {
    try {
        const posts = await WorkPost.find({ status: 'active' });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const { title, workType, pincode, description, budget, startDate, endDate } = req.body;
        const post = new WorkPost({
            contractorId: req.user.userId,
            contractorName: req.user.name,
            title,
            workType,
            pincode,
            description,
            budget: String(budget), // Ensure budget is a string
            startDate,
            endDate
        });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error('WorkPost Create Error:', err); // Add error logging
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const post = await WorkPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Not found' });
        if (post.contractorId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const { title, workType, pincode, description, budget, startDate, endDate, status } = req.body;
        post.title = title ?? post.title;
        post.workType = workType ?? post.workType;
        post.pincode = pincode ?? post.pincode;
        post.description = description ?? post.description;
        post.budget = budget ?? post.budget;
        post.startDate = startDate ?? post.startDate;
        post.endDate = endDate ?? post.endDate;
        post.status = status ?? post.status;
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.remove = async (req, res) => {
    try {
        const post = await WorkPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Not found' });
        if (post.contractorId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await post.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.request = async (req, res) => {
    try {
        const { workPostId, workerId } = req.body;
        const workPost = await WorkPost.findById(workPostId);
        if (!workPost) return res.status(404).json({ message: 'Work post not found' });
        const checkapplied = workPost.request.includes(workerId);
        if (checkapplied) {
            workPost.request.pull(workerId);
            await workPost.save();
        }
        else {
            workPost.request.push(workerId);
            await workPost.save();
        }
        res.json(workPost);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
};