const {Schema,model}=require('mongoose')
const bcrypt =require('bcryptjs')

const userSchema=new Schema({
    name:{type:String},
    mobile:{type:Number},
    email:{type:String},
    password:{type:String}
},{ timestamps: true })

userSchema.pre('save',async function(next) {
    this.password=await bcrypt.hash(this.password,12)
    next()
})

userSchema.methods.correctPassword= async function (canditadepassword,userpassword) {
    return await bcrypt.compare(canditadepassword,userpassword)
    
}
module.exports=model('userdata',userSchema)