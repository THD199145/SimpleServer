//test product_data
var assert = require('assert');
var requestHelper=require('../Util/requestHelper'); 

var IDPS={
    "Ptl": "com.jiuan.BPV20",
    "Name": "BP Monitor",
    "FVer": "1.0.2",
    "HVer": "1.0.1",
    "MFR": "ihealth",
    "Model": "BP3 11070",
    "SN": "AAAAAAAAAAAB"
}
var product_dataParmsArray=[
    //parameter  lost
    {
        "QueueNum": "123",
    },
    //scsv error
    {
        "sc": "7c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "xxxxx",
        "QueueNum": "123",
        "IsEncrypted": "0",
        "IDPS": {
            "Ptl": "com.jiuan.BPV20",
            "Name": "BP Monitor",
            "FVer": "1.0.2",
            "HVer": "1.0.1",
            "MFR": "ihealth",
            "Model": "BP3 11070",
            "SN": "AAAAAAAAAAAB"
        },
        "Data": "AgEaAVk7AAAQCB8AHy0DIAD8AhgCOB4IAAA="
    },
    //data counts error
    {
        "sc": "7c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "999027b543041d9h93b607557638111e",
        "QueueNum": "123",
        "IsEncrypted": "0",
        "IDPS": {
            "Ptl": "com.jiuan.BPV20",
            "Name": "BP Monitor",
            "FVer": "1.0.2",
            "HVer": "1.0.1",
            "MFR": "ihealth",
            "Model": "BP3 11070",
            "SN": "AAAAAAAAAAAB"
        },
        "Data": "AgEaAlk7AAAQCQMGMR8CigD8AhgCOB4IAAA="
    },
    //success
    {
        "sc": "7c789858c0ec4ebf8189ebb14b6730a5",
        "sv": "999027b543041d9h93b607557638111e",
        "QueueNum": "123",
        "IsEncrypted": "0",
        "IDPS": {
            "Ptl": "com.jiuan.BPV20",
            "Name": "BP Monitor",
            "FVer": "1.0.2",
            "HVer": "1.0.1",
            "MFR": "ihealth",
            "Model": "BP3 11070",
            "SN": "AAAAAAAAAAAB"
        },
        "Data": "AgEaAVk7AAAQCB8AHy0DIAD8AhgCOB4IAAA="
    }
]

describe('product_data test', function() {
  it('parameter lost', function(done) {
    requestHelper.postRequestWithJson('101.251.102.37',3000,'/netdevice/product_data',product_dataParmsArray[0],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'202');
       done();
    });
  });
  it('scsv error', function(done) {
    requestHelper.postRequestWithJson('101.251.102.37',3000,'/netdevice/product_data',product_dataParmsArray[1],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'215');
       done();
    });
  });
  it('data counts error', function(done) {
    requestHelper.postRequestWithJson('101.251.102.37',3000,'/netdevice/product_data',product_dataParmsArray[2],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'216');
       done();
    });
  });
  it('success', function(done) {
    requestHelper.postRequestWithJson('101.251.102.37',3000,'/netdevice/product_data',product_dataParmsArray[3],function(data){
      var result=JSON.parse(data);
      assert.equal(result.ResultMessage,'100');
       done();
    });
  });
});