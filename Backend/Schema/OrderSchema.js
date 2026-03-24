import mongoose from "mongoose"

const OrderSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: "UserModel"
    },
    products: [
        {
            productData: {
                _id: String,
                name: String,
                company: String,
                discountPrice: Number,
                price: Number,
                images: [{
                    image_id: String,
                    image_url: String
                }]
            }
        }
    ],
    status: {
        type: "String",
        default: "Pending"
    },
    mobile: {
        type: Number
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    orderedAt: {
        type: Date,
        default: Date.now()
    }
})
export default OrderSchema