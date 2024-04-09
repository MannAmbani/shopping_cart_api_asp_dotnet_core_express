//importing mongoose
const mongoose = require('mongoose');

//declaring schema
const commentSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    images: [{ type: String }],
    text: { type: String }
});

//making model
const Comment = mongoose.model('Comment', commentSchema);

//exporting comment model
module.exports = Comment;