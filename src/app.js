var fs = require('fs');
var express = require('express');
var logger = require('log');

global.env = process.env.NODE_ENV || "development";
global.config = require("../config.json")[env];

var app = express();
var port = global.config.server_port || 3001;

var server = require('http').createServer(app);
var controllers = require("./controller");

global.sio = require('socket.io').listen(server);
global.logger = new logger('info');

app.use("/css", express.static(__dirname + './../public/css'));
app.use("/js", express.static(__dirname + './../public/js'));
app.use("/", express.static(__dirname + './../public'));


server.listen(port, function() {
  global.logger.info("server is running. PORT:" + port);
});


global.sio.on('connection', (socket) => {
  global.logger.info("접속함");
  controllers.map((controller) => {
    controller.registerHandler(socket);
  });
  socket.on('disconnect', (socket) => {
    global.logger.info("끊어짐");
  });
});

module.exports = app;
