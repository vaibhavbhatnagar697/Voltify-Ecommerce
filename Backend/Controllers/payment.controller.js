import cStripe from "stripe";
import PaymentModel from "../Model/PaymentModel.js"
const payment_session = async (req, res) => {
    try {
        const { order, order_id } = req.body
        const user_id = req.userData.data._id
        console.log(order)

        const line_items = order.map((v) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: v.productData.name
                },
                unit_amount: v.productData.discountPrice * 100
            },
            quantity: 1
        }))
        const Stripe = cStripe(process.env.STRIPE_API_KEY)

        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ["card", "upi"],
            line_items: line_items,
            mode: "payment",
            success_url: `http://localhost:5173/success?order_id=${order_id}`,
            cancel_url: `http://localhost:5173/cancel?order_id=${order_id}`
        })
        console.log(session.url, session.id)

        if (!session.id) {
            return res.status(400).json({
                success: false,
                msg: "transaction declined"
            })
        }

        const payments = new PaymentModel({ order_id, user_id, session_id: session.id, success: true })
        await payments.save();
        return res.status(200).json({
            success: true,
            msg: "payemnt successfull",
            id: session.id,
            url: session.url
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const payment_status = async (req, res) => {
    try {
        const order_id = req.query;

        if (!order_id) {
            return res.status(404).json({
                success: false,
                msg: "no order id in query"
            })
        }
        const paymentData = await PaymentModel.findOne({ order_id })

        return res.status(200).json({
            success: true,
            msg: "Payment id",
            session_id: paymentData.session_id,
            status: paymentData.status
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
export { payment_session, payment_status }