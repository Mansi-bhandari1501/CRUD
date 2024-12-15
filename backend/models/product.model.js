const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    name: { type: String, require: true },
    price: { type: String, require: true },
    desc: { type: String, require: true },
    category: { type: Array, require: true },
    tag: { type: String, require: true },
    amount: { type: String, require: true },
    image:{type: String}
})

module.exports=mongoose.model("product",ProductSchema)