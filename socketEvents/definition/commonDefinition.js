var socketEventType = require("../../enums/socketEventType");
var CommonImplementation = require("../implementation/commonImplementation");

module.exports = class CommonDefinition {
    constructor(socket) {
        this.socket = socket;
        this.impl = new CommonImplementation(this.socket);
    }

    initialize() {
        if (this.socket == null) {
            throw "socket is null";
        }

        this.socket.on(socketEventType.DISCONNECT, this.impl.disconnect)
    }
}