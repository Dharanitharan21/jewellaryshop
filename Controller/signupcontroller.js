
const userdata =require('../Models/usermodel')

exports.Signup=async(req , res ,next)=>{
    try{
       const {name,mobile,email,password}=req.body
       const userexist=await userdata.findOne({mobile,email})
       if(userexist){
        return res.json({error:true,message:"Email already exists"})
       }
       const signupdoc=new userdata({name,mobile,email,password})
       await signupdoc.save()
       return res.status(201).json({message:'Account Created Successfully',data:signupdoc})
    }
    catch(err){
        return res.status(404).json({error:err.message})
    }
}
