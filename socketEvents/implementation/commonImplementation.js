var broadcastEventType = require("../../enums/broadcastEventType");
const DisconnectUserCommand = require("../../BLL/commands/user/disconnectUserCommand");

module.exports = class CommonImplementation {
    constructor(socket) {
        this.socket = socket;
    }

    async disconnect() {
        var socket = this;

        let disconnectUserCommand = new DisconnectUserCommand();
        let disconnectedUserId = await disconnectUserCommand.execute(socket.id);
        if (disconnectedUserId) {
            this.broadcast.emit(broadcastEventType.DISCONNECT, { id: disconnectedUserId });
        }
    }
}