# SimpleServer
 <p>通过koa2和mysql实现一个简单的Server,包括register(注册),verify(登录),product_data(体重数据上传),weight_down(体重数据下载) 
 <p>对于容灾和安全做的处理:
 <p>1）利用cluster监听子进程，如果子进程挂掉，主进程重启子进程
 <p>2）使用nssm来部署服务到windows服务器，nssm能监控服务，如果服务挂掉可自动重启。
 <p>3）对于安全性问题在用户注册时，对于用户密码在md5基础上做盐值处理，减少被反查的概率。
# Run the server:
<p>1 npm install
<p>2 node index.js

