import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    admin_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Admin"
    },
    mobile: {
        type: Number,
        required: true
    }
})
export default AdminSchema