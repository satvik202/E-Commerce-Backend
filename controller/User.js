const {User} = require('../model/User')

exports.fetchUserById = async (req, res)=>{
    const {id} = req.params
    try{
        const user = await User.findById(id, 'name email addresses role id')
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err)
    }
}

exports.createUser = async (req, res)=>{
    const user = new User(req.body)
    try{
        const doc = await User.save()
        res.status(201).json(doc)
    }catch(err){
        res.status(400).json(err);
    }
}

exports.updateUser= async (req, res)=>{
    const {id} = req.params
    try{
        const user = await User.findByIdAndUpdate(id, req.body, {new : true})
        res.status(201).json(user)
    }catch(err){
        res.status(400).json(err);
    }
}