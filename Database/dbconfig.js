const  mongoose =require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.mongo_url).then(()=>console.log('MongoDb Connected')).catch((err)=>console.log(err))