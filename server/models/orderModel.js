import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userId:{type: String, required: true},
    items:{type: Array, required: true},
    amount:{type: Number, required: true},
    address:{type: Object, required: true},
    status:{type: String, default: "food processing"},
    date:{type: Date, default: Date.now},
    payment:{type: Object, required: true},
})


const orderModel = mongoose.models.Orders || mongoose.model("Orders", orderSchema);
export default orderModel;