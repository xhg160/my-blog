var express = require('express');
var router = express.Router();
//用户模板引入
let write = require('../models/write');
//写文章路由
//添加文章
router.post('/add',(req,res,next)=>{
    console.log(req.body);
    //向数据库添加信息
    let times=new Date();
  let userinfo = {
      times:new Date(),
    title: req.body.title,
    desc: req.body.desc,
  }
  //页面表单数据，放入模板
  let useri = new write(userinfo)
  //保存
  useri.save((err, result) => {
    if (!err) {
      res.send(result)
    }
  })
})
module.exports=router;