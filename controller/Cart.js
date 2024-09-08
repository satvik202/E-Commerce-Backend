const {Cart} = require('../model/Cart.js')

exports.fetchCartByUser = async (req, res)=>{
    const {user} = req.query;
    try{
        const cart = await Cart.find({user : user}).populate('product');
        res.status(200).json(cart);
    }catch(err){
        // console.log(err)
        res.status(400).json(err)
    }
}

exports.addToCart = async (req, res)=>{
    const cart = new Cart(req.body)
    try{
        const doc = await cart.save()
        const result = await doc.populate('product')
        res.status(201).json(result)
    }catch(err){
        res.status(400).json(err);
    }
}

exports.updateCart= async (req, res)=>{
    const {id} = req.params
    try{
        const cart = await Cart.findByIdAndUpdate(id, req.body, {new : true})
        const result = await cart.populate('product')
        res.status(200).json(result)
    }catch(err){
        res.status(400).json(err);
    }
}
exports.deleteFromCart= async (req, res)=>{
    const {id} = req.params

    try{
        const cart = await Cart.findByIdAndDelete(id);
        res.status(204).send();
    }catch(err){
        res.status(400).json(err);
    }
}
