const express=require('express')
const http_server=express()
const cors =require('cors')
require('./Database/dbconfig')

port = process.env.port || 3000

const path = require('path');
const imagePath = path.join(process.cwd(),'uploads','image')
http_server.use('/api/uplosds/image',express.static(imagePath));

http_server.use(express.json())
http_server.use(express.urlencoded({extended:false}))
http_server.use(cors())
http_server.listen(port,()=>{
    console.log(`Listening port at ${port}`);
})
http_server.use('/',require('./app'))