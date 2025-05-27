import express from 'express'
import upload from '../config/multer.js'
import authSeller from '../middleware/authSeller.js'
import { addProduct, ChangeStock, ProductById, ProductList } from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.post('/add', upload.array([images]), authSeller, addProduct )
productRouter.get('/list', ProductList)
productRouter.get('/list/:id', ProductById)
productRouter.post('/stock',authSeller, ChangeStock)

export default productRouter