function Run(main){
  var cluster=require('cluster');
  var numCPUs = require('os').cpus().length;
  //reference
  if (cluster.isMaster) {
    console.log('[master] ' + "start master...");

    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    //listening
    cluster.on('listening', function (worker, address) {
      console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });
    //reset 
    cluster.on("death", function (worker) {
              worker = cluster.fork();
          });
  } else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    main();
  }
}
exports.Run=Run;
