const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String},
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact:{type:String},
    purchaseHistory:[{type:mongoose.Schema.Types.ObjectId,ref:'Order'}],
    shippingAddress:{type:String}

});

const User = mongoose.model('User', userSchema);

module.exports = User;