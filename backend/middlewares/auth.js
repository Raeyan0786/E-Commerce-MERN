const catchAsyncErrors=require('../middlewares/catchAsyncErrors');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    //console.log(token);
    if(!token){
        return next(new ErrorHandler("Login first to access this resource",401));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);
    //console.log(req.user);
    next();
    
})
//Handeling users role
exports.AuthorizeRoles=(...Roles) =>{
    return (req,res,next)=>{
        if(!Roles.includes(req.user.role))
        {
            return next(new ErrorHandler(`${req.user.role} is not allow to access this resource`,403));
        }
        next()
    }
}