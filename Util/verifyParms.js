var ScsvSetting=require('../config/scsvconfig');
var responseHelper=require('../Util/responseHelper');

//验证设备上传的公共参数
function verifyWeightDevicePublicParms(publicParms){
    if(publicParms.sc 
    && publicParms.sv 
    && publicParms.QueueNum 
    && publicParms.IDPS
    && publicParms.IDPS.Ptl
    && publicParms.IDPS.Name
    && publicParms.IDPS.FVer
    && publicParms.IDPS.HVer
    && publicParms.IDPS.MFR
    && publicParms.IDPS.Model
    && publicParms.IDPS.SN){
        return true;
    }else{
        return false;
    }
}
//验证UserAuth上传的公共参数
function verifyUserAuthPublicParms(publicParms){
    if(publicParms.sc 
    && publicParms.sv 
    && publicParms.QueueNum 
    && publicParms.Appversion
    && publicParms.AppId
    && publicParms.PhoneOS
    && publicParms.PhoneModel){
        return true;
    }else{
        return false;
    }
}
//验证上传数据接口特殊参数
exports.verifySpecProductDataParms=function(productdataParms){
    if(productdataParms.Data){
        return true;
    }else{
        return false;
    }
}
//验证Register接口特殊参数
exports.verifySpecRegisterAndVerifyParms=function(productdataParms){
    if(productdataParms.un 
    && productdataParms.pw){
        return true;
    }else{
        return false;
    }
}
//验证weightdown接口特殊参数
exports.verifySpecweightdownParms=function(productdataParms){
    if(productdataParms.un 
    && productdataParms.pw
    && productdataParms.pagesize
    && (productdataParms.ts || productdataParms.ts==0)){
        return true;
    }else{
        return false;
    }
}
//验证体重设备SC
function verifyDeviceSC(sc){
    return sc==ScsvSetting.SC;
}
//验证UserAuth SC
function verifyUserAuthSC(sc){
    return sc==ScsvSetting.UserAuthSC;
}
//验证体重秤数据上传SV
exports.verifySv=function(sv,specSv){
    return sv==specSv;
}
//验证设备的公共参数和SC
exports.verifyWeightDevicePublicParmsAndSc=async function(ctx,next){
    if(!verifyWeightDevicePublicParms(ctx.request.body)){
         responseHelper.ParmsLost(ctx,"");
         return;
    }
    if(!verifyDeviceSC(ctx.request.body.sc)){
        responseHelper.ScSvError(ctx,ctx.request.body.QueueNum);
        return;
    }
    //抛出异常
     await next().catch(function(e){
        responseHelper.ServerError(ctx,ctx.request.body.QueueNum,e.message);
    });
}
//验证userAuth接口的公共参数和sc
exports.verifyUserAuthPublicParmsAndSc=async function(ctx,next){
    if(!verifyUserAuthPublicParms(ctx.request.body)){
         responseHelper.ParmsLost(ctx,"");
         return;
    }
    if(!verifyUserAuthSC(ctx.request.body.sc)){
        responseHelper.ScSvError(ctx,ctx.request.body.QueueNum);
        return;
    }
    //抛出异常
     await next().catch(function(e){
        responseHelper.ServerError(ctx,ctx.request.body.QueueNum,e.message);
    });
}
//正则验证
exports.regexParms=function(text){
   var regexmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
   return regexmail.test(text);
}
//验证参数是否是数字
exports.verifyWeightDownParmsValid=function(a,b){
    if(!isNaN(a) && !isNaN(b)){
        if(b>=0 && a>=0){
        return true;
        }
    }else{
        return false;
    }
}