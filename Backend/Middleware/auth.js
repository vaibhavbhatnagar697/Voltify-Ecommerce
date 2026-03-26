import jwt from "jsonwebtoken";
import BlacklistModel from "../Model/BlacklistModel.js"
const verify_token = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "please provide a token"
            })
        }

        const tokenArray = token.split(" ");
        let accessToken = tokenArray[1];

        const blacklistedToken = await BlacklistModel.findOne({ token: accessToken });
        if (blacklistedToken) {
            return res.status(403).json({
                success: false,
                msg: "you are logged out,login first"
            })
        }
        const data = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.userData = data;

        return next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const verify_refresh_token = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        console.log(token)
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "please provide a token"
            })
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = data

        return next()
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
export { verify_token, verify_refresh_token }