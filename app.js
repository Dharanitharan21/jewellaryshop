const express =require('express')
app_server=express()

app_server.use('/api',require('./Router/userdatarouter'))
app_server.use('/productapi',require('./Router/productrouter'))

module.exports=app_server

