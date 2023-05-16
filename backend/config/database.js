const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con=>{
        console.log(`MongoDb Database connect with Host ${con.connection.host}`)

    })
}
module.exports=connectDatabase