var ioEventType = require("./enums/ioEventTypes");
var Common = require("./socketEvents/definition/commonDefinition");
var Message = require("./socketEvents/definition/messageDefinition");
var storage = require('./storage/connectedUsers');
var broadcastEventType = require("./enums/broadcastEventType");

module.exports = class Connection {
    constructor(http) {
        this.io = require('socket.io')(http);
        this.io.on(ioEventType.CONNECTION, (socket) => {

            var connectedUser = {
                socketId: socket.id,
                userName: socket.handshake.query.id
            };

            storage.addUser(connectedUser)
            console.log('user connected:', connectedUser);

            var commonModule = new Common(socket);
            var messageModule = new Message(socket);

            commonModule.initialize();
            messageModule.initialize();

            socket.broadcast.emit(broadcastEventType.CONNECT, connectedUser);
        });
    }
}