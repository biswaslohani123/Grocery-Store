import userModel from "../models/userModel.js"

//update user CartData
const updateCart = async (req, res) => {
    try {
        const {userId, cartItems} = req.body
        await userModel.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: "Cart Updated"})
    } catch (error) {
          console.log(error.message);
        return res.json({success:false, message: error.message})
    }
}
export {updateCart}