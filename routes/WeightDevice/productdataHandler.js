var router=require('koa-router')();

var verifyParms=require('../../Util/verifyParms');
var responseHelper=require('../../Util/responseHelper');
var scsvconfig=require('../../config/scsvconfig');
var transferHS6Data=require('../../Lib/transferHS6Data');
var enums=require('../../models/DeviceResultMessage');

router.post('/product_data',async function(ctx,next){
 //verify params
 if(verifyParms.verifySpecProductDataParms(ctx.request.body)){
     //verify sv
     if(verifyParms.verifySv(ctx.request.body.sv,scsvconfig.product_dataSv)){ 
         //upload data
         var result=await transferHS6Data.SaveUpHS6Data(ctx.request.body.IDPS,ctx.request.body.Data);
         if(result==1){
             responseHelper.successWithCode(ctx,enums.APIResultMessage.Success,ctx.request.body.QueueNum,'');
         }else if(result==2){
              responseHelper.FailWithCode(ctx,enums.APIResultMessage.DataCountsError,ctx.request.body.QueueNum,'');
         }else{
             responseHelper.FailWithCode(ctx,enums.APIResultMessage.Fail,ctx.request.body.QueueNum,'');
         }
     }else{
         responseHelper.ScSvError(ctx,ctx.request.body.QueueNum);
     }
 }else{
     responseHelper.ParmsLost(ctx,"");
 }
})

module.exports=router;
