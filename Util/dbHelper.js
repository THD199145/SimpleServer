// the basic of access db by thd 2016-08-30
var config=require('../config/dbconfig');
var mysql=require('mysql');
var pool=mysql.createPool(config.mysql);
var poolReadOnly=mysql.createPool(config.mysqlReadOnly);

//write data to master through master
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

//read data from slave
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

//operate data create connection and release connection
var OperateData=function(myPool,sql,values,callback){
  var errorinfo;
  myPool.getConnection(function(err,connection){
    if(err){
      errorinfo="connection db occur exception!";
      throw errorinfo;
    }else{
      connection.query(sql,values,function(err,rows){
        //release
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

//release connection
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
