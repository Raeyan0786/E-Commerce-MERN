const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database')
const cloudinary = require('cloudinary')
const serverless= require("serverless-http");

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`); // err.message
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

dotenv.config({path: 'backend/config/config.env' });

connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const server=app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`); //or err.message
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})

module.exports={handler : serverless(app)};
