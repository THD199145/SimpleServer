//dealing with weight of user
var convertTools=require('../Util/convertTools');
var weightData=require('../dao/WeightMeasurementInfo_op');
var moment=require('moment');

var measureweight={};
module.exports=measureweight;

measureweight.userweightdataDown=async function(userid,ts,pagesize){
    var searchtime=moment.unix(0).format('YYYY-MM-DD HH:mm:ss');
    //if ts=0 set query term is 1970-01-01
    if(ts>0){
        searchtime=moment.unix(ts).format('YYYY-MM-DD HH:mm:ss');
    }
    var weightList=[];
    var arr=[userid,searchtime,pagesize];
    //query data from db
    var result=await weightData.selectByUserIdAndMeasurementTimeDesc(arr);
    if(result.length>0){
        for(var i = 0; i < result.length; i++){
            var weightInfo={
                DataID:result[i].AppDataId1,
                UserId:result[i].UserId,
                mdeviceId:result[i].mDeviceId,
                IsActive:result[i].IsActive,
                BMI:result[i].BMI,
                BoneValue:result[i].BoneValue,
                DCI:result[i].DCI,
                FatValue:result[i].FatValue,
                Muscale:result[i].MuscaleValue,
                WaterValue:result[i].WaterValue,
                WeightValue:result[i].WeightValue,
                MeasurementTime:moment(result[i].MeasurementTime).unix(),
                CreateTime:moment(result[i].CreateTime).unix(),
                LastChangeTime:moment(result[i].LastChangeTime).unix()
            }
            weightList.push(weightInfo);
        }
        //return resultList[];
        return weightList;
    }
    else{
        return [];
    }
}
