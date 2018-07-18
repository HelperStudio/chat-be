var ioEventType = require("./enums/ioEventTypes");
var Common = require("./socketEvents/definition/commonDefinition");
var Message = require("./socketEvents/definition/messageDefinition");
var User = require("./socketEvents/definition/userDefinition");
var storage = require('./storage/connectedUsers');
var broadcastEventType = require("./enums/broadcastEventType");

module.exports = class Connection {
    constructor(http) {
        this.io = require('socket.io')(http);
        this.io.on(ioEventType.CONNECTION, (socket) => {

            var connectedUser = {
                socketId: socket.id,
                name: socket.handshake.query.name,
                id: socket.handshake.query.id
            };

            storage.addUser(connectedUser)
            console.log('user connected:', connectedUser);

            var commonModule = new Common(socket);
            var messageModule = new Message(socket);
            var userModule = new User(socket);

            commonModule.initialize();
            messageModule.initialize();
            userModule.initialize();

            socket.broadcast.emit(broadcastEventType.CONNECT, connectedUser);
        });
    }
}