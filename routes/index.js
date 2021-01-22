var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//注册路由
router.get('/register', function(req, res, next) {
  res.render('register', {  });
});
//文章路由
router.get('/article', function(req, res, next) {
  res.render('article', {  });
});
//查询文章路由
router.get('/detail', function(req, res, next) {
  res.render('detail', {  });
});
//写文章路由
router.get('/write', function(req, res, next) {
  res.render('write', {  });
});
module.exports = router;
