//设备数据处理
var convertTools=require('../Util/convertTools');
var weightData=require('../dao/WeightMeasurementInfo_op');


//var transferData={};
//module.exports=transferData;


//上传数据
exports.SaveUpHS6Data=async function(IDPS,data){
    try{
        //返回标示1 成功，2 数据条数不符 3 失败
        var result=1;
        var dataBytes = new Buffer(data, "base64");
        var dataType=dataBytes[1];
        var dataLength = dataBytes[2];
        var recordCount = dataBytes[3];
        var recordsLength = dataBytes.length - 4;
        //体重数据
        if(dataType==1){
            var aRecordLength=0;
            if ((recordsLength / 22 == recordCount && recordsLength % 22 == 0)){
                aRecordLength=22;
            }
            if((recordsLength / 32 == recordCount && recordsLength % 32 == 0)){
                aRecordLength=32;
            }
            if(aRecordLength==0){
                result=2;
            }else{
                //拆分数据
                var weightDataEntities=getWeightDataList(dataBytes.slice(4),aRecordLength,IDPS.SN);
                weightDataEntities.forEach(function(v,i){
                    SaveWeightData(v,i);
                });
            }
        }else{
            result=3;
        }
    }catch(e){
        result=3;
        console.log(e);
    }
    return result;
}
//存储体重数据
async function SaveWeightData(DataEntity,i){
    var result=await weightData.selectWeightDataByUserIdAndDataID(DataEntity.UserId,DataEntity.DataID);
    console.log(DataEntity.weight);
    if(result.length==0){
       var weight=['',DataEntity.DataID,DataEntity.UserId,0,DataEntity.Bone,DataEntity.DCI,DataEntity.BodyFat
       ,DataEntity.Muscle,DataEntity.Water,DataEntity.Weight,1,DataEntity.MeasureTime,1,DataEntity.mdeviceId
       ,'HS6','1.0','',getUtcTime(),getUtcTime(),0,'',1,DataEntity.VisceralFatRate,DataEntity.mdeviceId,0,0,0,getUtcTime()
       ,'',0,getUtcTime(),1,1,'',0,0];
       weightData.addWeightData(weight);
    }
}
function getUtcTime(){
   var dt = new Date;
   dt.setMinutes( dt.getMinutes() + dt.getTimezoneOffset() );
   return dt;
}

//拆分数据
function getWeightDataList(databytes,datalength,Did){
    var weightDataEntities=[];
    for(var i=0;i<databytes.length;i+=datalength){
        var tempWeight = getTempWeight(databytes.slice(10, 12));
        var weightRightTwo = tempWeight.toString().length > 2 ? tempWeight.toString().substring(tempWeight.toString().length - 2) : tempWeight.toString();
        //数据实体
        var DataEntity={
            mdeviceId:Did,
            UserId: getUserID(databytes.slice(0, 3)),
            Weight: getWeight(tempWeight),
            MeasureTime:getTime(databytes.slice(4, 10)),
            WeightRightTwo: weightRightTwo,
            BodyFat: getBodyFat(databytes.slice(12, 14)),
            Water: getWater(databytes.slice(14, 16)),
            Muscle: getMuscle(databytes.slice(16, 18)),
            Bone: getBone(databytes.slice(18, 19)),
            VisceralFatRate: getVisceralFatRate(databytes.slice(19, 20)),
            DCI: getDCI(databytes.slice(20, 22)),
            DataID:Did+getUserID(databytes.slice(0, 3))+weightRightTwo+getTime(databytes.slice(4, 10)).getTime()
        };
        console.log(DataEntity);
        weightDataEntities.push(DataEntity);
    }
    return weightDataEntities;
}

function getTempWeight(buf) {
  return convertTools.byteToInt(buf);
}

function getWeight(tempWeight) {
  return tempWeight /10;
}

function getUserID(buf) {
  return convertTools.byteToInt(buf);
}

function getTime(buf) {
  //[y,m,d,h,m,s]
  var yearString = buf[0].toString().length == 1 ? '200' : '20' + buf[0];
  var timeString = yearString + "-" + buf[1] + '-' + buf[2] + " " + buf[3] + ":" + buf[4] + ":" + buf[5];
  return new Date(timeString);
}

function getBodyFat(buf) {
  return convertTools.byteToInt(buf) /10;
}

function getWater(buf) {
  return convertTools.byteToInt(buf) /10;
}

function getMuscle(buf) {
  return convertTools.byteToInt(buf) /10;
}

function getBone(buf) {
  return convertTools.byteToInt(buf) /10;
}

function getDCI(buf) {
  return convertTools.byteToInt(buf);
}

function getVisceralFatRate(buf) {
  return convertTools.byteToInt(buf) /10;
}
