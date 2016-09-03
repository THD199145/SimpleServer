var router=require('koa-router')();

var verifyParms=require('../../Util/verifyParms');
var responseHelper=require('../../Util/responseHelper');
var scsvconfig=require('../../config/scsvconfig');
var enums=require('../../models/DeviceResultMessage');
var UserData=require('../../dao/thdUser_op');
var weightMeasureData=require('../../Lib/weightMeasureData');
var cryto=require('../../Util/cryptoTools');

//weight down
router.post('/weight_down',async function(ctx,next){
 //verify params
 if(verifyParms.verifySpecweightdownParms(ctx.request.body)){
     //verify params wether valid
     var ts=parseInt(ctx.request.body.ts);
     var pagesize=parseInt(ctx.request.body.pagesize);
     if(verifyParms.verifyWeightDownParmsValid(ts,pagesize)){
         //verify Sv
         if(verifyParms.verifySv(ctx.request.body.sv,scsvconfig.weightdownSv)){        
             var result=await UserData.selectByUserName(ctx.request.body.un);
             //verify user
             if(result.length==1){
                var password=cryto.createMd5(ctx.request.body.pw+ctx.request.body.un);
                if(result[0].PassWord==password){
                //query data from db
                var result=await weightMeasureData.userweightdataDown(result[0].UserId,ts,pagesize);
                responseHelper.successWithCode(ctx,enums.APIResultMessage.Success,ctx.request.body.QueueNum,result);
                
                }else{
                    //password error
                    responseHelper.FailWithCode(ctx,enums.APIResultMessage.PasswordError,ctx.request.body.QueueNum,'');
                }
             }else{
                 //user not exist
                 responseHelper.FailWithCode(ctx,enums.APIResultMessage.UserNotExist,ctx.request.body.QueueNum,'');
             }
        }else{
            responseHelper.ScSvError(ctx,ctx.request.body.QueueNum);
     }
     }else{
         responseHelper.FailWithCode(ctx,enums.APIResultMessage.ParamsValid,ctx.request.body.QueueNum,'');
     }
 }else{
     responseHelper.ParmsLost(ctx,"");
 }
})
module.exports=router;
