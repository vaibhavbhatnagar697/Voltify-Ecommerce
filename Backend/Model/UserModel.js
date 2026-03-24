import mongoose from "mongoose";
import UserSchema from "../Schema/userSchema.js";

const UserModel = mongoose.model("users", UserSchema);

export default UserModel