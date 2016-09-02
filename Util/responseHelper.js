var enums=require('../models/DeviceResultMessage');

//var responseHelper={};
//module.exports=responseHelper;
//Response
exports.sendResponse=function(ctx, result, returnValue, resultCode, queueNum){
    var ts = new Date().getTime();
    result = {
      QueueNum: queueNum,
      Result: String(result),
      ResultMessage: String(resultCode),
      ReturnValue: returnValue,
      TS: ts
    };
    ctx.response.body=result;
}
//缺少参数
exports.ParmsLost=function(ctx,queueNum){
    this.sendResponse(ctx,"2","",enums.APIResultMessage.ParamsLost,queueNum);
}
//SCSV不正确
exports.ScSvError=function(ctx,queueNum){
    this.sendResponse(ctx,"2","",enums.APIResultMessage.ScSvError,queueNum);
}
//正确返回
exports.successWithCode=function(ctx,code,queueNum,returnValue){
    this.sendResponse(ctx,"1",returnValue,code,queueNum);
}
//错误返回
exports.FailWithCode=function(ctx,code,queueNum,returnValue){
    this.sendResponse(ctx,"2",returnValue,code,queueNum);
}
//Server错误返回
exports.ServerError=function(ctx,queueNum,returnValue){
    this.sendResponse(ctx,"3",returnValue,enums.APIResultMessage.ServerError,queueNum);
}
