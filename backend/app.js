require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const workPostsRoutes = require('./routes/workPosts');
const workerProfilesRoutes = require('./routes/workerProfiles');
const connectionRequestsRoutes = require('./routes/connectionRequests');
const chatsRoutes = require('./routes/chats');
const savedJobsRoutes = require('./routes/savedJobs');
const savedWorkersRoutes = require('./routes/savedWorkers');
const connect = require('./connect');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;







app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/work-posts', workPostsRoutes);
app.use('/api/worker-profiles', workerProfilesRoutes);
app.use('/api/connection-requests', connectionRequestsRoutes);
app.use('/api/chats', chatsRoutes);
app.use('/api/saved-jobs', savedJobsRoutes);
app.use('/api/saved-workers', savedWorkersRoutes);



// MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('MongoDB connected');
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch((err) => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
    connect();
    console.log(`Server running on port ${PORT}`);
})
