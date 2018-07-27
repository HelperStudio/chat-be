var broadcastEventType = require("../../enums/broadcastEventType");

module.exports = class UserImplementation {
    constructor(socket) {
        this.socket = socket;
    }
}