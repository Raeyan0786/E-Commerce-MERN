const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto = require('crypto')

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name.."],
        maxLength:[30,"Your name cannot exide 30 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valide email addresss"]
    },
    password:{
        type:String,
        required:[true,"Please enter your passord"],
        minlength:[6,"your email must be greater then 3 Characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default: 'user'
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

// Encrypting password before saving password
userschema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})
//compare user password
userschema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

//return jwt token
userschema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token
userschema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}

module.exports=mongoose.model('User',userschema);