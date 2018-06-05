var app = require('express')();
var http = require('http').Server(app);
var Connection = require("./connection");
var ControllerInitializer = require('./restApi/controllerInitializer');

var connection = new Connection(http);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

http.listen(3000, function() {
    var controllerInitializer = new ControllerInitializer(app);
    controllerInitializer.initialize();

    console.log('listening on *:3000');
});