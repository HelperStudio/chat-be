var broadcastEventType = require("../../enums/broadcastEventType");
var storage = require('../../storage/connectedUsers');

module.exports = class CommonImplementation {
    constructor(socket) {
        this.socket = socket;
    }

    disconnect() {

        var socket = this;

        var data = {
            userId: socket.handshake.query.id
        };

        console.log("connected users before", storage.users);
        console.log("socketId to remove", socket.id);
        storage.removeUser(socket.id);
        console.log("connected users after", storage.users);

        this.broadcast.emit(broadcastEventType.DISCONNECT, { socketId: socket.id });
    }
}