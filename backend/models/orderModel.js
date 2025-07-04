import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userid: {type: String, required: true, ref: 'user'},
    items: [{
        product: {type: String, required: true, ref: 'user'},
        quantity: {type: Number, required: true}
    }],
    amount: {type: Number, required: true},
    address: {type: String, required: true, ref: 'address'},
    status: {type: String, default: 'Order Placed'},
    paymentType: {type: String, required: true, default: false}

}, {timestamps: true})

const OrderModel = mongoose.models.order || mongoose.model('order', orderSchema)

export default OrderModel