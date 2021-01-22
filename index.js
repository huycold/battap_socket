var path = require("path");
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Chỉ ra đường dẫn chứa css, js, images...
app.use(express.static(path.join(__dirname, 'public')));

//Tạo router
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//Tạo socket 
io.on('connection', function (socket) {
    console.log('Welcome to server chat' + socket.id);

    socket.on('sendOne', function (data) {
        var kqTong = 0;
        var kqTich = 1;
        var kq = {}

      var newData =data.split(" ")
      newData.map(item=>{
        item=parseInt(item)
        kqTong +=item
        kqTich *=item
      })
        kq.kqTong = kqTong;
        kq.kqTich = kqTich
        io.sockets.emit('kqSendOne', kq);
    });
    socket.on("sendAll",function(data){
        var kqTong = 0;
        var kqTich = 1;
        var kq = {}

      var newData =data.split(" ")
      newData.map(item=>{
        item=parseInt(item)
        kqTong +=item
        kqTich *=item
      })
        kq.kqTong = kqTong;
        kq.kqTich = kqTich

        io.to(socket.id).emit("kqSendAll",kq);
    })
});

//Khởi tạo 1 server listen tại 1 port
server.listen(3000,()=>{
    console.log("server rungning")
});