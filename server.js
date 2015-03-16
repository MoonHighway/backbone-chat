var express = require('express');
var colors = require('colors/safe');
var getColor = require('./randomColor');

var messages = [];

var app = express().use(express.static(__dirname + '/ui'));
var server = require('http').createServer(app).listen(3210);

// Add Socket IO to your server
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    socket.once('disconnect', function(data) {
        socket.disconnect();
    });

    socket.on('message', function (data) {
        console.log(colors[data.color](data.user + ": " + data.message));
        io.sockets.emit('message', data);
        messages.push(data);
    });

    socket.emit('welcome', { oldMessages: messages, yourColor: getColor() });

});

console.log(colors.bgBlue(colors.yellow("Chat Server running at 'http://localhost:3210'")));
