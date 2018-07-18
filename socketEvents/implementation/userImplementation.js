var broadcastEventType = require("../../enums/broadcastEventType");

module.exports = class UserImplementation {
    constructor(socket) {
        this.socket = socket;
    }

    userInfo(model) {
        var data = model;

        this.broadcast.emit(broadcastEventType.USER_INFO, data);
        this.emit(broadcastEventType.USER_INFO, data);
    }
}