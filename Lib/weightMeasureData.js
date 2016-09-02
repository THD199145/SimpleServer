//测量数据处理
var convertTools=require('../Util/convertTools');
var weightData=require('../dao/WeightMeasurementInfo_op');
var moment=require('moment');

var measureweight={};
module.exports=measureweight;

measureweight.userweightdataDown=async function(userid,ts,pagesize){
    var searchtime=moment.unix(0).format('YYYY-MM-DD HH:mm:ss');
    //如果时间戳为0 则从1970开始下载
    if(ts>0){
        searchtime=moment.unix(ts).format('YYYY-MM-DD HH:mm:ss');
    }
    var weightList=[];
    var arr=[userid,searchtime,pagesize];
    //查询数据
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