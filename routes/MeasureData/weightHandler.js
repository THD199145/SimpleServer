var router=require('koa-router')();

var verifyParms=require('../../Util/verifyParms');
var responseHelper=require('../../Util/responseHelper');
var scsvconfig=require('../../config/scsvconfig');
var enums=require('../../models/DeviceResultMessage');
var UserData=require('../../dao/thdUser_op');
var weightMeasureData=require('../../Lib/weightMeasureData');
var cryto=require('../../Util/cryptoTools');

//体重数据下载
router.post('/weight_down',async function(ctx,next){
 //验证参数
 if(verifyParms.verifySpecweightdownParms(ctx.request.body)){
     //验证参数合法性
     var ts=parseInt(ctx.request.body.ts);
     var pagesize=parseInt(ctx.request.body.pagesize);
     if(verifyParms.verifyWeightDownParmsValid(ts,pagesize)){
         //验证Sv
         if(verifyParms.verifySv(ctx.request.body.sv,scsvconfig.weightdownSv)){        
             var result=await UserData.selectByUserName(ctx.request.body.un);
             //验证用户
             if(result.length=1){
                var password=cryto.createMd5(ctx.request.body.pw+ctx.request.body.un);
                if(result[0].PassWord==password){
                //成功 拆分参数 下载数据
                var result=await weightMeasureData.userweightdataDown(result[0].UserId,ts,pagesize);
                responseHelper.successWithCode(ctx,enums.APIResultMessage.Success,ctx.request.body.QueueNum,result);
                
                }else{
                    //密码错误
                    responseHelper.FailWithCode(ctx,enums.APIResultMessage.PasswordError,ctx.request.body.QueueNum,'');
                }
             }else{
                 //用户不存在
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