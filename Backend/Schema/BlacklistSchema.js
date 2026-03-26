import mongoose from "mongoose";

const BlacklistSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
})

export default BlacklistSchema