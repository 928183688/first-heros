//引入express框架
var express = require('express')
//创建服务器
var app = express()
//引入路由
var router = require('./router')
//引入bodyParser 解析post方法
var  bodyParser  = require('body-parser')
//监听端口
app.listen(2800,() => {
    console.log('http://127.0.0.1:2800')
})
//托管静态文件
app.use(express.static('public'))
//引入模板
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
//解析post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//注入路由
app.use(router)