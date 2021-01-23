var express = require('express');
var router = express.Router();
//用户模板引入
let user =require('../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册路由
router.post('/adduser', function(req, res, next) {
  // res.send('respond with a resource');
  console.log(req.body);
  //向数据库添加信息
  let userinfo={
    name:req.body.name,
    password:req.body.password,
    passwords:req.body.passwords,
  }
  //用户验证
  if (userinfo.password!==userinfo.passwords) {
    let error={
      status:0,//错误编码
      stack:''//错误代码
    }
    res.render('error',{error,message:'密码不一致'})
  }
  //页面表单数据，放入模板
  let useri=new user(userinfo)
  //保存
  useri.save((err,result)=>{
    if (!err) {
      res.send(result)
    }
  })
});
module.exports = router;
