var app = require('express')();
var path = require('path');
var express = require('express');
var http = require('http').Server(app);
var Connection = require("./connection");
var ControllerInitializer = require('./restApi/controllerInitializer');
var config = require('./configs/config');

var connection = new Connection(http);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());
app.use(express.urlencoded())

var migrationConfiguration = {
    migrationsDir: path.resolve(__dirname, 'migrations'),
    host: config.db.host,
    port: config.db.port,
    db: config.db.database,
    user: config.db.user,
    password: config.db.password
};

require('sql-migrations').migrate(migrationConfiguration);

http.listen(config.port, function() {
    var controllerInitializer = new ControllerInitializer(app);
    controllerInitializer.initialize();

    console.log('listening on *:' + config.port);
});

module.exports = app;