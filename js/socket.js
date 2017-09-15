/**
 * Created by alikomarhan on 2017/9/15.
 */
var ws = require("nodejs-websocket");
var PORT = 3003;
var clientCount = 0;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user ' + clientCount;

    var mes = {};
    mes.type = "enter";
    mes.data = conn.nickname + ' come in';

    broadcast(JSON.stringify(mes));


    conn.on("text", function (str) {
        console.log("Received "+str);
        var mes = {};
        mes.type = "message";
        mes.data = str;
        broadcast(JSON.stringify(mes));
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var mes = {};
        mes.type = "leave";
        mes.data = conn.nickname + 'leave';
        broadcast(JSON.stringify(mes));
    });
    conn.on('error',function (err) {
        console.log("hander ERROR");
        console.log(err);
    });
}).listen(PORT);

console.log("websocket-server port" + PORT + " listen");

function broadcast(str) {
    server.connections.forEach(function(connection){
        connection.sendText(str)
    })
}