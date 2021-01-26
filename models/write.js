const { string } = require('joi')
let mongoose=require('../mongodb/db')
//Schema
let Schema=mongoose.Schema
let userSchema=new Schema({
    times:Date,
    title:String,
    name:String,
    desc:String,
})

//model   将会生成数据库集合名（复数）
let write=mongoose.model('write',userSchema)
module.exports=write