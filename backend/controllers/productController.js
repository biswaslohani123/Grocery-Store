import { v2 as cloudinary } from "cloudinary"
import Product from "../models/productModel.js"

// add product
const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)
        const images = req.files

        // Upload images to cloudinary
        let imageURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        // Create product in database
        await Product.create({ ...productData, image: imageURL })
        
        // Send success response - removed 'return' to avoid confusion
        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error.message);
        // Only send error response if no response has been sent yet
        if (!res.headersSent) {
            res.json({ success: false, message: error.message })
        }
    }
}

// product List
const ProductList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, message: products })
    } catch (error) {
        console.log(error.message);
        if (!res.headersSent) {
            res.json({ success: false, message: error.message })
        }
    }
}

// productById get single product
const ProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id)
        res.json({ success: true,  products })
    } catch (error) {
        console.log(error.message);
        if (!res.headersSent) {
            res.json({ success: false, message: error.message })
        }
    }
}

// Change Stock
const ChangeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message: "Stock updated" })
    } catch (error) {
        console.log(error.message);
        if (!res.headersSent) {
            res.json({ success: false, message: error.message })
        }
    }
}

export { addProduct, ProductList, ProductById, ChangeStock }