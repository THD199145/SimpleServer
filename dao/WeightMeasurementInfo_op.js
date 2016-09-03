// operate weightmeasurementinfo table 2016-08-30
var mysql=require('mysql');
var conf=require('../config/dbconfig');
var sql=require('./WeightMeasurementInfo_SqlMapping');
var dbHelper=require('../Util/dbHelper');

//var weightData={};
//module.exports=weightData;

//insert
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
// query by userid order by measurement desc
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
// query by userid and dataid
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
