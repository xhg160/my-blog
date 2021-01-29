var express = require('express');
var router = express.Router();
//引入文章
var write=require('../models/write');
//引入时间
var moment = require('moment');
const { date } = require('joi');
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
  // let data=await write.find();
  // console.log(data);
  var cpage=req.query.page||1;
  console.log(cpage);
  let name = req.session.name || '';
  // console.log(name);
  let data={
    bloglist:[],//文章列表
    currpage:cpage,//当前页数
    pagestotle:'',//总页数
  }
  //设定每页渲染的条数
  let pagesize=2;
  //确定每页显示的数据
  data.bloglist=await write.find()
  .limit(pagesize)//限定展示出来的条数
  .skip((data.currpage-1)*pagesize)//限定从第几条开始截取
  //总数据
  let blogall=await write.find();
  //总页码总页数向上取整
  data.pagestotle=Math.ceil(blogall.length/pagesize) ;
  // console.log(data.pagestotle);
  //时间
  data.bloglist.map(item=>{
    let a=moment(item.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');
    item.times=a
  })
  res.render('article', { name,data });
});
//查询文章路由
router.get('/detail',function (req, res, next) {
 
  let name = req.session.name || '';
  res.render('detail', {name});
});
//写文章路由
router.get('/write',async  function (req, res, next) {
   //获取用户id
   let id=req.query._id||'';
   // console.log(id);
  let name = req.session.name || '';
   if (id) {
     //刚传输过来的page
    let page=req.query.page;
    console.log(page);
     let data=await write.findOne({_id:id});
     data.page=page
     data['times']=moment(data.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');
     res.render('write', { name,data });

   }else{
     let data={
       title:'',
       desc:'',
       _id:''
     }
     res.render('write', { name,data });

   }
});
//我的路由
router.get('/me',async function (req, res, next) {
  let data=await write.findOne();
  data.bloglist=await write.find()
  console.log(data);
  let name = req.session.name || '';
  data.bloglist.map(item=>{
    let a=moment(item.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');
    item.times=a
  })
  res.render('me', {name,data});
  next()
});
module.exports = router;
