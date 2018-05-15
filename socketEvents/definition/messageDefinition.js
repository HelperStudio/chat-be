var socketEventType = require("../../enums/socketEventType");
var MessageImplementation = require("../implementation/messageImplementation");

module.exports = class MessageDefinition {
    constructor(socket) {
        this.socket = socket;
        this.impl = new MessageImplementation(this.socket);
    }

    initialize() {
        if (this.socket == null) {
            throw "socket is null";
        }

        this.socket.on(socketEventType.MESSAGE, this.impl.message)
    }
}