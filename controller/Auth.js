const {User} = require('../model/User')

exports.createUser = async (req, res)=>{
    const user = new User(req.body)
    try{
        const doc = await user.save()
        res.status(201).json(doc)
    }catch(err){
        res.status(400).json(err);
    }
}

exports.loginUser = async (req, res)=>{
    try{
        const user = await User.findOne({email : req.body.email}, 'id password email role').exec()
        // console.log(user)
        if(!user){
            res.status(400).json({message : "invalid credentials"})
        }else if(user.password === req.body.password){
            res.status(201).json({id: user.id, email:user.email, role:user.role})
        }else{
            res.status(400).json({message : "invalid credentials"})
        }
    }catch(err){
        res.status(400).json(err)
    }
}