// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const connect = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connect;