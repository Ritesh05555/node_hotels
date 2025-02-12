const mongoose = require('mongoose');

const mongoURL='mongodb://localhost:27017/mydatabase' //replace "mydatabase" with your database name

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


// Export the database connections
module.exports=db;