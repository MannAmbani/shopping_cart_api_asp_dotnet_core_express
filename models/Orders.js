//importing mongoose    
const mongoose = require('mongoose');

//declaring schema
const orderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    shippingAddress: { type: String, required: true },
    status: { type: String}

});

//making model
const Order = mongoose.model('Order', orderSchema);

//exporting model
module.exports = Order;