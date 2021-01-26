var express = require('express');
var router = express.Router();
//引入文章
var write=require('../models/write');
router.get('/', function (req, res, next) {
  res.render('a', {});
});
/* GET home page. */

router.get('/index',function (req, res, next) {
  res.render('index', { title: '登录' });
});
//导航路由
// router.get('/nav', function(req, res, next) {
//   let name=req.ression.name || '';
//   res.render('nav', {name  });
// });
//注册路由
router.get('/register', function (req, res, next) {
  res.render('register', {});
});
//文章路由
router.get('/article',async function (req, res, next) {
  let data=await write.find();
  console.log(data);
  let name = req.session.name || '';
  // console.log(name);
  res.render('article', { name,data });
});
//查询文章路由
router.get('/detail', function (req, res, next) {
  let name = req.session.name || '';
  res.render('detail', {name});
});
//写文章路由
router.get('/write', function (req, res, next) {
  let name = req.session.name || '';
  res.render('write', { name });
});
//我的路由
router.get('/me', function (req, res, next) {
  let name = req.session.name || '';
  res.render('me', {name});
  next()
});
module.exports = router;
