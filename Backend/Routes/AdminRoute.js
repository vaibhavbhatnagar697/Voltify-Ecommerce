import express from 'express';
import { add_products_validator, admin_login_validator, admin_register_validator } from '../Helpers/Validation.js';
import { view_orders, order_status, } from "../Controllers/order.controller.js"
import {
    admin_register,
    admin_logout,
    admin_login,
} from "../Controllers/auth.controller.js"
import { view_product_list, view_product, add_products, edit_products, delete_products } from "../Controllers/product.controller.js"
import { view_users, delete_users } from "../Controllers/user.controller.js"
import multerConfig from '../Config/multer.js';
import uploadImage from '../Controllers/image.controller.js';
const router = express.Router();

//product management
router.get("/api/view-products", view_product_list)
router.post("/api/productData", view_product)
router.post("/api/add-products", add_products_validator, add_products)
router.post("/api/edit-products", add_products_validator, edit_products)
router.post("/api/delete-products", delete_products)
router.post("/api/upload-file", multerConfig, uploadImage)

//order Management
router.get("/api/view-orders", view_orders)
router.post("/api/order-status", order_status)

//user  Management
router.get("/api/view-user", view_users)
router.post("/api/delete-user", delete_users)

//Login
router.post("/api/register", admin_register_validator, admin_register)
router.post("/api/login", admin_login_validator, admin_login)
router.get("/api/logout", admin_logout)
export default router