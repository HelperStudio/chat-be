var app = require('express')();
var http = require('http').Server(app);
var Connection = require("./connection");


var connection = new Connection(http);

http.listen(3000, function() {

    console.log('listening on *:3000');
});