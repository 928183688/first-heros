//引入数据库
var mysql = require('mysql')
//创建连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'heima'
  });

  //获取所有英雄数据
  exports.getAllData = (callback) => {
        //查询所有数据
        var sql = 'SELECT * from heros where isDelete = 0'
        //开冲
        connection.query(sql,(err,results) => {
                if(err){
                    callback(err)
                }else{
                    callback(null,results)
                }
        })
  }
  
  //添加英雄数据
  exports.addHero = (obj,callback) => {
        //添加数据
        var sql = 'INSERT heros VALUES(null,?,?,?,0)'
        //开冲
        connection.query(sql,[obj.name,obj.gender,obj.img],(err,results) => {
                if(err){
                    callback(err)
                }else{
                    callback(null)
                }
        })
  }

  //根据id找到要修改的英雄
  exports.getEditById = (id,callback) => {
       //查询要修改的
       var sql = 'SELECT * from heros where id = ? and isDelete = 0'
       //开冲
       connection.query(sql,[id],(err,results) => {
            if(err){
                callback(err)
            }else{
                callback(null,results[0])
            }
       })
  }

  //修改英雄信息
  exports.ediHero = (obj,callback) => {
       //根据id修改英雄的信息
       var sql = 'update heros set ? where id = ?'
       //开冲
       connection.query(sql,[obj,obj.id],(err,results) => {
            if(err){
                callback(err)
            }else{
                callback(null)
            }
       })
  }


  //软删除英雄信息
  exports.deleteHeroById = (id,callback) => {
        //根据id软删除英雄信息
        var sql = 'update heros set isDelete = 1 where id = ?'
        //开冲
        connection.query(sql,[id],(err,results) => {
                if(err){
                    callback(err)
                }else{
                    callback(null)
                }
        })
  }