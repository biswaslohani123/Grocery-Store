import OrderModel from "../models/orderModel.js";
import Product from "../models/productModel.js";

// place Order cod

const placeOrderCOD = async (req, res) => {
    try {
        const {userId, items, address} = req.body;
        if (!address || items.length === 0) {
            return res.json({success: false, message: "Invalid data"})
            
        }

        //calculate Amount using items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item, product)
            return (await acc) + product.offerPrice * item.quantity;

        }, 0)

        //Add Tax charge (2%)
        amount += Math.floor(amount * 0.02);
        await OrderModel.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        });
        return res.json({success: true, message: "Order Placed Successfully"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//Get Orders By UserId
const getUserOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await OrderModel.find({
            userId,
            $or : [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1})

        res.json({success: true, orders})


    } catch (error) {
         console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// getAllOrders for Seller
const getAllOrders = async (req, res) => {
    try {
        
        const orders = await OrderModel.find({
            userId,
            $or : [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1})

        res.json({success: true, orders})


    } catch (error) {
         console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


export {placeOrderCOD, getUserOrders, getAllOrders}