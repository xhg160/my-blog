var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//导入session
var session=require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var writeRouter = require('./routes/write');

var app = express();

//配置session
app.use(session({
  secret:'banem',//自己命名
  resave:false,//发送请求的时候重新保存session
  saveUninitialized:true,//保存初始状态
  cookie:{maxAge:1000*60*60*24}//存储信息在客户端，保存时间
}))
//退出登录
// app.get('/go/out',(req,res)=>{
//   res.clearCookie('cookie');
//   res.send('退出成功')
// })

//登录拦截
app.get('*',(req,res,next)=>{
  let name=req.session.name
  
  //如果用户名不存在判断路由
  if (!name) {
    let path=req.path;
    console.log(path);
    //path不是登录，也不是注册
    if (path !=='/index' && path !== '/register') {
      //拦截重定向
    // return  res.redirect('/index')
    }
  }
  next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/write', writeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
