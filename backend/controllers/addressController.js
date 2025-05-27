import AddressModel from "../models/Address.js";


// Add add Address
const addAddress = async (req, res) => {
    try {
        const {address, userId} = req.body;
        await AddressModel.create({...address, userId})
        res.json({success: true, message : "Address added successfully"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }
}

// Get Address
const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;
        const addresses = await AddressModel.find({userId})
          res.json({success: true, addresses})

    } catch (error) {
          console.log(error.message);
          res.json({success: false, message: error.message})
    }
}


export {addAddress, getAddress}