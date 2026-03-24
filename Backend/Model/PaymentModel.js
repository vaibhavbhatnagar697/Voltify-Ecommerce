import mongoose from "mongoose";
import PaymentSchema from "../Schema/PaymentSchema.js";

const PaymentModel = mongoose.model("Payments", PaymentSchema)

export default PaymentModel