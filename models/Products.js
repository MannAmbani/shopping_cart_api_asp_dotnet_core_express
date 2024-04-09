const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    description: { type: String, required: true },
    image: { type: String, required: true },
    pricing: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    oldPrice:{type:Number},
    title:{ type: String, required: true },
    category:{type:String,required: true},
    tags:{type:String}

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;