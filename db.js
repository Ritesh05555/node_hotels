const mongoose = require('mongoose');
require('dotenv').config();

 // const mongoURL=process.env.MONGODB_URL_LOCAL; //replace "mydatabase" with your database name
const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

const db= mongoose.connection;

// define a Event listners for db connections 
db.on('connected',()=>{
    console.log('connected to mongo db server')
})

db.on('error',(err)=>{
    console.log('Mongodb connection error',err)
})

db.on('disconnected',()=>{
    console.log('Mongodb connection error')
})

// love this hotel

// Export the database connections
module.exports=db;