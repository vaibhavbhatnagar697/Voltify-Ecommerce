import mongoose from "mongoose";
import OrderSchema from "../Schema/OrderSchema.js";

const OrderModel = mongoose.model("orders", OrderSchema)

export default OrderModel