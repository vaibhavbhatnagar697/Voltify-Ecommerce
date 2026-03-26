import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    session_id: {
        type: String,
        required: true
    },
    success: {
        type: Boolean,
        default: false
    }

})

export default PaymentSchema