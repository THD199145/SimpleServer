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
//parameter lost
exports.ParmsLost=function(ctx,queueNum){
    this.sendResponse(ctx,"2","",enums.APIResultMessage.ParamsLost,queueNum);
}
//SCSV error
exports.ScSvError=function(ctx,queueNum){
    this.sendResponse(ctx,"2","",enums.APIResultMessage.ScSvError,queueNum);
}
//success
exports.successWithCode=function(ctx,code,queueNum,returnValue){
    this.sendResponse(ctx,"1",returnValue,code,queueNum);
}
//fail
exports.FailWithCode=function(ctx,code,queueNum,returnValue){
    this.sendResponse(ctx,"2",returnValue,code,queueNum);
}
//Server error
exports.ServerError=function(ctx,queueNum,returnValue){
    this.sendResponse(ctx,"3",returnValue,enums.APIResultMessage.ServerError,queueNum);
}
