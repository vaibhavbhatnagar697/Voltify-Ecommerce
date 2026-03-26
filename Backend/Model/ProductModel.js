import mongoose from "mongoose";
import ProductSchema from "../Schema/ProductSchema.js";

const ProductModel = mongoose.model("Products", ProductSchema)

export default ProductModel