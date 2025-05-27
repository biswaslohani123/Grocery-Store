import express from 'express'
import { isAuth, LoginUser, logOut, RegisterUser } from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'

const userRouter = express.Router()

userRouter.post('/register', RegisterUser)
userRouter.post('/login', LoginUser)
userRouter.get('/is-auth',authUser, isAuth)
userRouter.get('/logout', authUser, logOut)

export default userRouter