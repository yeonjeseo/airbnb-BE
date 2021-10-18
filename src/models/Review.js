const mongoose = require('mongoose');

const { Schema } = mongoose;
const reviewSchema = new Schema({
    postId: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Review', reviewSchema);