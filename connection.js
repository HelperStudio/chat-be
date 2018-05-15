var ioEventType = require("./enums/ioEventTypes");
var Common = require("./socketEvents/definition/commonDefinition");
var Message = require("./socketEvents/definition/messageDefinition");

module.exports = class Connection {
    constructor(http) {
        this.io = require('socket.io')(http);
        this.io.on(ioEventType.CONNECTION, (socket) => {
            console.log('a user connected');
            var commonModule = new Common(socket);
            var messageModule = new Message(socket);

            commonModule.initialize();
            messageModule.initialize();
        });
    }
}