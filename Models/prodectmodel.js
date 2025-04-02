const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name:{type:String},
    price: {type: Number},
    stock: {type: Number },
    description:{type:String},
    materialtype:{type:String},
    category:{type:String},
    manufacturingDate:{type:String},
    image:{type:String},
    userId:{type:String}
}, { timestamps: true })


module.exports = model('productdata', productSchema)