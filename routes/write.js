var express = require('express');
var router = express.Router();
//文章模板引入
let write = require('../models/write');
//上传文件工具导入
var multiparty=require('multiparty');
//导入文件
let fs=require('fs');
const { format } = require('path');

//添加文章
router.post('/add',(req,res,next)=>{
    console.log(req.body);
    //向数据库添加信息
    let times=new Date();
    let name=req.session.name;
  let userinfo = {
      times:times,
      name:name,
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
//文件上传路由
router.post('/upload',(req,res,next)=>{
  //实例化multiparty的form类
  let form=new multiparty.Form();
  //使用path，获取文件信息
  form.parse(req,(err,fields,files)=>{
    if (err) {
      console.log(err);
    }
    let file=files.upload[0];
    //读取文件流
    let rstream=fs.createReadStream(file.path);
    //拼接路径
    let filepath='/upload/'+file.originalFilename;
    //写入文件流
    let wstream=fs.createWriteStream('./public'+filepath);
    //触发读写通道，实现上传
    rstream.pipe(wstream);
    //将文件返回给ckeditor这个插件
    wstream.on('close',()=>{
      res.send({uploaded:1,url:filepath})//将服务器端图片地址拿给文本框，使得文章能正确加载图片
    })
  })
})
module.exports=router;