import { check } from "express-validator";

const add_products_validator = [
    check("name", "name is required").not().isEmpty(),
    check("company", "company of product is required").not().isEmpty(),
    check("price", "price is required").not().isEmpty(),
    check("discountPrice", "discountPrice is required").not().isEmpty(),
]

const register_validator = [
    check("name", "name is required in this").not().isEmpty(),
    check('password', "password should be strong").isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    check('email', "please include a valid email").isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check("mobile", "please include 10 digits  mobile number").isLength({ min: 10, max: 10 })
]
const forgot_password_validator = [
    check('email', "please include a valid email").isEmail().normalizeEmail({
        gmail_remove_dots: true
    })
]
const login_validator = [
    check('email', "please include a valid email").isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check("password", "passowrd is required in this").not().isEmpty(),
]
const admin_register_validator = [

    check('password', "password should be strong").isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    check("mobile", "please include 10 digits  mobile number").isLength({ min: 10, max: 10 })

]
const admin_login_validator = [
    check("admin_id", "please fill Admin Id").not().isEmpty(),
    check("password", "passowrd is required in this").not().isEmpty(),
]

export { add_products_validator, register_validator, forgot_password_validator, login_validator, admin_register_validator, admin_login_validator }