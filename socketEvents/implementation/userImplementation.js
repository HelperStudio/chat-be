var broadcastEventType = require("../../enums/broadcastEventType");
var storage = require('../../storage/connectedUsers');

module.exports = class UserImplementation {
    constructor(socket) {
        this.socket = socket;
    }

    userInfo(model) {
        var data = model;
        storage.updateUsers(data);
        this.broadcast.emit(broadcastEventType.USER_INFO, data);
        this.emit(broadcastEventType.USER_INFO, data);
    }
}