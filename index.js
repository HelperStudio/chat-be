var app = require('express')();
var http = require('http').Server(app);
var Connection = require("./connection");
var ControllerInitializer = require('./restApi/controllerInitializer');

var connection = new Connection(http);


http.listen(3000, function() {
    var controllerInitializer = new ControllerInitializer(app);
    controllerInitializer.initialize();

    console.log('listening on *:3000');
});