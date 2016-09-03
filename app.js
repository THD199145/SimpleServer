   var koa=require('koa');
   var router=require('koa-router')();
   var bodyparser=require('koa-bodyparser')();
   var verifyParms=require('./Util/verifyParms');
   //cluster
   var server=require('./server');
   var http=require('http');
   //var https=require('https');

function Main(){
   var app=new koa();
   app.use(bodyparser);
   app.use(router.routes(),router.allowedMethods());

   //receive data from device
   const DeviceDataHandler=require('./routes/WeightDevice/productdataHandler');
   router.use('/netdevice',verifyParms.verifyWeightDevicePublicParmsAndSc,DeviceDataHandler.routes(),DeviceDataHandler.allowedMethods());
   //user auth api
   const UserDataHandler=require('./routes/UserAuth/userdataHandler');
   router.use('/userauth',verifyParms.verifyUserAuthPublicParmsAndSc,UserDataHandler.routes(),UserDataHandler.allowedMethods());
   //download data
   const MeasureDataHandler=require('./routes/MeasureData/weightHandler');
   router.use('/measuredata',verifyParms.verifyUserAuthPublicParmsAndSc,MeasureDataHandler.routes(),MeasureDataHandler.allowedMethods());
   
   app.use(ctx=>{ctx.response.body="Hello"});
   var httpserver = http.createServer(app.callback());
   httpserver.listen(process.env.PORT || 3000);
   //httpsserver.listen(process.env.PORT || 3001);
   //app.listen(3000);
}
server.Run(Main);



