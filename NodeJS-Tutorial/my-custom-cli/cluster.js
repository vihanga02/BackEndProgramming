const cluster = require("cluster");
const http = require("http");
const os = require("os");

console.log(os.cpus().length);

if (cluster.isMaster){
    console.log(`Master ${process.pid} is running`);
    cluster.fork();
    cluster.fork();
}
else{
    console.log(`Worker ${process.pid} started`);
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}