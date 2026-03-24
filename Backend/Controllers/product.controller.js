import { validationResult } from "express-validator"
import ProductModel from "../Model/ProductModel.js"

const view_product_list = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        if (!products) {
            return res.status(404).json({
                success: false,
                msg: "No product in store"
            })
        }

        return res.status(200).json({
            success: true,
            msg: "Product List",
            products
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const view_product = async (req, res) => {
    try {
        const { product_id } = req.body;

        const data = await ProductModel.find({ _id: product_id })

        if (!data) {
            return res.status(404).json({
                success: false,
                msg: "no data found"
            })
        }

        return res.status(200).json({
            success: true,
            msg: "Product data",
            product: data
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const add_products = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()
            })
        }

        const ProductData = req.body;
        const data = new ProductModel(ProductData);
        await data.save();

        return res.status(200).json({
            success: true,
            msg: "Product added Successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const edit_products = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty) {
            return res.status(400).json({
                success: false,
                msg: errors.array()
            })
        }

        const { product_id } = req.body;

        await ProductModel.findByIdAndUpdate({ _id: product_id }, {
            $set: req.body.product_data
        })

        return res.status(200).json({
            success: true,
            msg: "Product edited successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const delete_products = async (req, res) => {
    try {
        const { product_id } = req.body;

        await ProductModel.deleteOne({ _id: product_id });

        return res.status(200).json({
            success: true,
            msg: "product delete successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const view_products = async (req, res) => {
    try {
        const productData = await ProductModel.find({});

        return res.status(200).json({
            success: true,
            productData
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const product_details = async (req, res) => {
    try {
        const product_id = req.query.product_id;

        if (!product_id) {
            return res.status(400).json({
                success: false,
                msg: "please provide a product id"
            })
        }

        const productData = await ProductModel.findById({ _id: product_id });

        return res.status(200).json({
            success: true,
            msg: "Product details",
            productData
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Product details"
        })
    }
}
export {
    add_products,
    edit_products,
    delete_products,
    view_product_list,
    view_product,
    view_products,
    product_details
}