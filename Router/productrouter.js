const {Router} =require('express')
const auth =require('../Controller/logincontroller')
const { create, getall, getbyid, getbyuser, update, remove } = require('../Controller/productcontroller')
const route=Router()

route.post('/create', auth.protect,create);
route.get('/getall', getall);
route.get('/getbyid/:id', getbyid);
route.get('/getbyuser/:userId', auth.protect,getbyuser);
route.put('/update/:id', auth.protect,update);
route.delete('/delete/:id', auth.protect,remove);

module.exports=route