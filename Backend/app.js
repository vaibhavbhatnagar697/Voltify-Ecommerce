import express from "express"
import AdminRoute from "./Routes/AdminRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import DbConnection from "./Config/db.js";
dotenv.config();
const app = express();
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true
}))
DbConnection()
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use("/admin", AdminRoute)
app.use("/user", UserRoute)

app.listen(3200)