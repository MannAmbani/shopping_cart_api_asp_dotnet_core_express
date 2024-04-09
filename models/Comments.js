const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    images: [{ type: String }],
    text: { type: String }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;