const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    customer_name: {
        type: String,
        required: true
    },
    customer_avatar: {
        type: String
    }
}, {
    timestamps: true
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

module.exports = ReviewModel;
