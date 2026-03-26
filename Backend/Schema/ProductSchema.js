import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    specifications: {
        ram: Number,
        rom: Number,
        processor: String,
        display: String
    },
    stock: {
        type: Number,
        required: true
    },
    numReviews: {
        type: Number
    },
    images: [
        {
            image_id: String,
            image_url: String
        }
    ]
})

export default ProductSchema