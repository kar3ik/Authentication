const jsonwbtoken = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')
const dotenv = require("dotenv");
dotenv.config();


const protect = asyncHandler(async (req,res,next)=>{

    let token;
    token = req.cookies.jsonwbtoken
    if(token){
        try{
            const decoded = jsonwbtoken.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select('-password')
            next()

        }catch(error){
            res.status(401)
            throw new Error('invalid token')
        }

    }else{
        res.status(401)
        throw new Error("unauthorized")
    }

})

module.exports = protect