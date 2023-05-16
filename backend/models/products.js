const mongoose=require('mongoose');
const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        maxLength:[100,"Product name cannot excide 100 character"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"Plase enter product price"],
        maxLength:[5,"product price cannot exide 5 character"],
        default:0.0
    },
    description:{
        type:String,
        required:[true,'Plase enter product description']
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Plase select your category"],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:'Please select correct catogory for products'
        },
    },
    seller:{
        type:String,
        required:[true,'Plase enter product seller']
    },
    stock:{
        type:Number,
        required:[true,"Plase enter product stock"],
        maxLength:[5,"product price cannot exide 5 character"],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0    
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Product',productschema)