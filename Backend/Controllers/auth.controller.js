import { validationResult } from "express-validator"
import UserModel from "../Model/UserModel.js"
import bcrypt from "bcrypt"
import sendEmail from "../Helpers/mailer.js"
import Randomstring from "randomstring"
import passwordModel from "../Model/PasswordModel.js"
import PasswordModel from "../Model/PasswordModel.js"
import jwt from "jsonwebtoken"
import BlacklistModel from "../Model/BlacklistModel.js"
import AdminModel from "../Model/AdminModel.js"

const user_register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()
            })
        }

        const { name, password, email, mobile } = req.body;

        const userData = await UserModel.findOne({ email });

        if (userData) {
            return res.status(409).json({
                success: false,
                msg: "email already exists"
            })
        }

        const hashed_Password = await bcrypt.hash(password, 10);

        const user = new UserModel({ email, password: hashed_Password, mobile, name });
        await user.save();

        const msg = `<p>Hello,${name}</p>
        Go to link:<a href="http://localhost:5173/mail-verification?user_id=${user._id}">Link</a>
        `
        sendEmail(email, "Email Verification", msg)

        return res.status(200).json({
            success: true,
            msg: "verification email sent successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const mail_verification = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        if (!user_id) {
            return res.status(400).json({
                success: false,
                msg: "no query in req"
            })
        }

        const userData = await UserModel.findOne({ _id: user_id });

        if (!userData) {
            return res.status(404).json({
                success: false,
                msg: "no such data exists"
            })
        }

        if (userData.is_verified === 1) {
            return res.status(400).json({
                success: false,
                msg: "email is already verified"
            })
        }

        await UserModel.findByIdAndUpdate({ _id: user_id }, {
            $set: { is_verified: 1 }
        })

        return res.status(200).json({
            success: true,
            msg: "email verified successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const forgot_password = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()
            })
        }

        const { email } = req.body;

        const userData = await UserModel.findOne({ email });

        if (!userData) {
            return res.status(404).json({
                success: false,
                msg: "email does not exists"
            })
        }

        const token = Randomstring.generate();
        await passwordModel.deleteMany({ user_id: userData._id });

        const password = new passwordModel({ user_id: userData._id, token })
        await password.save();

        const msg = `<p>Hello,${userData.name}
        Go to link for reset password <a href="http://localhost:5173/reset-password?token=${token}">Link</a>
        `
        sendEmail(email, "Reset Password", msg);

        return res.status(200).json({
            success: true,
            msg: "Reset password link sent successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const reset_password = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({
                success: false,
                msg: "no token in query"
            })
        }

        const passwordData = await PasswordModel.findOne({ token });

        if (!passwordData) {
            return res.status(404).json({
                success: false,
                msg: "Data not found"
            })
        }

        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: "Password and confirm Password do not match"
            })
        }

        const hashedPassword = await bcrypt.hash(confirmPassword, 10);

        await UserModel.findByIdAndUpdate({ _id: passwordData.user_id }, {
            $set: { password: hashedPassword }
        })

        return res.status(200).json({
            success: true,
            msg: "password reset successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()
            })
        }

        const { email, password } = req.body;

        const userData = await UserModel.findOne({ email });
        console.log(userData, email, password)
        if (!userData) {
            return res.status(404).json({
                success: false,
                msg: "user not found"
            })
        }

        if (userData.is_verified === 0) {
            return res.status(400).json({
                success: false,
                msg: "your email is not verified"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                msg: "email and password do not match"
            })
        }
        const accessToken = await generateAccessToken({ data: userData });
        const refreshToken = await generateRefreshToken({ data: userData })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            msg: "Login successfully",
            type: "Bearer",
            accessToken,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const generateAccessToken = async (data) => {
    const accesstoken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "2h" });
    return accesstoken
}

const generateRefreshToken = async (data) => {
    const refreshtoken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "4h" });
    return refreshtoken
}

const refreshToken = async (req, res) => {
    try {
        const userData = await UserModel.findOne({ _id: req.userData.data._id });
        const accessToken = await generateAccessToken({ data: userData })
        const refreshToken = await generateRefreshToken({ data: userData })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        return res.status(200).json({
            success: true,
            msg: "Token Refreshed",
            accessToken,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization;
        let tokenArray = token.split(" ");
        let accessToken = tokenArray[1];

        const blacklist = new BlacklistModel({ token: accessToken });
        await blacklist.save();

        res.clearCookie("refreshToken");
        res.removeHeader("authorization");

        return res.status(200).json({
            success: true,
            msg: "You are logged out successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.msg
        })
    }
}
const admin_register = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()
            })
        }
        const { admin_id, password, role, mobile } = req.body;

        const adminData = await AdminModel.findOne({ admin_id })

        if (adminData) {
            return res.status(409).json({
                success: false,
                msg: "admin already exists"
            })
        }

        const hashed_Password = await bcrypt.hash(password, 10)

        const data = new AdminModel({ admin_id, password: hashed_Password, role, mobile })
        await data.save();

        return res.status(200).json({
            success: true,
            msg: "admin registered successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const admin_login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()
            })
        }

        const { admin_id, password } = req.body;

        const data = await AdminModel.findOne({ admin_id })
        console.log(data)
        if (!data) {
            return res.status(404).json({
                success: false,
                msg: "No user found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, data.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                msg: "admin_id or password is incorrect"
            })
        }

        return res.status(200).json({
            success: true,
            msg: "admin logged in successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const admin_logout = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            msg: "Logged out successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export {
    user_register,
    mail_verification,
    forgot_password,
    reset_password,
    login,
    logout,
    admin_register,
    admin_login,
    admin_logout,
    refreshToken
}