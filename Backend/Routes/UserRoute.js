import express from "express"
import { forgot_password_validator, login_validator, register_validator } from "../Helpers/Validation.js";
import { verify_token, verify_refresh_token } from "../Middleware/auth.js";
import {
    add_to_order,
    user_order,
    order_details,
    view_particular_order

} from "../Controllers/order.controller.js"
import {
    user_register,
    mail_verification,
    forgot_password,
    reset_password,
    login,
    logout,
    refreshToken
} from "../Controllers/auth.controller.js"
import { add_to_cart, remove_cart, view_cart } from "../Controllers/cart.controller.js"
import { view_products, product_details } from "../Controllers/product.controller.js"
import { payment_session, payment_status } from "../Controllers/payment.controller.js"
import { view_profile } from "../Controllers/user.controller.js"
const router = express.Router();

//Auth Apis
router.post("/api/register", register_validator, user_register)
router.get("/api/mail-verification", mail_verification)
router.post("/api/forgot-password", forgot_password_validator, forgot_password);
router.put("/api/reset-password", reset_password);
router.post("/api/login", login_validator, login)
router.get("/api/logout", logout)
router.get("/api/refresh-token", verify_refresh_token, refreshToken)

//protected Apis
router.get("/api/view-products", verify_token, view_products)
router.post("/api/add-to-cart", verify_token, add_to_cart)
router.get("/api/view-cart", verify_token, view_cart)
router.delete("/api/remove-cart", verify_token, remove_cart)
router.post("/api/add-to-order", verify_token, add_to_order)
router.get("/api/product-details", verify_token, product_details)
router.get("/api/order-list", verify_token, user_order)
router.post("/api/profile", verify_token, view_profile)
router.post("/api/order-details", verify_token, order_details)
router.get("/api/particular-order", verify_token, view_particular_order)
router.post("/api/payment-session", verify_token, payment_session)
router.get("/api/payment-status", verify_token, payment_status)
export default router