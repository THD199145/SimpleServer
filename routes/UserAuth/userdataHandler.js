var router=require('koa-router')();

var verifyParms=require('../../Util/verifyParms');
var responseHelper=require('../../Util/responseHelper');
var scsvconfig=require('../../config/scsvconfig');
var regexconfig=require('../../config/scsvconfig');
var enums=require('../../models/DeviceResultMessage');
var UserData=require('../../dao/thdUser_op');
var cryto=require('../../Util/cryptoTools');

//register
router.post('/register',async function(ctx,next){
 //verify params
 if(verifyParms.verifySpecRegisterAndVerifyParms(ctx.request.body)){
     //verify Sv
     if(verifyParms.verifySv(ctx.request.body.sv,scsvconfig.registerSv)){ 
         //verify username whether to mail
         if(verifyParms.regexParms(ctx.request.body.un)){            
             var result=await UserData.selectByUserName(ctx.request.body.un);
             //insert a user to db
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
//verify 
router.post('/verify',async function(ctx,next){
 //verify params
 if(verifyParms.verifySpecRegisterAndVerifyParms(ctx.request.body)){
     //verify sv
     if(verifyParms.verifySv(ctx.request.body.sv,scsvconfig.verifySv)){        
             var result=await UserData.selectByUserName(ctx.request.body.un);
             //verify user
             if(result.length=1){
                var password=cryto.createMd5(ctx.request.body.pw+ctx.request.body.un);
                if(result[0].PassWord==password){
                //success
                responseHelper.successWithCode(ctx,enums.APIResultMessage.Success,ctx.request.body.QueueNum,'');
                }else{
                    //password error
                    responseHelper.FailWithCode(ctx,enums.APIResultMessage.PasswordError,ctx.request.body.QueueNum,'');
                }
             }else{
                 //user is not exist
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
