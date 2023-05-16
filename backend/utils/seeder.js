const dotenv=require('dotenv');
const products=require('../data/products.json');
const connectDatabase=require('../config/database');
const Product=require('../models/products');


dotenv.config({path : "backend/config/config.env"});
connectDatabase();

const seedProducts= async () =>{
    try{
        await Product.deleteMany();
        console.log("Delete all products");

        await Product.insertMany(products);
        console.log("Insert all product");

        process.exit();
    }
    catch(err){
        console.log(err.message);
        process.exit();
    }
}
seedProducts();