import CartModel from "../Model/CartModel.js";
import ProductModel from "../Model/ProductModel.js";
import Mongoose from "mongoose"
const add_to_cart = async (req, res) => {
    try {
        const { product_id } = req.body;

        const productData = await ProductModel.findById({ _id: product_id });
        console.log(productData)
        if (!productData) {
            return res.status(404).json({
                success: false,
                msg: "No such product found"
            })
        }
        let Cart = await CartModel.findOne({ user_id: req.userData.data._id });

        if (Cart) {
            Cart.products.push({ productData })
        } else {
            Cart = new CartModel({ user_id: req.userData.data._id, products: [{ productData }] })

        };
        await Cart.save()
        await ProductModel.findByIdAndUpdate({ _id: product_id }, {
            $inc: { stock: -1 }
        })

        return res.status(200).json({
            success: true,
            msg: "product addded in cart successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const view_cart = async (req, res) => {
    try {
        const CartData = await CartModel.findOne({ user_id: req.userData.data._id });
        return res.status(200).json({
            success: true,
            msg: "Cart details",
            CartData
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

const remove_cart = async (req, res) => {
    try {
        const { product_id } = req.body;
        const user_id = req.userData.data._id
        const cart = await CartModel.findOne({ user_id })

        const index = cart.products.findIndex((item) => item.productData._id === product_id)

        if (index == -1) {
            return res.status(400).json({
                success: false,
                msg: "no such product exists"
            })
        }
        cart.products.splice(index, 1)
        await cart.save()
        // await CartModel.updateOne({ user_id: user_id }, {
        //     $pull: { products: { "productData._id": product_id } }
        // })
        // console.log(product_id)
        await ProductModel.findByIdAndUpdate({
            _id: product_id
        }, {
            $inc: { stock: 1 }
        })

        return res.status(200).json({
            success: true,
            msg: "product in cart deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

export {
    add_to_cart,
    view_cart,
    remove_cart
}