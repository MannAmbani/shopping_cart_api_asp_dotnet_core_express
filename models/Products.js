//importing mongoose
const mongoose = require('mongoose');

//making schema
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

    //making models
const Product = mongoose.model('Product', productSchema);

//exporting models
module.exports = Product;