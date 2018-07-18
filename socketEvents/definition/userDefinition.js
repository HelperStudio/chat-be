var socketEventType = require("../../enums/socketEventType");
var UserImplementation = require("../implementation/userImplementation");

module.exports = class UserDefinition {
    constructor(socket) {
        this.socket = socket;
        this.impl = new UserImplementation(this.socket);
    }

    initialize() {
        if (this.socket == null) {
            throw "socket is null";
        }

        this.socket.on(socketEventType.USER_INFO, this.impl.userInfo)
    }
}