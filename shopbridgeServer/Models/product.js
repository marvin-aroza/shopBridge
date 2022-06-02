const mongoose = require('mongoose')

const productchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    description:{
        type:String,
        trim: true
    },
    image:{
        type:String,
        trim: true
    },
    price:{
        type:Number,
        trim: true
    },
    inStock:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})


const Product = mongoose.model('Product',productchema)
module.exports = Product