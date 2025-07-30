const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    app.use((req, res, next) => {
        console.log(`[${req.method}] ${req.url}`);
        next();
    });

    app.use(express.json());
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach all fields (userId, role, name)
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}; 