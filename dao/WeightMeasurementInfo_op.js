// 实现对weightmeasurementinfo表的数据操作 2016-08-30
var mysql=require('mysql');
var conf=require('../config/dbconfig');
var sql=require('./WeightMeasurementInfo_SqlMapping');
var dbHelper=require('../Util/dbHelper');

//var weightData={};
//module.exports=weightData;

//添加数据
exports.addWeightData=function(arr){
  try{
      return new Promise(function(resolve,reject){
    dbHelper.execQuery(sql.insert,[arr],function(err,rows){
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(rows);
      }
    })
  });
  }catch(e){
    console.log(e);
  }
}
// 查找数据通过userid降序查询数据
exports.selectByUserIdAndMeasurementTimeDesc=function(arr){
  return new Promise(function(resolve,reject){
    dbHelper.execQueryReadOnly(sql.selectByUserIdAndMeasurementTimeDesc,arr,function(err,rows){
      if(err){
        reject(err);
      }else{
        resolve(rows);
      }
    })
  });
}
// 查找数据通过Userid和DataID
exports.selectWeightDataByUserIdAndDataID=function(userid,DataID,count,measuretime){
  return new Promise(function(resolve,reject){
    dbHelper.execQueryReadOnly(sql.selectByUserIdAndDataID,[userid,DataID],function(err,rows){
      if(err){
        reject(err);
      }else{
        resolve(rows);
      }
    })
  });
}