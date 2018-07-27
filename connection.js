var ioEventType = require("./enums/ioEventTypes");
var Common = require("./socketEvents/definition/commonDefinition");
var Message = require("./socketEvents/definition/messageDefinition");
var User = require("./socketEvents/definition/userDefinition");
var ConnectUserCommand = require("./BLL/commands/user/connectUserCommand");
var broadcastEventType = require("./enums/broadcastEventType");

module.exports = class Connection {
    constructor(http) {
        this.io = require('socket.io')(http);
        this.io.on(ioEventType.CONNECTION, async(socket) => {

            var connectedUser = {
                socketId: socket.id,
                id: socket.handshake.query.id
            };
            let connectUserCommand = new ConnectUserCommand();
            await connectUserCommand.execute(socket.id, socket.handshake.query.id);
            console.log('user connected:', connectedUser);

            var commonModule = new Common(socket);
            var messageModule = new Message(socket);
            var userModule = new User(socket);

            commonModule.initialize();
            messageModule.initialize();
            userModule.initialize();

            socket.broadcast.emit(broadcastEventType.CONNECT, connectedUser);
        });
    }
}