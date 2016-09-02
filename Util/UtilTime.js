var UtilTime={};
module.exports=UtilTime;

UtilTime.getUtcTime=function(){
   var dt = new Date;
   dt.setMinutes( dt.getMinutes() + dt.getTimezoneOffset() );
   return dt;
}