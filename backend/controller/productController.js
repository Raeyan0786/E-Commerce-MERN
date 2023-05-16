const Product =require('../models/products');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures=require('../utils/apiFeatures');

//create new product => /api/v1/admin/product/new
exports.newProduct=catchAsyncErrors(async(req,res,next)=>{
    req.body.user=req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({
        status:true,
        product
    })
})
//Get all products => api/v1/products?keyword=apple
exports.getProducts=catchAsyncErrors(async (req,res,next)=>{
    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        
    const products=await apiFeatures.query; //Product.find() is a query
    const filteredProductsCount=products.length;
    apiFeatures.pagination(resPerPage)
    setTimeout(()=>{
        res.status(200).json({
            status:true,
            count:products.length,
            resPerPage,
            productsCount,
            filteredProductsCount,
            products
        })
    },2000)
    
})

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})

//get single product details => api/v1/product/:id
exports.getSingleProduct=catchAsyncErrors(async (req,res,next) =>{
    const product=await Product.findById(req.params.id);
    if(!product)
    {
        // return res.status(404).json({
        //     status:false,
        //     message:'Product not found'
        // })
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        status:true,
        product
    })
})

//update product details => api/v1/admin/product/:id
exports.updateProduct=catchAsyncErrors(async (req,res,next) =>{
    let product=await Product.findById(req.params.id); // let because we have re-initalize product variable later on 
    if(!product)
    {
        // return res.status(404).json({
        //     status:false,
        //     message:'product not found'
        // })
        return next(new ErrorHandler('Product not found', 404));
    }
    //re-initializing product here
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{ 
        new:true,
        runvalidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        status:true,
        product
    })
})
//delete product => api/v1/admin/product/:id
exports.deleteProduct=catchAsyncErrors(async (req,res,next) =>{
    let product=await Product.findById(req.params.id);
    if(!product)
    {
        // return res.status(404).json({
        //     status:false,
        //     message:'product not found'
        // })
        return next(new ErrorHandler('Product not found', 404));
    }
    await product.remove();
    res.status(200).json({
        status:true,
        message:'product is deleted..'
    })
})

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})