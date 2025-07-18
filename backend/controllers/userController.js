import userModel from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register User
const RegisterUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            return res.json({success: false, message: "All fields are Required"});
            
        }

        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.json({success: false , message: "user already exists"}); 
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const user = await userModel.create({name, email, password: hashedPassword})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, //prevent the js to access the cookie
            secure: process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none': 'strict', //csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({success :true, user: {email: user.email, name: user.name}})
        
    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message: error.message})
        
    }
}

//Login User

const LoginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.json({success: false, message: "Email and Password are required"})
            
        }

        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success: false, message: "Invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({success: false, message: "Inavalid email or password"})
        }
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, //prevent the js to access the cookie
            secure: process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none': 'strict', //csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({success :true, user: {email: user.email, name: user.name}})
        

    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message: error.message})
    }
}

// check Auth 
const isAuth = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId).select("-password")
        return res.json({success: true, user})


    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message: error.message})
    }
}

// logout User

const logOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
             secure: process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none': 'strict',
        })
        return res.json({success: true, message: "Logged Out"})

    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message: error.message})
    }
}
 
export {RegisterUser, LoginUser, isAuth, logOut}