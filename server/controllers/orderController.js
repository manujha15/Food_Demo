import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place a new order and create Stripe checkout session
const placeOrder = async (req, res) => {
    const frontend_Url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            status: "Pending", // Default status
        });
        await newOrder.save();
        await userModel.findOneAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge",
                },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_Url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_Url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ session: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in placing order" });
    }
};

// Verify the order after payment
const verifyOrder = async (req, res) => {
    const { success, orderId } = req.query;

    try {
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (success === "true") {
            order.status = "Paid";
        } else {
            order.status = "Failed";
        }

        await order.save();

        res.redirect(`/order-success?orderId=${orderId}&success=${success}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error verifying order" });
    }
};


const userOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder, verifyOrder };
