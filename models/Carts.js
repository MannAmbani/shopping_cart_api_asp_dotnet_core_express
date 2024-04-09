//importing mongoose
const mongoose = require('mongoose');

//declaring schema
const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

//making model
const Cart = mongoose.model('Cart', cartSchema);

//exporting cart model
module.exports = Cart;