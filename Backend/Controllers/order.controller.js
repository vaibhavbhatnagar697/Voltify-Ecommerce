import CartModel from "../Model/CartModel.js";
import OrderModel from "../Model/OrderModel.js";
import mongoose from "mongoose"
const view_orders = async (req, res) => {
    try {
        const Orders = await OrderModel.find({});

        return res.status(200).json({
            success: true,
            Orders
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const order_status = async (req, res) => {
    try {
        const { order_id, status } = req.body;
        console.log(order_id)
        const Order_data = await OrderModel.find({ _id: order_id });
        if (!Order_data) {
            return res.status(404).json({
                success: false,
                msg: "no data exists for this user"
            })
        }

        await OrderModel.findByIdAndUpdate(order_id, {
            $set: { status }
        })

        return res.status(200).json({
            success: true,
            msg: "Status updated successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const add_to_order = async (req, res) => {
    try {
        const { products } = req.body;
        console.log(products, "add_to_order")
        let Order = new OrderModel({ user_id: req.userData.data._id, products, orderedAt: Date.now() });
        await Order.save();
        for (let i = 0; i < products.length; i++) {
            await CartModel.updateOne({ user_id: req.userData.data._id }, {


                $pull: { products: { "productData._id": products[i].productData._id } }
            })
        }


        return res.status(200).json({
            success: true,
            msg: "Order placed successfully",
            order_id: Order._id
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const user_order = async (req, res) => {
    try {
        const Orderdata = await OrderModel.find({ user_id: req.userData.data._id });
        if (!Orderdata) {
            return res.status(404).json({
                success: false,
                msg: "No orders"
            })
        }
        return res.status(200).json({
            success: true,
            msg: "Order list",
            Orderdata
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            msg: error.message
        })
    }
}

const view_particular_order = async (req, res) => {
    try {
        const order_id = req.query.order_id;
        console.log(order_id)
        if (!order_id) {
            return res.status(400).json({
                success: false,
                msg: "no order_id in query"
            })
        }
        const new_id = new mongoose.Types.ObjectId(order_id)
        console.log(new_id)
        const orderData = await OrderModel.findOne({
            _id: new_id
        })
        console.log(orderData)
        if (!orderData) {
            return res.status(404).json({
                success: false,
                msg: "order not found"
            })
        }
        return res.status(200).json({
            success: true,
            msg: "Order List",
            orderData
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const order_details = async (req, res) => {
    try {
        const { order_id, name, mobile, address, city, state, pincode } = req.body;

        if (!order_id) {
            return res.status(400).json({
                success: false,
                msg: "Please provide a order_id"
            })
        }
        const fullAdress = address + "," + city + "," + state + " " + pincode
        console.log(fullAdress)
        const OrderData = await OrderModel.findOneAndUpdate({ _id: order_id }, {
            $set: { name, address: fullAdress, mobile }
        })

        return res.status(200).json({
            success: true,
            msg: "Proceed to payment gateway"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
export {
    view_orders,
    order_status,
    add_to_order,
    user_order,
    view_particular_order,
    order_details
}