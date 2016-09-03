//test weight_down
var assert = require('assert');
var requestHelper=require('../Util/requestHelper'); 

var weight_downParmsArray=[
    //parameter  lost
    {
        "un": "xxxx@qq.com`"
    },
    //scsv error
    {
        "sc": "1234",
        "sv": "311127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "7xxx4@qq.com",
        "pw": "xxxxx`",
        "pagesize": 11,
        "ts": "0"
    },
    //user not exist
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "311127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "wow@qq.com",
        "pw": "xxxxx`",
        "pagesize": 11,
        "ts": "0"
    },
    //password error
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "311127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "7xxx4@qq.com",
        "pw": "1`",
        "pagesize": 11,
        "ts": "0"
    },
    //parameter invalid
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "311127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "7xxx4@qq.com",
        "pw": "xxxxx`",
        "pagesize": "xxxx",
        "ts": "0"
    },
    //success
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "311127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "7xxx4@qq.com",
        "pw": "xxxxx`",
        "pagesize": 1,
        "ts": 0
    }
]

describe('weight_down test', function() {
  it('parameter lost', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/measuredata/weight_down',weight_downParmsArray[0],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'202');
       done();
    });
  });
  it('scsv error', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/measuredata/weight_down',weight_downParmsArray[1],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'215');
       done();
    });
  });
  it('user not exist', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/measuredata/weight_down',weight_downParmsArray[2],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'209');
       done();
    });
  });
  it('password error', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/measuredata/weight_down',weight_downParmsArray[3],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'205');
       done();
    });
  });
  it('parameter invalid', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/measuredata/weight_down',weight_downParmsArray[4],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'201');
       done();
    });
  });
  it('success', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/measuredata/weight_down',weight_downParmsArray[5],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'100');
       done();
    });
  });
});
