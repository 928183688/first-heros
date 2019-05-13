//引入数据库模块
var dataMoudle = require('./dataMoudle')
//引入文件上传模块
var formidable = require('formidable')
//引入路径方法
var path = require('path')
//引入url方法
var myurl = require('url')
//获取英雄动态首页
exports.getIndexPage = (req,res) => {
    dataMoudle.getAllData((err,data) => {
            if(err){
                res.end('404')
            }else{
                // console.log(data)
                res.render(__dirname + '/views/index.html',{heros : data})
            }
    })

    
}

//获取静态增加英雄页面
exports.getAddPage = (req,res) => {
        res.render(__dirname + '/views/add.html')
}

//上传文件信息
exports.uploadFile = (req,res) => {
    //创建对象
    var form = new formidable.IncomingForm()
    //文件编码格式
    // form.encoding = 'utf-8';
    //文件路径
    form.uploadDir =  __dirname + '/public/images'
    // console.log(form.uploadFile)
    //文件扩展名
    form.keepExtensions = true;
    //解析request包含表单数据的传入node.js
    //三个参数 一个是错误信息 一个是键值对字段 一个是文件对象
    form.parse(req,(err, fields, files) => {
        // console.log(files)
            if(err){
                res.json({
                    code: 201,
                    msg : '上传英雄图片失败'
                })
            }else{
                //截取最后的扩展名
                var filename = path.basename(files.img.path)
                res.json({
                    code : 200,
                    msg : '上传英雄图片成功',
                    img : filename
                })
            }
    }) 
}

//添加英雄数据
exports.doAdd = (req,res) => {
    // console.log(req.body)
    dataMoudle.addHero(req.body,(err) => {
        if(err){
            res.json({
                code: 201,
                msg : '添加英雄失败'
            })
        }else{
            res.json({
                code : 200,
                msg : '添加英雄成功',
            })
        }
    })
}

//修改英雄页面
exports.getEditPage = (req,res) => {
    //根据id找到修改的英雄
    var id = myurl.parse(req.url,true).query.id
    // console.log(id)
    //找到id 给他们修改
    dataMoudle.getEditById(id,(err,data) => {
          if(err){
              res.end('404')
          }else{
              res.render(__dirname + '/views/edit.html',data)
          }
    })
}

//编辑英雄信息
exports.doEdit = (req,res) => {
    //  console.log(req.body)
     dataMoudle.ediHero(req.body,(err) => {
        if(err){
            res.json({
                code: 201,
                msg : '编辑英雄信息失败'
            })
        }else{
            res.json({
                code : 200,
                msg : '编辑英雄信息成功',
            })
        }
     })
}

exports.deleteHero = (req,res) => {
     //根据ID软删除英雄信息
     var id = myurl.parse(req.url,true).query.id
     //开冲
     dataMoudle.deleteHeroById(id,(err) => {
        if(err){
            res.json({
                code: 201,
                msg : '删除英雄信息失败'
            })
        }else{
            res.json({
                code : 200,
                msg : '删除英雄信息成功',
            })
        }
     })
}