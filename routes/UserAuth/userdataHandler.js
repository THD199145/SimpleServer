var router=require('koa-router')();

var verifyParms=require('../../Util/verifyParms');
var responseHelper=require('../../Util/responseHelper');
var scsvconfig=require('../../config/scsvconfig');
var regexconfig=require('../../config/scsvconfig');
var enums=require('../../models/DeviceResultMessage');
var UserData=require('../../dao/thdUser_op');
var cryto=require('../../Util/cryptoTools');

//用户注册
router.post('/register',async function(ctx,next){
 //验证参数
 if(verifyParms.verifySpecRegisterAndVerifyParms(ctx.request.body)){
     //验证Sv
     if(verifyParms.verifySv(ctx.request.body.sv,scsvconfig.registerSv)){ 
         //验证用户名是否为邮箱
         if(verifyParms.regexParms(ctx.request.body.un)){            
             var result=await UserData.selectByUserName(ctx.request.body.un);
             //注册用户
             if(result.length==0){
                var password=cryto.createMd5(ctx.request.body.pw+ctx.request.body.un);
                result=await UserData.addUserData(ctx.request.body.un,password);
                responseHelper.successWithCode(ctx,enums.APIResultMessage.Success,ctx.request.body.QueueNum,'');
             }else{
                 responseHelper.FailWithCode(ctx,enums.APIResultMessage.UserNameRepeat,ctx.request.body.QueueNum,'');
             }
         }else{
             responseHelper.FailWithCode(ctx,enums.APIResultMessage.UserNameIsNotEmail,ctx.request.body.QueueNum,'');
         }
     }else{
         responseHelper.ScSvError(ctx,ctx.request.body.QueueNum);
     }
 }else{
     responseHelper.ParmsLost(ctx,"");
 }
})
//用户登录
router.post('/verify',async function(ctx,next){
 //验证参数
 if(verifyParms.verifySpecRegisterAndVerifyParms(ctx.request.body)){
     //验证Sv
     if(verifyParms.verifySv(ctx.request.body.sv,scsvconfig.verifySv)){        
             var result=await UserData.selectByUserName(ctx.request.body.un);
             //验证用户
             if(result.length=1){
                var password=cryto.createMd5(ctx.request.body.pw+ctx.request.body.un);
                if(result[0].PassWord==password){
                //成功
                responseHelper.successWithCode(ctx,enums.APIResultMessage.Success,ctx.request.body.QueueNum,'');
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
     responseHelper.ParmsLost(ctx,"");
 }
})

module.exports=router;