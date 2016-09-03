var ScsvSetting=require('../config/scsvconfig');
var responseHelper=require('../Util/responseHelper');

//verify netdevice public parameters
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
//verify UserAuth public paramters
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
//verify product_data paramters
exports.verifySpecProductDataParms=function(productdataParms){
    if(productdataParms.Data){
        return true;
    }else{
        return false;
    }
}
//verify register paramters
exports.verifySpecRegisterAndVerifyParms=function(productdataParms){
    if(productdataParms.un 
    && productdataParms.pw){
        return true;
    }else{
        return false;
    }
}
//verify weight_down paramters
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
//verify netdevice sc
function verifyDeviceSC(sc){
    return sc==ScsvSetting.SC;
}
//verify userauth sc
function verifyUserAuthSC(sc){
    return sc==ScsvSetting.UserAuthSC;
}
//verify netdevice sv
exports.verifySv=function(sv,specSv){
    return sv==specSv;
}
//verify netdevice sc and public paramters
exports.verifyWeightDevicePublicParmsAndSc=async function(ctx,next){
    if(!verifyWeightDevicePublicParms(ctx.request.body)){
         responseHelper.ParmsLost(ctx,"");
         return;
    }
    if(!verifyDeviceSC(ctx.request.body.sc)){
        responseHelper.ScSvError(ctx,ctx.request.body.QueueNum);
        return;
    }
    //throw exception
     await next().catch(function(e){
        responseHelper.ServerError(ctx,ctx.request.body.QueueNum,e.message);
    });
}
//verify userauth sc and public paramters
exports.verifyUserAuthPublicParmsAndSc=async function(ctx,next){
    if(!verifyUserAuthPublicParms(ctx.request.body)){
         responseHelper.ParmsLost(ctx,"");
         return;
    }
    if(!verifyUserAuthSC(ctx.request.body.sc)){
        responseHelper.ScSvError(ctx,ctx.request.body.QueueNum);
        return;
    }
    //throw exception
     await next().catch(function(e){
        responseHelper.ServerError(ctx,ctx.request.body.QueueNum,e.message);
    });
}
//regex email
exports.regexParms=function(text){
   var regexmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
   return regexmail.test(text);
}
//isNaN
exports.verifyWeightDownParmsValid=function(a,b){
    if(!isNaN(a) && !isNaN(b)){
        if(b>=0 && a>=0){
        return true;
        }
    }else{
        return false;
    }
}
