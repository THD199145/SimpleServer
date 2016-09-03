var http = require('http');  
var qs = require('querystring');  

//create post request with application/x-www-form-urlencoded; charset=UTF-8
exports.postRequest=function(hostname,port,path,postdata,callback){
    var content = qs.stringify(postdata); 
    
    var options={
        hostname: hostname, 
        port: port, 
        path: path,  
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }
    var req=http.request(options, function (res){
        var result;
        res.setEncoding('utf8');  
        res.on('data', function (chunk){
             result=chunk;
        })
        .on('end', function () { 
            //return data
            callback(result);
        });
    });
    req.on('end', function () {  
    }); 
    req.on('error',function(e){
        console.log('problem with request: ' + e.message);  
    });  
    req.write(content);   
    req.end(); 
}
//create post request with application/json
exports.postRequestWithJson=function(hostname,port,path,postdata,callback){
    
    var content=JSON.stringify(postdata);
    var options={
        hostname: hostname, 
        port: port, 
        path: path,  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': content.length
        }
    }
    var req=http.request(options, function (res){
        var result;
        res.setEncoding('utf8');  
        res.on('data', function (chunk){
             result=chunk;
        })
        .on('end', function () { 
            //return data
            callback(result);
        });
    });
    req.on('end', function () {  
    }); 
    req.on('error',function(e){
        console.log('problem with request: ' + e.message);  
    });  
    req.write(content);   
    req.end(); 
}