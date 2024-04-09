//importing mongoose
const mongoose = require('mongoose');

//making schema
const userSchema = new mongoose.Schema({
    username: {type:String},
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact:{type:String},
    purchaseHistory:[{type:mongoose.Schema.Types.ObjectId,ref:'Order'}],
    shippingAddress:{type:String}

});

//making model
const User = mongoose.model('User', userSchema);

//exporting model
module.exports = User;