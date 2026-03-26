import UserModel from "../Model/UserModel.js"



const view_users = async (req, res) => {
    try {
        const users = await UserModel.find({})

        return res.status(200).json({
            success: true,
            msg: "Users List",
            users
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


const delete_users = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                msg: "please provide user id"
            })
        }
        let users = await UserModel.findByIdAndDelete({ _id: user_id })

        if (!users) {
            return res.status(404).json({
                success: false,
                msg: "no data found"
            })
        }
        users = await UserModel.find({})
        return res.status(200).json({
            success: true,
            msg: "User deleted successfully",
            users
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const view_profile = async (req, res) => {
    try {
        const user_id = req.userData.data._id;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                msg: "provide a user id"
            })
        }
        const userData = await UserModel.find({ _id: user_id })

        return res.status(200).json({
            success: true,
            msg: "user data",
            userData
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
export {
    view_users,
    delete_users,
    view_profile
}