var express = require('express');
var router = express.Router();
//用户模板引入
let user = require('../models/user');
//引入joi
let Joi = require('joi');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//注册路由
router.post('/adduser', async function (req, res, next) {
  // res.send('respond with a resource');
  console.log(req.body);
  //向数据库添加信息
  let userinfo = {
    name: req.body.name,
    password: req.body.password,
    passwords: req.body.passwords,
  }
  //用户验证
  // if (userinfo.password!==userinfo.passwords) {
  //   let error={
  //     status:0,//错误编码
  //     stack:''//错误代码
  //   }
  //   res.render('error',{error,message:'密码不一致'})
  // }
  const schema = Joi.object({
    name: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则'))
  })
  // try {
  //   const value = await schema.validateAsync(userinfo);
  // } catch (err) {
  //   console.log(err.message);
  //   res.render('error', { message: err.message })
  // }
  //页面表单数据，放入模板
  let useri = new user(userinfo)
  //保存
  useri.save((err, result) => {
    if (!err) {
      res.send(result)
    }
  })
});

//登录
router.post('/index', (req, res, next) => {
  let userinfo = {
    name: req.body.username,
    password: req.body.password,
  }
  console.log(userinfo);
  user.findOne(userinfo, function (err, result) {
    //错误处理
    if (err) {
      return console.log(err);
    }
    // console.log(result);
    if (result == null) {
      console.log('登录失败');
      res.redirect('/register');
    } else {
      //用户登录信息存储
      req.session.name = userinfo.name;
      console.log('登录成功');
      res.redirect('/article');
    }
  })
})
module.exports = router;
