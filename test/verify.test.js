//test verify
var assert = require('assert');
var requestHelper=require('../Util/requestHelper'); 

var verifyParmsArray=[
    //parameter  lost
    {
        "un": "xxxx@qq.com`"
    },
    //scsv error
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "xxxx",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "xxxx@qq.com`",
        "pw": "3b83cb05a307d3fb7d518ea4ffd3faf3"
    },
    //user not exist
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "211127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "wownotexist@qq",
        "pw": "3b83cb05a307d3fb7d518ea4ffd3faf3"
    },
    //password error
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "211127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "xxxx@qq.com",
        "pw": "3b83cb05a307d3fb7d518ea4ffd3faf3"
    },
    //success
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "211127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "helloworld@qq.com",
        "pw": "1111"
    }
]

describe('verify test', function() {
  it('parameter lost', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/verify',verifyParmsArray[0],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'202');
       done();
    });
  });
  it('scsv error', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/verify',verifyParmsArray[1],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'215');
       done();
    });
  });
  it('user not exist', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/verify',verifyParmsArray[2],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'209');
       done();
    });
  });
  it('password error', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/verify',verifyParmsArray[3],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'205');
       done();
    });
  });
  it('success', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/verify',verifyParmsArray[4],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'100');
       done();
    });
  });
});