import mongoose from "mongoose";
import AdminSchema from "../Schema/AdminSchema.js";

const AdminModel = mongoose.model("AdminRegsiter", AdminSchema)
export default AdminModel