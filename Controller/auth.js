const User = require('../Model/User')
const jwt = require("jsonwebtoken")
require('dotenv').config()


signup = async (req,res)=>{
    console.log(req.body)
    const userExists = await User.findOne({email:req.body.email})
    if(userExists) return res.status(403).json({
        error :"Email is taken!"
    })
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({message:"signup success",data:user});
}

signin = (req,res)=>{
    //find the used based on email
    const {_id,name,email,password,} = req.body
User.findOne({email}, (err,user)=>{
 //if error or no user
    if(err||!user){
        return res.status(401).json({
            error:"User With that email does not exist. Please sign up"
  
        })
    }
    //if user if found make sure the email and password match
    //create authenticate method in model and use here
    if(!user.authenticate(password)){
        return res.status(401).json({
            error:"Email and password do not matched"
        })
    }
    //generating a token with user id and secret
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    //persist the tocken as 't' in cookie with expiry date
    res.cookie("t",token,{exipire:new Date()+9999})
    //return response with user and token to frontend client
    const {_id,name,email} = user
    return res.json({token,user:{_id,email,name}});
})
   
    //if user found, authenticate

    //generate a token with user id and secret

    //persist the token as 't' in cookie with expiry date
}
module.exports = {signup,signin}