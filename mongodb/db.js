//1安装
//2 导入安装模块
let mongoose=require('mongoose');
let dburl='mongodb://localhost/myloag';//连接数据库名
//创建链接
mongoose
    .connect(dburl)
    .then(()=>console.log('数据库连接成功'))
    .catch(err=>{console.log('连接失败'+err)})

    module.exports=mongoose