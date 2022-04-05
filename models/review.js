const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        trim:true
    },
    rating: {
        type: Number,
        min: 1,
        max:5
    },
    comment: {
        type: String,
        required: true,
        trim:true
    }
})
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;