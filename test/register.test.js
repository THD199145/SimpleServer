//test register
var assert = require('assert');
var requestHelper=require('../Util/requestHelper');
var crypto = require('crypto');  

var registerParmsArray=[
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
    //userName is not Email
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "111127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "xxxx@qq",
        "pw": "3b83cb05a307d3fb7d518ea4ffd3faf3"
    },
    //userName repeated
    {
        "sc": "6c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "111127b543041d9h93b607557638111e",
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
        "sv": "111127b543041d9h93b607557638111e",
        "QueueNum": "123",
        "Appversion": "1.0.0`",
        "AppId": "1.0.0`",
        "PhoneOS": "1.0.0`",
        "PhoneModel": "1.0.0`",
        "un": "xxxx@qq.com",
        "pw": "3b83cb05a307d3fb7d518ea4ffd3faf3"
    }
]

describe('register test', function() {
  it('parameter lost', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/register',registerParmsArray[0],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'202');
       done();
    });
  });
  it('scsv error', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/register',registerParmsArray[1],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'215');
       done();
    });
  });
  it('username is not eamil', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/register',registerParmsArray[2],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'203');
       done();
    });
  });
  it('username repeated', function(done) {
    requestHelper.postRequest('101.251.102.37',3000,'/userauth/register',registerParmsArray[3],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'204');
       done();
    });
  });
  it('success', function(done) {
      crypto.randomBytes(8,function(ex,buf){
          registerParmsArray[4].un=buf.toString('hex')+'@qq.com';
          requestHelper.postRequest('101.251.102.37',3000,'/userauth/register',registerParmsArray[4],function(data){
              var result=JSON.parse(data);
              assert.equal(result.ResultMessage,'100');
              done();
            });
        });
    });
});