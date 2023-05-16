const express = require('express');
const app=express();
const CookieParser=require('cookie-parser');
const cloudinary=require('cloudinary');
const bodyParser=require('body-parser'); 
const fileUpload = require('express-fileupload')
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(CookieParser());
app.use(fileUpload());


const errorMiddleware = require('./middlewares/errors')
const products = require('./routes/product');
const auth=require('./routes/auth');
const order=require('./routes/order')
//const cookieParser = require('cookie-parser');


app.use('/api/v1', products);
app.use('/api/v1',auth);
app.use('/api/v1',order);
app.use(errorMiddleware);
module.exports = app;