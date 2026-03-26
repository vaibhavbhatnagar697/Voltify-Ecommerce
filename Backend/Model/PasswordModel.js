import mongoose from "mongoose";
import PasswordSchema from "../Schema/PasswordSchema.js"
const PasswordModel = mongoose.model("password", PasswordSchema)

export default PasswordModel