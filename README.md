


# SimpleServer
 <p>a simple server via Koa2 and Mysql include:register, login, upload data(weight), download data(weight) 
 <p>Disaster tolerance and security:
 <p>1）Use the cluster to implement the host process to listen to the child process. If the child process hangs, the main process restarts the child process.
 <p>2）Using nssm to deploy services to windows servers, nssm can monitor services and automatically restart if the service down.
 <p>3）For the security problem, when the user registers, the user password is processed on the basis of md5 to reduce the probability of being checked.
# Run the server:
<p>1 npm install
<p>2 node index.js
# Run test
<p> 1 npm install -gobal mocha
<p> 2 mocha -t 10000
<p> ![image](https://github.com/THD199145/SimpleServer/blob/master/doc/testresult.jpg)
