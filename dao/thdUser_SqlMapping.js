//sql
var thdUsersql={
  insert:'insert into thdUser ' +
    '(UserName,PassWord,IsActive,CreateTime,LastChangeTime,LastLoginTime)' +
    ' VALUES ' +
    '(?)',
  selectByUserName:'select * from thdUser where UserName=? and IsActive=1;',
  selectByUserIdAndDataID:'select * from WeightMeasurementInfo where UserId=? and AppDataId1=?;',
};
module.exports=thdUsersql;
