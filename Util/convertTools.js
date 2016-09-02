//var convertTools={};
//module.exports=convertTools;
//byte转int
exports.byteToInt=function(buf) {
  if (!buf || buf.length == 0 || buf.length > 4) {
    return 0;
  }
  var ret = new Buffer(4);
  ret.fill(0);
  buf.copy(ret, 0, 0, buf.length);
  return ret.readInt32LE(0);
}