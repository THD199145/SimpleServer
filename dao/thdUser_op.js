// operate thduser table 2016-08-30
var mysql=require('mysql');
var conf=require('../config/dbconfig');
var sql=require('./thdUser_SqlMapping');
var dbHelper=require('../Util/dbHelper');
var UtilTime=require('../Util/UtilTime');

//var UserData={};
//module.exports=UserData;

//insert
exports.addUserData=function(username,pw,guid){
      var ary=[username,pw,1,UtilTime.getUtcTime(),UtilTime.getUtcTime(),UtilTime.getUtcTime()];
      return new Promise(function(resolve,reject){
      dbHelper.execQuery(sql.insert,[ary],function(err,rows){
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(rows);
      }
    })
  });
}
// query by UserName and isactive=1
exports.selectByUserName=function(username){
  return new Promise(function(resolve,reject){
    dbHelper.execQueryReadOnly(sql.selectByUserName,[username],function(err,rows){
      if(err){
        reject(err);
      }else{
        resolve(rows);
      }
    })
  });
}
