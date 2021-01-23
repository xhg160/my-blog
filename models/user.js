let mongoose=require('../mongodb/db')
//Schema
let Schema=mongoose.Schema
let userSchema=new Schema({
    name:String,
    password:String,
    passwords:String,
})
//model   将会生成数据库集合名（复数）
let user=mongoose.model('users',userSchema)
module.exports=user