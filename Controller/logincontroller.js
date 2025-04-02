const { promisify } = require('util')
const userdata =require('../Models/usermodel')
const jwt =require('jsonwebtoken')
const signToken=id =>{
  return jwt.sign({id},process.env.jwt_secret,{expiresIn:process.env.jwt_express_in})
}
exports.Login=async(req ,res ,next)=>{
    try{
      const {email,password}=req.body
      const logindoc=await userdata.findOne({email})
      if(!logindoc || !(await logindoc.correctPassword(password,logindoc.password))){
        return res.status(404).json({error:"Incorrect email and password"})
       }
       console.log(logindoc);
       const token=signToken(logindoc._id)
       return res.status(200).json({status:'success',token})
        
    }
    catch(err){
        return res.status(404).json({error:err.message})
    }
}

exports.protect=async(req ,res ,next)=>{
  try{
    let token
    if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ){
      token=req.headers.authorization.split(' ')[1]
    }
    console.log(req.headers.authorization);
    if(!token){
      return res.status(401).json({message:"You are not logged in!!! Please log in to get access"})
    }
    const decoded=await promisify(jwt.verify)(token,process.env.jwt_secret)
    console.log(decoded)

    const currentuser = await userdata.findById(decoded.id)
     
    req.user=currentuser
    next()
    
  }
  catch(err){
    return res.status(404).json({error:err.message})
}
}