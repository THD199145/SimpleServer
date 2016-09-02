//执行的sql语句
var weightsql={
  insert:'insert into WeightMeasurementInfo ' +
    '(GuID, AppDataId1, UserId, BMI, BoneValue, DCI, FatValue, MuscaleValue, WaterValue'+
    ', WeightValue, Source, MeasurementTime, DataSourceType, DeviceId, DeviceType,Version,Remark,CreateTime'+
    ',LastChangeTime,UnixTS,TS,IsActive,VisceraFatLevel,mDeviceId,Lon,Lat,TimeZone,PhoneCreateTime,AppID'+
    ',TimeZone2,RemarkTS,Mood,Activity,Weather,WeightThanLastTime,WeightToGoal)' +
    ' VALUES ' +
    '(?)',
  selectByUserIdAndMeasurementTimeDesc:'select * from WeightMeasurementInfo where UserId=? and MeasurementTime> ? order by MeasurementTime desc limit ?;',
  selectByUserIdAndDataID:'select * from WeightMeasurementInfo where UserId=? and AppDataId1=?;',
};
module.exports=weightsql;
