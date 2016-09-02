# SimpleServer
a simple server  with koa2 and mysql include register,verify,product_data,weight_down 
+-- config
|   +-- dbconfig.js
|   +-- regexconfig.js
|   +-- scsvconfig.js
+-- dao
|   +-- thdUser_op.js
|   +-- thdUser_SqlMapping.js
|   +-- WeightMeasurementInfo_op.js
|   +-- WeightMeasurementInfo_SqlMapping.js
+-- Lib
|   +-- transferHS6Data.js
|   +-- weightMeasureData.js
+-- models
|   +-- DeviceResultMessage.js
+-- routes
|   +-- MeasureData
|       +-- weightHandler.js
|   +-- UserAuth
|       +-- userdataHandler.js
|   +-- UserAuth
|       +-- productdataHandler.js
+-- Util
|   +-- convertTools.js
|   +-- cryptoTools.js
|   +-- dbHelper.js
|   +-- responseHelper.js
|   +-- UtilTime.js
|   +-- verifyParms.js
+-- .babelrc
+-- app.js
+-- index.js
+-- package.json
+-- server.js

