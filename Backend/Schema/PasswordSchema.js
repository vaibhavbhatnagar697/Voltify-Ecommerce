import mongoose from "mongoose";

const PasswordSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: "UserModel"
    },
    token: {
        type: String,
        required: true
    }
})

export default PasswordSchema