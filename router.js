//引入express框架
var express = require('express')
//引入路由
var router = express.Router()
//引入控制器
var heroController = require('./heroController')
//请求方式
        //获取动态首页
router.get('/',heroController.getIndexPage)
       //获取添加英雄静态页
      .get('/add',heroController.getAddPage)
       //获取文件信息
      .post('/uploadFile',heroController.uploadFile)
       //添加英雄信息
       .post('/add',heroController.doAdd)
       //修改英雄信息页面
       .get('/edit',heroController.getEditPage)
       //编辑英雄信息
       .post('/edit',heroController.doEdit)
       //软删除英雄信息
       .get('/del',heroController.deleteHero)
//暴露路由
module.exports = router