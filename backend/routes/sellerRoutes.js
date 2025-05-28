import express from 'express'
import { sellerisAuth, sellerLogin, sellerLogOut } from '../controllers/sellerController.js';
import authSeller from '../middleware/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', authSeller, sellerisAuth);
sellerRouter.get('/logout', sellerLogOut);

export default sellerRouter;
