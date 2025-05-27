import { v2 as  cloudinary} from "cloudinary"
import Product from "../models/productModel.js"

// add product
const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imageURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        await Product.create({...productData, image: imageURL})
        res.json ({success: true, message: "Product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }
}

// product List
const ProductList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({success: true, message: products})
    } catch (error) {
         console.log(error.message);
         res.json({success: false, message: error.message})
    }

}
// productById get single product
const ProductById = async (req, res) => {
    try {
        const {id} = req.body;
        const products = await Product.findById(id)
        res.json({success: true, message: products})

    } catch (error) {
         console.log(error.message);
         res.json({success: false, message: error.message})
    }
}
// Change Stock
const ChangeStock= async (req, res) => {
    try {
        const {id, inStock} = req.body;
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({success: true, message: "Stock updated"})
    } catch (error) {
        console.log(error.message);
         res.json({success: false, message: error.message})
    }
}


export {addProduct,ProductList, ProductById, ChangeStock}