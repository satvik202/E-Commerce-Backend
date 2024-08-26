const express = require('express')
const server = express();
const mongoose = require('mongoose');
const productRouters = require('./routes/Products')

server.use(express.json()); // to parse req.body
server.use('/products', productRouters.router)

const main = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log("database connected")
}


server.get('/', (req, res)=>{
    res.json({status : "success"})
})


main().catch((err)=>{
    console.log(err);
})

server.listen(8080, ()=>{
    console.log("listening at port 8080")
})