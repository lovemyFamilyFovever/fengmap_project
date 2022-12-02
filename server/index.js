const express = require('express');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
var fs = require('fs')

app.get('/', function (req, res) {
    res.send('<h2>测试服务端</h2>');
});

io.on('connect', function (socket) {
    //接收数据
    socket.on('getStoreInfo', function (obj) {
        console.log(obj.storeName);
        // 获取仓库模拟数据
        fs.readFile('./data/store.json', 'utf-8', function (err, data) {
            if (err) {
                res.send('文件读取失败');
            } else {
                socket.emit('sendStoreInfo', data);
            }
        });
    });
});

server.listen(3000, function () {
    console.log('server running :listening on *:3000');
});