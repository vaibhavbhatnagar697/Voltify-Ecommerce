import mongoose from "mongoose"

const CartSchema = mongoose.Schema({
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
    ]


})
export default CartSchema