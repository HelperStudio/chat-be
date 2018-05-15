var broadcastEventType = require("../../enums/broadcastEventType");


module.exports = class CommonImplementation {
    constructor(socket) {
        this.socket = socket;
    }

    disconnect() {

        var socket = this;

        var data = {
            userId: socket.handshake.query.id
        };

        this.broadcast.emit(broadcastEventType.DISCONNECT, {});
    }
}