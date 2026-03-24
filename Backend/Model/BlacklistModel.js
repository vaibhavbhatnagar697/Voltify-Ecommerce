import mongoose from "mongoose";
import BlacklistSchema from "../Schema/BlacklistSchema.js"
const BlacklistModel = mongoose.model("blacklist", BlacklistSchema)

export default BlacklistModel