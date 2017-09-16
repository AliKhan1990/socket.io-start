/**
 * Created by alikomarhan on 2017/9/16.
 */
var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3003;
var clientCount = 0;

app.listen(PORT);

io.on('connection', function (socket) {
    console.log("New connection");
    clientCount++;
    socket.nickname = 'user ' + clientCount;
    io.emit('enter', socket.nickname + 'come in!');


    socket.on('message', function (str) {
        io.emit('message',socket.nickname + ' says:' +str);
    });

    socket.on('disconnect', function () {
        io.emit('leave', socket.nickname + " leave");
    });

});


console.log("websocket-server port" + PORT + " listen");

