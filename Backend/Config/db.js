import mongoose from "mongoose";

function DbConnection() {
    mongoose.connect(process.env.DB_CONNECTION);
}
export default DbConnection