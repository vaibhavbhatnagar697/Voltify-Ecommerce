import mongoose from "mongoose";
import CartSchema from "../Schema/CartSchema.js";

const CartModel = mongoose.model("carts", CartSchema)

export default CartModel