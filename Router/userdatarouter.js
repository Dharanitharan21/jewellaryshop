const {Router} =require('express')
const { Signup } = require('../Controller/signupcontroller')
const { Login } = require('../Controller/logincontroller')
const route=Router()

route.post('/signup',Signup)
route.post('/login',Login)

module.exports=route