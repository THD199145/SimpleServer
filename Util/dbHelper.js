// the basic of access db by thd 2016-08-30
var config=require('../config/dbconfig');
var mysql=require('mysql');
var pool=mysql.createPool(config.mysql);
var poolReadOnly=mysql.createPool(config.mysqlReadOnly);

//通过主库写入数据
exports.execQuery=function(sql,values,callback){
  OperateData(pool,sql,values,function(err,result){
    if(err){
      callback(err);
    }
    if(result){
      callback(null,result);
    }
  });
}

//通过从库读取数据
exports.execQueryReadOnly=function(sql,values,callback){
  OperateData(pool,sql,values,function(err,result){
    if(err){
      callback(err);
    }
    if(result){
      callback(null,result);
    }
  });
}

//操作数据
var OperateData=function(myPool,sql,values,callback){
  var errorinfo;
  myPool.getConnection(function(err,connection){
    if(err){
      errorinfo="connection db occur exception!";
      throw errorinfo;
    }else{
      connection.query(sql,values,function(err,rows){
        //查询成功后释放掉连接
        release(connection)
        if(err){
          errorinfo='exec sql error '+err;
          callback(err);
        }else{
          callback(null,rows);
        }
      });
    }
  });
}

//释放连接
function release(connection){
  try{
    if(connection!=undefined){
      connection.release(function(error){
      console.log(error);
    });
    }
  }catch(err){
    console.log(err);
  }
}
